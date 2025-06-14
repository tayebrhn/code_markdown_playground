import { Editor, loader, type OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

import prettier from "prettier";
import parser from "prettier/plugins/babel";
import esTree from "prettier/plugins/estree";

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
import { useRef } from "react";
interface CodeEditorProps {
  defaultValue: string;
  onChange(value: string | undefined): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ defaultValue, onChange }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>(null);
  const handleEditorOnChange = (value: string | undefined) => {
    onChange(value);
    console.log(value);
  };

  const handleEditorDidMount: OnMount = (editor) => {
    onChange(editor.getValue());
    editorRef.current = editor;
  };

  const onFormatClick = async () => {
    if (editorRef.current) {
      const unformatted = editorRef.current.getValue() as string;
      const formatted = await prettier.format(unformatted, {
        parser: "babel",
        plugins: [parser, esTree],
      });

      editorRef.current.setValue(formatted);
    }
  };
  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <Editor
        height="70vh"
        width="100vh"
        defaultValue={defaultValue}
        onMount={handleEditorDidMount}
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
    </div>
  );
};
export default CodeEditor;
