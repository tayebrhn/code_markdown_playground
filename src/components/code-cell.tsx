import "./styles/code-cell.css";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import type { Cell } from "../state";
import { useAction } from "../hooks/use-action";
import { useTypedSelector } from "../hooks/use-typed-selector";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell } = useAction();
  const bundle = useTypedSelector((state)=>state.bundles![cell.id])

  // const [input, setInput] = useState<string>();
  // const [output, setOutput] = useState<{
  //   code: string;
  //   err: string;
  // }>();

  // useEffect(() => {
  //   const timer = setTimeout(async () => {
  //     const output = await bundler(cell.content);
  //     setOutput(output);
  //   }, 900);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div className="code-cell">
        <Resizable direction="horizontal">
          <CodeEditor
            defaultValue={cell.content}
            onChange={(value) => updateCell(cell.id, value || "")}
          />
        </Resizable>
        <Preview output={bundle} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
