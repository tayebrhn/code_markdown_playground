import "bulmaswatch/superhero/bulmaswatch.min.css";
import * as esbuild from "esbuild-wasm";

import CodeCell from "./components/code-cell";
import { useEffect, useRef } from "react";

function App() {
  const initBundlerRef = useRef<any>(null);

  const initBundler = async () => {
    if (!initBundlerRef.current) {
      await esbuild.initialize({
        worker: true,
        wasmURL: "./esbuild.wasm",
      });

      initBundlerRef.current = esbuild;
    }
  };

  useEffect(()=>{
    initBundler()
  },[])

  return (
    <>
      <CodeCell></CodeCell>
      <CodeCell></CodeCell>
    </>
  );
}
export default App;
