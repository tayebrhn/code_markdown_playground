import "./styles/text-editor.css";
import MDEditor, { type ContextStore } from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import type { Cell } from "../state";
import { useAction } from "../hooks/use-action";

interface TextCellProps{
  cell:Cell
}

const TextCell: React.FC<TextCellProps> = ({cell}) => {
  const {updateCell}=useAction()
  // const [, set] = useState<string | undefined>("**Hello world!!!**");
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
          value={cell.content}
          onChange={(value?: string) => updateCell(cell.id,value)}
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
          source={cell.content||"Click to edit"}
          style={{ whiteSpace: "pre-wrap", backgroundColor: "unset" }}
        />
      </div>
    </div>
  );
};
export default TextCell;
