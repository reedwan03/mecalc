import { useReducer } from "react";
import DigitButtons from "./DigitButtons";
import OperationButtons from "./OperationButtons";
import "./styles.css";
import test from "./test";

export const ACTIONS = {
  ADD_DIGIT: "add-digits",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  console.log(state.currentOperand, state.previousOperand, payload.operation);

  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }

      if (payload.digit === "." && state.currentOperand == null) {
        return {
          ...state,
          currentOperand: ` 0${payload.digit}`,
        };
      }

      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (
        state.currentOperand == null &&
        state.previousOperand == null &&
        payload.operation === "-"
      ) {
        return {
          ...state,
          currentOperand: `${payload.operation}`,
        };
      }

      if (
        state.currentOperand == null &&
        state.previousOperand == null &&
        payload.operation == "-"
      ) {
        return {
          ...state,
          currentOperand: payload.operation,
        };
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

    case ACTIONS.CLEAR:
      return {};

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
        return {
          ...state,
          currentOperand: null,
        };
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
  console.log(currentOperand);
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return "";

  let computation = "";

  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "/":
      computation = prev / curr;
      break;
  }

  return computation.toString();
}

const INTEGET_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGET_FORMATTER.format(integer);
  return `${INTEGET_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-grid">
      {/* <test /> */}
      <div className="top-elements">
        <div className="my-title">
          <div className="namm">
            me<span>calc.</span>
          </div>
        </div>
        <div className="numbers">
          <div className="previous-operand">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="current-operand">{formatOperand(currentOperand)}</div>
        </div>
      </div>

      <div className="btns">
        <div className="bottom-top-btns">
          <button
            className="allclear"
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          >
            AC
          </button>
          <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
            <ion-icon name="backspace" className="backspace"></ion-icon>
          </button>
        </div>

        <DigitButtons digit="7" dispatch={dispatch} />
        <DigitButtons digit="8" dispatch={dispatch} />
        <DigitButtons digit="9" dispatch={dispatch} />
        <OperationButtons operation="/" dispatch={dispatch} />
        <DigitButtons digit="4" dispatch={dispatch} />
        <DigitButtons digit="5" dispatch={dispatch} />
        <DigitButtons digit="5" dispatch={dispatch} />
        <OperationButtons operation="*" dispatch={dispatch} />
        <DigitButtons digit="1" dispatch={dispatch} />
        <DigitButtons digit="2" dispatch={dispatch} />
        <DigitButtons digit="3" dispatch={dispatch} />
        <OperationButtons operation="+" dispatch={dispatch} />
        <DigitButtons digit="." dispatch={dispatch} />
        <DigitButtons digit="0" dispatch={dispatch} />
        <button
          className="allclear"
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
        <OperationButtons operation="-" dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
