import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Results({ getName, matchings }) {
  return matchings ? (
    <Row className="justify-content-md-center">
      {matchings.map((matching, i) => {
        return (
          <Col key={i} xs="auto">
            <Table striped bordered hover style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th colSpan={2}>Matching {i + 1}</th>
                </tr>
              </thead>
              <tbody>
                {matching.map((pair) => {
                  return (
                    <tr key={i + pair}>
                      <td>{getName(pair[0])}</td>
                      <td>{getName(pair[1])}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        );
      })}
    </Row>
  ) : null;
}

export default Results;
