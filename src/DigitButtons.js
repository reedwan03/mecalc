import React from "react";
import { ACTIONS } from "./App";

export default function DigitButtons({dispatch, digit}) {
  return (
    <button
      className="num"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}


{/* <DigitButtons className="num" digit="7" dispatch={dispatch} /> */}