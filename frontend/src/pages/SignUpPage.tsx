import "../../src/index.css";
import backimg from "../img/login_back.png";
import { Button, Input, Modal } from "@douyinfe/semi-ui";
import { useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const ListofPlantsPage = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [visible, setVisible] = useState<boolean>(false);

  const handleInputChangeUsername = (value: any) => {
    setUserName(value);
  };
  const handleInputChangePassword = (value: any) => {
    setPassword(value);
  };

  const navigate = useNavigate();

  const signUp = async () => {
    try {
      const response = await axios.post(`${apiUrl}/users/signup`, {
        name: userName,
        password: password,
      });
      if (response.data.message == "signup successfully") {
        setVisible(true);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
    }
  };

  const clickBatsu = () => {
    setVisible(false);
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backimg})`,
      }}
      className="back-img"
    >
      <Modal
        visible={visible}
        centered
        footer={null}
        onCancel={clickBatsu}
        style={{
          fontWeight: "bold",
          width: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        新規登録が完了しました。
      </Modal>
      <div className="signup-page-container">
        <h1 style={{ color: "#698067", fontSize: "18px", textAlign: "center" }}>
          新規登録
        </h1>
        <div className="signup-page-container2">
          <span
            style={{ fontWeight: "bold", color: "#698067", fontSize: "15px" }}
          >
            ユーザー名
          </span>
          <Input
            name="username"
            onChange={handleInputChangeUsername}
            className="input"
          />
          <span
            style={{
              fontWeight: "bold",
              color: "#698067",
              marginTop: "8px",
              fontSize: "15px",
            }}
          >
            パスワード
          </span>
          <Input
            name="password"
            onChange={handleInputChangePassword}
            className="input"
          />
          <Button onClick={signUp} className="dark-green-button">
            登録する
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ListofPlantsPage;
