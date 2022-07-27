import { useState } from "react";

function MatrixForm() {
  const [matrixSize, setMatrixSize] = useState({
    rows: 3,
    cols: 3,
  });

  const handleAddCol = () => {
    const curcol = matrixSize.cols;
    setMatrixSize((prev) => ({ ...prev, cols: curcol + 1 }));
  };

  const handleSubCol = () => {
    const curcol = matrixSize.cols;
    setMatrixSize((prev) => ({ ...prev, cols: curcol - 1 }));
  };

  const handleAddRow = () => {
    const currow = matrixSize.rows;
    setMatrixSize((prev) => ({ ...prev, rows: currow + 1 }));
  };

  const handleSubRow = () => {
    const currow = matrixSize.rows;
    setMatrixSize((prev) => ({ ...prev, rows: currow - 1 }));
  };

  return (
    <div>
      <MatrixInput
        matrixSize={matrixSize}
      />
      <button onClick={handleAddRow}>Add Row</button>
      <button onClick={handleSubRow}>Remove Row</button>
      <button onClick={handleAddCol}>Add Column</button>
      <button onClick={handleSubCol}>Remove Column</button>
    </div>
  );
}

function MatrixInput(props) {
  let matrix = Array(props.matrixSize.rows);
  for (let i = 0; i < props.matrixSize.rows; i++) {
    matrix[i] = new Array(props.matrixSize.cols).fill("");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let count = 0;
    for (let i = 0; i < props.matrixSize.rows; i++) {
      for (let j = 0; j < props.matrixSize.cols; j++) {
        matrix[i][j] = event.target[count].value;
        count += 1;
      }
    }

    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({matrix}),
    }).then((res) => res.json())
      .then((matchJSON) => console.log(matchJSON))
  };

  return (
    <form onSubmit={handleSubmit}>
      {matrix.map((row, indexRow = 1) => {
        return (
          <div key={indexRow}>
            {row.map((item, indexColumn = 1) => {
              return (
                <input
                  key={indexRow + " " + indexColumn}
                  type="text"
                  defaultValue={""}
                  name={indexRow + "," + indexColumn}
                />
              );
            })}
          </div>
        );
      })}
      <button>Submit</button>
    </form>
  );
}

export default MatrixForm;
