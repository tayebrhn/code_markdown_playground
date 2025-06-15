import "./styles/code-editor.css";
import "./styles/syntax.css";
//code editor
import { Editor, loader, type OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
//code hightlighting
import prettier from "prettier";
import babelParser from "prettier/plugins/babel";
import esTree from "prettier/plugins/estree";
//jsx higthlighting
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";

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

import type React from "react";
import { useRef } from "react";
interface CodeEditorProps {
  defaultValue: string;
  onChange(value: string | undefined): void;
}

const babelParse = (code: string) =>
  parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
  });

const CodeEditor: React.FC<CodeEditorProps> = ({ defaultValue, onChange }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>(null);
  const handleEditorOnChange = (value: string | undefined) => {
    onChange(value);
  };

  const handleEditorDidMount: OnMount = (editor) => {
    onChange(editor.getValue());
    editorRef.current = editor;
    // Instantiate the highlighter
    const monacoJSXHighlighter = new MonacoJSXHighlighter(
      monaco,
      babelParse,
      traverse,
      editor
    );
    // Activate highlighting (debounceTime default: 100ms)
    monacoJSXHighlighter.highlightOnDidChangeModelContent(
      100,
      () => {},
      () => {},
      undefined,
      () => {}
    );
    // Activate JSX commenting
    monacoJSXHighlighter.addJSXCommentCommand({ JSX: "JSX" });
    // Done =)
  };

  // const handleOnValidate = (markers: monaco.editor.IMarker[]) => {
  //   markers.values
  // };
  const onFormatClick = async () => {
    if (editorRef.current) {
      const unformatted = editorRef.current.getValue() as string;
      const formatted = await prettier.format(unformatted, {
        parser: "babel",
        plugins: [babelParser, esTree],
      });

      editorRef.current.setValue(formatted.replace(/\n$/, ""));
    }
  };
  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <Editor
        defaultValue={defaultValue}
        onMount={handleEditorDidMount}
        // onValidate={handleOnValidate}
        onChange={handleEditorOnChange}
        width="100%"
        defaultLanguage="javascript"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 17,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          theme: "vs-dark",
        }}
      />
    </div>
  );
};
export default CodeEditor;
