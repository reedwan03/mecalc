import React from "react";
import { ACTIONS } from "./App";

export default function OperationButtons({ dispatch, operation }) {
  return (
    <button
      className="operand"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
