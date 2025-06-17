import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) =>
    cells?.order.map((id: string | number) => cells?.data[id])
  );

  // console.log(cells);

  const renderedCells = cells?.map((cell: any) => (
    <CellListItem key={cell.id} cell={cell} />
  ));
  return renderedCells;
};

export default CellList;
