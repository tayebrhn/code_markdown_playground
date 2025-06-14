/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";
function App() {
  const ref = useRef<any>(null);
  const iframeRef = useRef<any>(null);

  const startSevice = async () => {
    ref.current = await esbuild.initialize({
      worker: true,
      wasmURL: "./esbuild.wasm",
    });

    ref.current = esbuild;
  };

  const [input, setInput] = useState<string|undefined>("");
  useEffect(() => {
    if (!ref.current) {
      startSevice();
    }
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    iframeRef.current.srcDoc = html;
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input as string)],
      define: {
        global: "window",
      },
    });
    iframeRef.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      "*"
    );
  };
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
  <div id="root"></div>
  <script>
  window.addEventListener('message',(event)=>{
try{
eval(event.data);
}catch(error){
const root = document.querySelector('#root')
root.innerHTML = '<div style="color:red"> <h4>Runtime Error</h4> '+error+'</div>'

console.error(err)}
  },false)
  </script>
</body>
</html>
  `;

  return (
    <>
      <div>
        <CodeEditor
          defaultValue="const a = 1"
          onChange={(value) => setInput(value)}
        />
      </div>
      <button onClick={onClick} type="submit">
        Submit
      </button>
      <div>
        <iframe
          title="preview"
          ref={iframeRef}
          srcDoc={html}
          sandbox="allow-scripts"
        ></iframe>
      </div>
    </>
  );
}

export default App;
