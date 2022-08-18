import Table from "react-bootstrap/Table";

function Results(props) {
  // console.log(props.matchings)
  return props.matchings ? (
    <div>
      {props.matchings.map((matching) => {
        return (
          <Table>
            {matching.map((pair) => {
              return (
                <tr>
                  <td>{pair[0]}</td>
                  <td>{pair[1]}</td>
                </tr>
              );
            })}
          </Table>
        );
      })}
    </div>
  ) : null;
}

export default Results;
