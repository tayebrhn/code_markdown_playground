import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin, } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";



export default async (rawCode: string) => {

    const result = await esbuild.build({
        entryPoints: ["index.js"],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
        define: {
            global: "window",
        },
    });

    return result.outputFiles[0].text;
}