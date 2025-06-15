import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      //handle root entry 'index.js'
      build.onResolve(
        {
          filter: /(^index\.js$)/,
        },
        () => {
          return { path: "index.js", namespace: "a" };
        }
      );
      //handle relative paths in module
      build.onResolve(
        {
          filter: /^\.+\//,
        },
        async (args) => {
          return {
            path: new URL(
              args.path,
              "https://unpkg.com" + args.resolveDir + "/"
            ).href,
            namespace: "a",
          };
        }
      );
      //handle main entry of a module
      build.onResolve({ filter: /.*/ }, async (args) => {
        return { path: `https://unpkg.com/${args.path}`, namespace: "a" };
      });
    },
  };
};
