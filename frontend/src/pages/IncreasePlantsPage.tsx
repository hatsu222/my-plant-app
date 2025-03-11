import UnderBar from "../components/UnderBar";
import IncreasePlants from "../components/IncreasePlants";
import React, { useState } from "react";
import { Modal } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const IncreasePlantsPage = () => {
  const location = useLocation();
  const isFromWantPlantsPage = location.state?.fromWantPlantPage;
  const isWantPlantPage = isFromWantPlantsPage;
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const opacityProps = {
    happa: false,
    plant2: isFromWantPlantsPage ? false : true,
    men: isFromWantPlantsPage ? true : false,
  };
  const clickReturn = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleOk = () => {
    if (isFromWantPlantsPage) {
      navigate("/want");
    } else {
      navigate("/increase-plants-home");
    }
  };

  return (
    <div>
      <Modal
        visible={visible}
        centered
        okText="はい"
        cancelText="いいえ"
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{
          style: { backgroundColor: "#78A465", color: "white" },
        }}
        style={{
          fontWeight: "bold",
          width: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        編集内容が失われます。
        <br />
        よろしいですか?
      </Modal>
      <p className="increase-page-modoru-button" onClick={clickReturn}>
        戻る
      </p>
      <h1 className="pageTitle" style={{ marginTop: "20px" }}>
        {isFromWantPlantsPage ? "欲しい植物を増やす" : "植物を増やす"}
      </h1>
      <IncreasePlants isWantPlantPage={isWantPlantPage} />
      <UnderBar {...opacityProps} />
    </div>
  );
};
export default IncreasePlantsPage;
