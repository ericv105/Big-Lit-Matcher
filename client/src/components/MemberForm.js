import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function MemberForm({ getName, memberType, members, setMembers, memToName, setMem}) {
  
  const handleBlur = (event, val) => {
    setMem((prevState) => ({
      ...prevState,
      [val]: event.target.value,
    }));
  };
  const handleAdd = () => {
    const mem = memberType.slice(0, 1) + (members.length + 1)
    setMembers((prevState) => [
      ...prevState,
      mem,
    ]);
  };
  const handleRem = () => {
    setMembers(members.slice(0, members.length - 1));
    console.log(memToName);
  };
  return (
    <div style={{ display: "flex" }}>
      {memberType}:{" "}
      {members.map((val, i) => {
        return (
          <Form.Control
            key={i}
            type="text"
            defaultValue={getName(val)}
            onBlur={(e) => handleBlur(e, val)}
          />
        );
      })}
      <Button variant="primary" onClick={handleAdd}>
        Add {memberType}
      </Button>
      <Button variant="primary" onClick={handleRem}>
        Remove {memberType}
      </Button>
    </div>
  );
}

export default MemberForm;
