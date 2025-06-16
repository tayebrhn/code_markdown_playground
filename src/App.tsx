import "bulmaswatch/superhero/bulmaswatch.min.css";
import CodeCell from "./components/code_component/code-cell";
import { useEffect, useRef } from "react";
import { initBundler } from "./bundler";
import TextEditor from "./components/md_component/text-editor";

function App() {
  const initBundlerRef = useRef<any>(null);
  useEffect(() => {
    initBundler(initBundlerRef);
  }, []);

  return (
    <>
      <TextEditor></TextEditor>
    </>
  );
}
export default App;
