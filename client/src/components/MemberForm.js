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
  const getPlaceholder = (val) => {
    if (val.substring(0, 1) === "B") {
      return "Big " + val.substring(1);
    } else if (val.substring(0, 1) === "L") {
      return "Little " + val.substring(1);
    }
    return val;
  }
  const handleBlur = (event, val) => {
    if (event.target.value !== '') {
      setMem((prevState) => ({
        ...prevState,
        [val]: event.target.value,
      }));
    } else {
      setMem(current => {
        const copy = {...current}
        delete copy[[val]]
        return copy;
      })
    }
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
                placeholder={getPlaceholder(val)}
                onBlur={(e) => handleBlur(e, val)}
              />
            </Col>
          );
        })}
        <Col xs={2} style={{ textAlign: "center" }}>
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
