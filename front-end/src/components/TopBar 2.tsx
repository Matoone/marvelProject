import { Row, Col } from "react-flexbox-grid";
import { Button } from "ui-neumorphism";
import "../App.css";

const TopBar = () => (
  <Row between="xs">
    <Col style={{ padding: 20 }} xs={4}>
      <strong>MarvelProject </strong>
    </Col>
    <Col style={{ padding: 20 }} xs={4}>
      <Row around="xs">
        <Button onClick={() => {}}>S'inscrire</Button>
        <Button onClick={() => {}}>Se connecter</Button>
      </Row>
    </Col>
  </Row>
);

export default TopBar;
