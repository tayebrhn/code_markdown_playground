import "./styles/add-cell.css";
import { useAction } from "../hooks/use-action";
interface AddCellProp {
  prevId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProp> = ({ prevId, forceVisible }) => {
  const { insertCellAfter } = useAction();
  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-primary is-small"
          onClick={() => insertCellAfter(prevId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-primary is-small"
          onClick={() => insertCellAfter(prevId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
        <div className="divider" />
      </div>
    </div>
  );
};

export default AddCell;
