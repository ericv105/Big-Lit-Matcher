// MatrixInput.js
function MatrixInput(props) {
  let matrix = Array(props.matrixSize.rows);

  for (let i = 0; i < props.matrixSize.rows; i++) {
    matrix[i] = new Array(props.matrixSize.cols).fill("");
  }

  return (
    <div>
      {matrix.map((row, indexRow = 1) => {
        return (
          <div key={indexRow}>
            {row.map((item, indexColumn = 1) => {
              return (
                // {indexColumn === 0 ? <label>Name</label>: null}
                <input
                  key={indexRow + " " + indexColumn}
                  type="text"
                  defaultValue={""}
                  name={indexRow + "," + indexColumn}
                />
                // {indexColumn === 0 ? <label>&nbsp;</label>: null}
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default MatrixInput;
