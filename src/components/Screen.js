import './Screen.css';

const Screen = ({ currentOperand, previousOperand, operation }) => {
  return (
    <div className='screen'>
      <div className='previous-operand'>
        {previousOperand} {operation}
      </div>
      <div className='current-operand'>{currentOperand}</div>
    </div>
  );
};

export default Screen;
