import { Row, Col } from "react-flexbox-grid";
import { Button } from "ui-neumorphism";
import "../App.css";
import { useHistory } from "react-router-dom";
import { useCallback, useContext } from "react";
import { UserContext } from "../userContext";

const TopBar = () => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);

  const renderBar = useCallback(() => {
    if (!token) {
      return (
        <>
          <Button onClick={() => history.push("/signup")}>Signup</Button>
          <Button onClick={() => history.push("/login")}>Login</Button>{" "}
        </>
      );
    } else {
      return (
        <>
          <Button
            onClick={() => {
              setToken(null);
              history.push("/login");
            }}
          >
            Sign out
          </Button>
          <Button onClick={() => history.push("/squad")}>Squad</Button>
        </>
      );
    }
  }, [history, token, setToken]);
  return (
    <Row between="xs" className="App-header">
      <div className="Hoverable" onClick={() => history.push("/")}>
        <Col style={{ padding: 20 }} xs={4}>
          <strong>MarvelProject</strong>
        </Col>
      </div>

      <Col style={{ padding: 20 }} xs={4}>
        <Row around="xs">{renderBar()}</Row>
      </Col>
    </Row>
  );
};

export default TopBar;
