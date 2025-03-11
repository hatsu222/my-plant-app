import { Button } from "@douyinfe/semi-ui";
import backimg from "../img/login_back.png";
import React, { useState } from "react";
import "../../src/index.css";
import { useNavigate } from "react-router-dom";
import UnderBar from "../components/UnderBar";

const IncreasePlantsPageHome = () => {
  const opacityProps = {
    happa: false,
    plant2: true,
    men: false,
  };

  const [clickButton, setClickButton] = useState<boolean>(false);
  const navigate = useNavigate();

  const increaseNewPlant = () => {
    setClickButton(true);
    navigate("/increase-plants");
    setClickButton(false);
  };

  const navigateWantList = () => {
    navigate("/want", {
      state: { fromIncreasePlantPage: true },
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backimg})`,
      }}
      className="increase-home-page-back-img"
    >
      <div className="increase-home-page-container">
        <Button
          onClick={increaseNewPlant}
          style={{
            backgroundColor: clickButton ? "#7c9079" : "#9BB598",
          }}
          className="light-green-button"
        >
          新しく植物を登録
        </Button>
        <Button
          onClick={navigateWantList}
          className="light-green-button"
          style={{
            marginTop: "35px",
            backgroundColor: clickButton ? "#7c9079" : "#9BB598",
          }}
        >
          欲しい植物リストから登録
        </Button>
      </div>
      <UnderBar {...opacityProps} />
    </div>
  );
};
export default IncreasePlantsPageHome;
