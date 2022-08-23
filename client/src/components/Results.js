import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Results(props) {
  return props.matchings ? (
    <Row>
      {props.matchings.map((matching) => {
        return (
          <Col>
            <Table striped bordered hover>
              {matching.map((pair) => {
                return (
                  <tr>
                    <td>{pair[0]}</td>
                    <td>{pair[1]}</td>
                  </tr>
                );
              })}
            </Table>
          </Col>
        );
      })}
    </Row>
  ) : null;
}

export default Results;
