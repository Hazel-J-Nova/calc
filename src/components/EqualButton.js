import './Button.css';
import { ACTIONS } from '../App';

const EqualButton = ({ dispatch, equal }) => {
  return (
    <div
      className='button__container'
      onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
    >
      <h1 className='button__text'>{equal}</h1>
    </div>
  );
};

export default EqualButton;
