import './Button.css';
import { ACTIONS } from '../App';

const DigitButton = ({ dispatch, digit }) => {
  return (
    <div
      className='button__container'
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      <h1 className='button__text'>{digit}</h1>
    </div>
  );
};

export default DigitButton;
