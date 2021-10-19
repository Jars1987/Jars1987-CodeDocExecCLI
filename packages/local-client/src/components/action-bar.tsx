import './actionbar.css';
import { useActions } from '../hooks/use-actions';
import IconButton from './icon-button';

interface ActionbarProps {
  id: string;
}

const Actionbar: React.FC<ActionbarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className='actionbar'>
      <IconButton icon='fas fa-arrow-up' onClick={() => moveCell(id, 'up')} />
      <IconButton
        icon='fas fa-arrow-down'
        onClick={() => moveCell(id, 'down')}
      />
      <IconButton icon='fas fa-times' onClick={() => deleteCell(id)} />
    </div>
  );
};

export default Actionbar;
