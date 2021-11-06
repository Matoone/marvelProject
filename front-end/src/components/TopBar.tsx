import { Row, Col } from "react-flexbox-grid";
import { Button } from "ui-neumorphism";
import "../App.css";
import { useHistory } from "react-router-dom";

const TopBar = () => {
  const history = useHistory();
  return (
    <Row between="xs">
      <div className="Hoverable" onClick={() => history.push("/")}>
        <Col style={{ padding: 20 }} xs={4}>
          <strong>MarvelProject </strong>
        </Col>
      </div>

      <Col style={{ padding: 20 }} xs={4}>
        <Row around="xs">
          <Button onClick={() => {}}>Signup</Button>
          <Button onClick={() => {}}>Signin</Button>
          <Button onClick={() => history.push("/squad")}>Squad</Button>
        </Row>
      </Col>
    </Row>
  );
};

export default TopBar;
