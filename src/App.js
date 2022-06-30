import './App.css';
import Screen from './components/Screen';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';
import EqualButton from './components/EqualButton';
import ClearButton from './components/ClearButton';
import ButtonGrid from './components/ButtonGrid';
import { useReducer } from 'react';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }
      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(current) || isNaN(prev)) return '';
  let computation = '';
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case 'X':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});
function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className='calculator__grid'>
      <Screen
        previousOperand={formatOperand(previousOperand)}
        operation={operation}
        currentOperand={formatOperand(currentOperand)}
      />
      <ButtonGrid>
        <ClearButton ac='ac' dispatch={dispatch}></ClearButton>
        {/* <Button buttonValue='del'></Button> */}
      </ButtonGrid>
      <ButtonGrid>
        <DigitButton digit='7' dispatch={dispatch}></DigitButton>
        <DigitButton dispatch={dispatch} digit='8'></DigitButton>
        <DigitButton digit='9' dispatch={dispatch}></DigitButton>
        <OperationButton dispatch={dispatch} operation='/'></OperationButton>
      </ButtonGrid>
      <ButtonGrid>
        <DigitButton digit='4' dispatch={dispatch}></DigitButton>
        <DigitButton dispatch={dispatch} digit='5'></DigitButton>
        <DigitButton dispatch={dispatch} digit='6'></DigitButton>
        <OperationButton operation='X' dispatch={dispatch}></OperationButton>
      </ButtonGrid>
      <ButtonGrid>
        <DigitButton dispatch={dispatch} digit='1'></DigitButton>
        <DigitButton digit='2' dispatch={dispatch}></DigitButton>
        <DigitButton dispatch={dispatch} digit='3'></DigitButton>
        <OperationButton operation='+' dispatch={dispatch}></OperationButton>
      </ButtonGrid>
      <ButtonGrid>
        <DigitButton dispatch={dispatch} digit='0'></DigitButton>
        <DigitButton digit='.' dispatch={dispatch}></DigitButton>
        <EqualButton equal='=' dispatch={dispatch}></EqualButton>
        <OperationButton operation='-' dispatch={dispatch}></OperationButton>
      </ButtonGrid>
    </div>
  );
}

export default App;
