import "./styles/code-cell.css";
import { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundler from "../bundler";
import Resizable from "./resizable";

function CodeCell() {
  const [input, setInput] = useState<string>();
  const [code, setCode] = useState<string>();

  const onClick = async () => {
    const output = await bundler(input as string);
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
      <div className="code-cell">
        <Resizable direction="horizontal">
          <CodeEditor
            defaultValue="const a = 1"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
          <Preview code={code} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
