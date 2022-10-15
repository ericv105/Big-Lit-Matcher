import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MemberForm({
  getName,
  memberType,
  members,
  setMembers,
  memToName,
  setMem,
}) {
  const handleBlur = (event, val) => {
    setMem((prevState) => ({
      ...prevState,
      [val]: event.target.value,
    }));
  };
  const handleAdd = () => {
    const mem = memberType.slice(0, 1) + (members.length + 1);
    setMembers((prevState) => [...prevState, mem]);
  };
  const handleRem = () => {
    setMembers(members.slice(0, members.length - 1));
  };
  return (
    <div>
      <Form.Label column sm="1">
        <h3>{memberType}</h3>
      </Form.Label>
      <Form.Group as={Row}>
        {members.map((val, i) => {
          return (
            <Col key={i}>
              <Form.Control
                size="sm"
                type="text"
                defaultValue={getName(val)}
                onBlur={(e) => handleBlur(e, val)}
              />
            </Col>
          );
        })}
        <Col xs={2} style={{textAlign: 'center'}}> 
          <Button variant="light" onClick={handleAdd}>
            +
          </Button>
          <Button variant="light" onClick={handleRem}>
            -
          </Button>
        </Col>
      </Form.Group>
    </div>
  );
}

export default MemberForm;
