import './cell-list-item.css';
import { Cell } from '../state';
import CodeCell from './code-cell';
import TextEdior from './text-editor';
import Actionbar from './action-bar';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = (
      <>
        <div className='action-bar-wrapper'>
          <Actionbar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEdior cell={cell} />
        <Actionbar id={cell.id} />
      </>
    );
  }

  return <div className='cell-list-item'>{child}</div>;
};

export default CellListItem;
