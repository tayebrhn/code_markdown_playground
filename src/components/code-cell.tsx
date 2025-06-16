import "./styles/code-cell.css";
import { useEffect, useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundler from "../bundler";
import Resizable from "./resizable";

function CodeCell() {
  const [input, setInput] = useState<string>();
  const [output, setOutput] = useState<{
    code: string;
    err: string;
  }>();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(input as string);
      setOutput(output);
    }, 900);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div className="code-cell">
        <Resizable direction="horizontal">
          <CodeEditor
            defaultValue="const a = 1"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview output={output} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
