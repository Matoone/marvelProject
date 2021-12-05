import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { Col, Row } from "react-flexbox-grid";
import { Card, CardContent, Fab, H5, TextField } from "ui-neumorphism";
import { login, signup } from "../queries";
import { isValidEmail } from "../utils/isValidEmail";
import {
  loginVariables,
  login as loginResponse,
} from "../queries/__generated__/login";
import { signup as signupResponse } from "../queries/__generated__/signup";
import { useHistory } from "react-router";
import { UserContext } from "../userContext";

type SignupLoginMode = "login" | "signup";

export default function SignupLogin({
  mode = "login",
}: {
  mode: SignupLoginMode;
}) {
  const [password, setPassword] = useState("");
  const [passwordVerif, setPasswordVerif] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { setToken } = useContext(UserContext);
  const history = useHistory();

  const [signupFunction] = useMutation<signupResponse, loginVariables>(signup, {
    onCompleted({ signup }) {
      if (signup.token) {
        setError(null);
        setToken(signup.token);
        history.push("/");
      }
    },
    onError(error) {
      setToken(null);
      setError(error.message);
    },
  });

  const [loginFunction] = useMutation<loginResponse, loginVariables>(login, {
    onCompleted({ signin }) {
      if (signin.token) {
        setError(null);
        setToken(signin.token);
        history.push("/");
      }
    },
    onError(error) {
      setToken(null);
      setError(error.message);
    },
  });

  return (
    <Row center="xs">
      <Col xs={6}>
        <Card flat>
          <CardContent style={{ flex: 1, justifyContent: "center" }}>
            <H5 style={{ marginBottom: 40 }}>{mode.toUpperCase()}</H5>
            <Row center="xs">
              <TextField
                label="Email"
                type="email"
                className="my-3"
                width={300}
                style={{ justifySelf: "center" }}
                onChange={(e: any) => {
                  setEmail(e.value);
                }}
                rules={[
                  (v: string) => v !== "" || "Cant be empty",
                  (v: string) =>
                    !v.includes(" ") || "Cannot contain whitespace",
                  (v: string) => isValidEmail(v) || "Must be a valid email",
                ]}
              />
            </Row>
            <Row center="xs">
              <TextField
                label="Password"
                className="my-3"
                type="password"
                width={300}
                style={{ justifySelf: "center" }}
                onChange={(e: any) => {
                  setPassword(e.value);
                }}
                rules={[
                  (v: string) => v !== "" || "Cant be empty",
                  (v: string) =>
                    v.length > 5 || "Must be at least 6 characters",
                  (v: string) =>
                    !v.includes(" ") || "Cannot contain whitespace",
                ]}
              />
            </Row>
            {mode === "signup" ? (
              <Row center="xs">
                <TextField
                  label="Password confirm"
                  className="my-3"
                  type="password"
                  width={300}
                  style={{ justifySelf: "center" }}
                  onChange={(e: any) => {
                    setPasswordVerif(e.value);
                  }}
                  rules={[
                    (v: string) => v !== "" || "Cant be empty",
                    (v: string) =>
                      v.length > 5 || "Must be at least 6 characters",
                    (v: string) =>
                      !v.includes(" ") || "Cannot contain whitespace",
                    (v: string) =>
                      v === password || "Both passwords must match",
                  ]}
                />
              </Row>
            ) : null}
            <Row center="xs" style={{ marginTop: 20, marginBottom: 20 }}>
              {error ? `Submission error! ${error}` : null}
            </Row>

            <Fab
              color="#299ae6"
              onClick={() => {
                switch (mode) {
                  case "signup":
                    if (password !== passwordVerif) {
                      setError("Both password must match");
                      return;
                    }
                    signupFunction({
                      variables: {
                        email,
                        password,
                      },
                    });

                    break;
                  case "login":
                    loginFunction({
                      variables: {
                        email,
                        password,
                      },
                    });

                    break;
                  default:
                    throw new Error("unhandled mode for signupLogin component");
                }
              }}
            >
              &nbsp;<span style={{ fontSize: "24px" }}>&#9729;</span>
              &nbsp;Go&nbsp;
            </Fab>
          </CardContent>
        </Card>
      </Col>
    </Row>
  );
}
