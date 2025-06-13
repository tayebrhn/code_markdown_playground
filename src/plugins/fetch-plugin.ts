import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
    name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            //for loading root entry index.js
            build.onLoad({
                filter: /(^index\.js$)/,
            }, () => {
                return {
                    loader: "jsx",
                    contents: inputCode,
                };
            })
            //for loading cashed datas
            build.onLoad({
                filter: /.*/,
            }, async (args) => {
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
                    args.path
                );
                if (cachedResult) {
                    return cachedResult;
                }
            })
            //for loading css modules
            build.onLoad({
                filter: /.css$/,
            }, async (args) => {

                const { data, request } = await axios.get(args.path);
                const escaped = data.replace(/\n/g, '')
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'")
                const contents = `const style = document.createElement('style');
                style.innerText = '${escaped}';
                document.head.appendChild(style)`;

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL("./", request.responseURL).pathname,
                };
                await fileCache.setItem(args.path, result);
                return result;
            })

            //for loading js modules
            build.onLoad({ filter: /.*/ }, async (args) => {

                const { data, request } = await axios.get(args.path);
                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL("./", request.responseURL).pathname,
                };
                await fileCache.setItem(args.path, result);
                return result;
            });
        }

    }
}