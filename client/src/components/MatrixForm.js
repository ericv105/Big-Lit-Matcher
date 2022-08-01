// MatrixForm.js
import { useState } from "react";
import MatrixInput from "./MatrixInput";

function MatrixForm() {
  const [bigMatrixSize, setBigMatrixSize] = useState({
    rows: 3,
    cols: 3,
  });
  const [litMatrixSize, setlitMatrixSize] = useState({
    rows: 2,
    cols: 4,
  });

  const handleAddBig = () => {
    const curBigRows = bigMatrixSize.rows;
    const curLitCols = litMatrixSize.cols;
    setBigMatrixSize((prev) => ({ ...prev, rows: curBigRows + 1 }));
    setlitMatrixSize((prev) => ({ ...prev, cols: curLitCols + 1 }));
  };

  const handleRemBig = () => {
    const curBigRows = bigMatrixSize.rows;
    const curLitCols = litMatrixSize.cols;
    setBigMatrixSize((prev) => ({ ...prev, rows: curBigRows - 1 }));
    setlitMatrixSize((prev) => ({ ...prev, cols: curLitCols - 1 }));
  };

  const handleAddLit = () => {
    const curBigCols = bigMatrixSize.cols;
    const curLitRows = litMatrixSize.rows;
    setBigMatrixSize((prev) => ({ ...prev, cols: curBigCols + 1 }));
    setlitMatrixSize((prev) => ({ ...prev, rows: curLitRows + 1 }));
  };

  const handleRemLit = () => {
    const curBigCols = bigMatrixSize.cols;
    const curLitRows = litMatrixSize.rows;
    setBigMatrixSize((prev) => ({ ...prev, cols: curBigCols - 1 }));
    setlitMatrixSize((prev) => ({ ...prev, rows: curLitRows - 1 }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let count = 0;
    let bigMatrix = Array(bigMatrixSize.rows);
    for (let i = 0; i < bigMatrixSize.rows; i++) {
      bigMatrix[i] = new Array(bigMatrixSize.cols).fill("");
    }
    let litMatrix = Array(litMatrixSize.rows);
    for (let i = 0; i < litMatrixSize.rows; i++) {
      litMatrix[i] = new Array(litMatrixSize.cols).fill("");
    }
    for (let i = 0; i < bigMatrixSize.rows; i++) {
      for (let j = 0; j < bigMatrixSize.cols; j++) {
        bigMatrix[i][j] = event.target[count].value;
        count += 1;
      }
    }
    for (let i = 0; i < litMatrixSize.rows; i++) {
      for (let j = 0; j < litMatrixSize.cols; j++) {
        litMatrix[i][j] = event.target[count].value;
        count += 1;
      }
    }
    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bigMatrix, litMatrix }),
    })
      .then((res) => res.json())
      .then((matchJSON) => console.log(matchJSON));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <form> */}
        <MatrixInput matrixSize={bigMatrixSize} />
        <br />
        <MatrixInput matrixSize={litMatrixSize} />
        <button>Submit</button>
      </form>

      <button onClick={handleAddBig}>Add Big</button>
      <button onClick={handleRemBig}>Remove Big</button>
      <button onClick={handleAddLit}>Add Little</button>
      <button onClick={handleRemLit}>Remove Little</button>
    </div>
  );
}

export default MatrixForm;
