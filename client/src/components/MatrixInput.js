// MatrixInput.js
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

function MatrixInput(props) {
  let matrix = Array(props.matrixSize.rows);

  for (let i = 0; i < props.matrixSize.rows; i++) {
    matrix[i] = new Array(props.matrixSize.cols).fill("");
  }

  return (
    <div className="mt-4">
      {matrix.map((row, indexRow = 1) => {
        return (
          <Form.Group as={Row} className="g-2" key={indexRow} controlId="">
            
            {row.map((item, indexColumn = 1) => {
              return (
                <Col key={indexRow + " " + indexColumn}>
                  <Form.Control
                    type="text"
                    defaultValue={""}
                    name={indexRow + "," + indexColumn}
                    // size="5"
                    placeholder={
                      indexColumn === 0
                        ? props.group + " " + (indexRow + 1)
                        : "Choice " + indexColumn
                    }
                  />
                  {indexColumn === 0 ? <label>&nbsp;</label> : null}
                </Col>
              );
            })}
          </Form.Group>
        );
      })}
    </div>
  );
}

export default MatrixInput;
