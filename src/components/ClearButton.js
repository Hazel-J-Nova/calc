import './Button.css';
import { ACTIONS } from '../App';

const ClearButton = ({ dispatch, ac }) => {
  return (
    <div
      className='button__container'
      onClick={() => dispatch({ type: ACTIONS.CLEAR })}
    >
      <h1 className='button__text'>{ac}</h1>
    </div>
  );
};

export default ClearButton;
