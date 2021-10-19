import './add-cell.css';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className='add-buttons'>
        <button
          className='button is-rounded is-small is-primary'
          onClick={() => insertCellAfter(previousCellId, 'text')}>
          <span className='small'>
            <i className='fas fa-plus'></i>
          </span>
          <span>Text</span>
        </button>
        <button
          className='button is-rounded is-small is-primary'
          onClick={() => insertCellAfter(previousCellId, 'code')}>
          <span className='small'>
            <i className='fas fa-plus'></i>
          </span>
          <span>Code</span>
        </button>
      </div>
      <div className='divider'></div>
    </div>
  );
};

export default AddCell;
