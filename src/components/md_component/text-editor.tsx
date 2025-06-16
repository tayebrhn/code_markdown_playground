import "./text-editor.css";
import MDEditor, { type ContextStore } from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";

const TextEditor: React.FC = () => {
  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");
  const [editMode, setEditMode] = useState(false);
  const editRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editRef.current &&
        event.target &&
        editRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditMode(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editMode) {
    return (
      <div className="text-editor" ref={editRef}>
        <MDEditor
          value={value}
          onChange={(value?: string) => setValue(value)}
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => {
        setEditMode(true);
      }}
      className="text-editor card"
    >
      <div className="card-content">
        <MDEditor.Markdown
          source={value}
          style={{ whiteSpace: "pre-wrap", backgroundColor: "" }}
        />
      </div>
    </div>
  );
};
export default TextEditor;
