import { Editor, loader, type Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

loader.config({ monaco });

loader.init().then(/* ... */);

// import { Editor } from "@monaco-editor/react";
import type React from "react";
interface CodeEditorProps {
  defaultValue: string;
  onChange(value: string|undefined): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ defaultValue, onChange }) => {
  const handleEditorOnChange = (value: string | undefined) => {
    onChange(value);
  };
  return (
    <Editor
      height="70vh"
      width="100vh"
      defaultValue={defaultValue}
      // onMount={handleEditorOnMount}
      onChange={handleEditorOnChange}
      defaultLanguage="javascript"
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 18,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};
export default CodeEditor;