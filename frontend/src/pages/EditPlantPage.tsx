import UnderBar from "../components/UnderBar";
import IncreasePlants from "../components/IncreasePlants";
import React, { useState } from "react";
import { Modal } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditPlantPage = () => {
  const { plantId } = useParams();
  const location = useLocation();
  const plantDetails =
    location.state?.plantDetails || location.state?.wantPlantDetails;
  const isFromWantPlantsPage = location.state?.fromWantPlantPage ? true : false;
  const wantToList = location.state?.wantToList ? true : false;
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const opacityProps = {
    happa: isFromWantPlantsPage || wantToList ? false : true,
    plant2: false,
    men: isFromWantPlantsPage || wantToList ? true : false,
  };
  const clickReturn = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleOk = () => {
    navigate(`/details/${plantId}`, {
      state: {
        fromWantPlantPage: isFromWantPlantsPage,
      },
    });
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
        編集を破棄しますか?
      </Modal>
      <p className="increase-page-modoru-button" onClick={clickReturn}>
        戻る
      </p>
      <h1 className="pageTitle" style={{ marginTop: "20px" }}>
        {wantToList ? "'ぼくの植物たち'に追加する" : "植物を編集する"}
      </h1>
      <IncreasePlants
        plantDetails={plantDetails}
        isFromWantPlantsPage={isFromWantPlantsPage}
      />
      <UnderBar {...opacityProps} />
    </div>
  );
};
export default EditPlantPage;
