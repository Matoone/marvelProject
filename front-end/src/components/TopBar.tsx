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
        <div className="f-center" style={{ minWidth: 260 }}>
          <Button
            className="top-bar-button"
            style={{ minWidth: 100 }}
            size="large"
            onClick={() => history.push("/signup")}
          >
            Signup
          </Button>
          <Button
            className="top-bar-button"
            style={{ minWidth: 100 }}
            size="large"
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
        </div>
      );
    } else {
      return (
        <div className="f-center" style={{ minWidth: 260 }}>
          <Button
            className="top-bar-button"
            style={{ minWidth: 100 }}
            size="large"
            onClick={() => {
              setToken(null);
              history.replace("/login");
            }}
          >
            Sign out
          </Button>
          <Button
            className="top-bar-button"
            size="large"
            style={{ minWidth: 100 }}
            onClick={() => history.push("/squad")}
          >
            Squad
          </Button>
        </div>
      );
    }
  }, [history, token, setToken]);
  return (
    <Row between="xs" className="App-header">
      <div className="Hoverable" onClick={() => history.push("/")}>
        <Col style={{ padding: 20, fontSize: 30 }} xs={4}>
          <strong style={{ color: "var(--primary)" }}>MarvelProject</strong>
        </Col>
      </div>

      <Col style={{ padding: 20 }} xs={4}>
        <Row end="xs">{renderBar()}</Row>
      </Col>
    </Row>
  );
};

export default TopBar;
