import backimg from "../img/login_back.png";
import { Input } from "@douyinfe/semi-ui";
import { Button, Toast } from "@douyinfe/semi-ui";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const LoginPage = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChangeUsername = (value: any) => {
    setUserName(value);
  };
  const handleInputChangePassword = (value: any) => {
    setPassword(value);
  };

  const navigate = useNavigate();

  const clickSignUp = () => {
    navigate("/signup");
  };

  const login = async () => {
    try {
      const userInfo = await axios.post(`${apiUrl}/auth/login`, {
        name: userName,
        password: password,
      });
      localStorage.setItem("access_token", userInfo.data.access_token);
      navigate("/list");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 401) {
        Toast.error("ユーザー名またはパスワードが正しくありません");
      } else {
        console.error(axiosError);
      }
    }
  };

  return (
    <div
      className="back-img"
      style={{
        backgroundImage: `url(${backimg})`,
      }}
    >
      <div className="login-page-container">
        <h1 style={{ color: "#698067", fontSize: "23px", textAlign: "center" }}>
          ぼくの植物じてん
        </h1>
        <div className="login-page-box">
          <span style={{ fontWeight: "bold", color: "#698067" }}>
            ユーザー名
          </span>
          <Input
            name="username"
            onChange={handleInputChangeUsername}
            className="input"
          />
          <span
            style={{ fontWeight: "bold", color: "#698067", marginTop: "5px" }}
          >
            パスワード
          </span>
          <Input
            name="password"
            onChange={handleInputChangePassword}
            className="input"
          />
          <Button onClick={login} className="dark-green-button">
            ログインして進む
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <span className="login-page-underbar-button" onClick={clickSignUp}>
              新規登録はこちら
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
