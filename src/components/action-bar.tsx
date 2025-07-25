import "./styles/action-bar.css"
import { useAction } from "../hooks/use-action";

interface ActionBarProps {
  id: string;
}
const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { deleteCell, moveCell } = useAction();

  return (
    <div className="action-bar">
      <button
        onClick={() => moveCell(id, "up")}
        className="button is-primary is-small"
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        onClick={() => moveCell(id, "down")}
        className="button is-primary is-small"
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button
        onClick={() => deleteCell(id)}
        className="button is-primary is-small"
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
