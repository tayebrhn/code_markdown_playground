import "bulmaswatch/superhero/bulmaswatch.min.css";
import CodeCell from "./components/code-cell";
import { useEffect, useRef } from "react";
import { initBundler } from "./bundler";

function App() {
  const initBundlerRef = useRef<any>(null);
  useEffect(() => {
    initBundler(initBundlerRef);
  }, []);

  return (
    <>
      <CodeCell></CodeCell>
    </>
  );
}
export default App;
