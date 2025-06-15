import { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundler from "../bundler";

function CodeCell() {
  const [input, setInput] = useState<string>();
  const [code, setCode] = useState<string>();

  const onClick = async () => {
    const output = await bundler(input as string);
    setCode(output);
  };

  return (
    <>
      <CodeEditor
        defaultValue="const a = 1"
        onChange={(value) => setInput(value)}
      />
      <button onClick={onClick} type="submit">
        Submit
      </button>
      <Preview code={code} />
    </>
  );
}

export default CodeCell;
