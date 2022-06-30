import './Button.css';
import { ACTIONS } from '../App';

const OperationButton = ({ dispatch, operation }) => {
  return (
    <div
      className='button__container'
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      <h1 className='button__text'>{operation}</h1>
    </div>
  );
};

export default OperationButton;
