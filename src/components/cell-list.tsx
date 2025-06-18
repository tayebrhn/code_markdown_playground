import { Fragment } from "react/jsx-runtime";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) =>
    cells?.order.map((id: string | number) => cells?.data[id])
  );

  const renderedCells = cells?.map((cell: any) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevId={cell.id} />
    </Fragment>
  ));
  return (
    <>
      <AddCell forceVisible={cells?.length===0} prevId={null} />
      {renderedCells}
    </>
  );
};

export default CellList;
