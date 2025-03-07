import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Toast, Modal } from "@douyinfe/semi-ui";
import { AxiosError } from "axios";
import "../styles.css";
import PlantFeature from "./increasePlantsComponents/PlantFeature";
import PlantName from "./increasePlantsComponents/PlantName";
import PlantPurchase from "./increasePlantsComponents/PlantPurchase";
import PlantImg from "./increasePlantsComponents/PlantImg";
// import { PlantInfoType } from "../types";
import { useNavigate } from "react-router-dom";

const IncreasePlants = (props?: any) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const isEditPage = !!props?.plantDetails;
  const editPlantId = props?.plantDetails?.id;

  const isWantPlantPage = props?.isWantPlantPage;
  const isFromWantPlantsPage = props?.isFromWantPlantsPage ? true : false;
  const [plantInfo, setPlantInfo] = useState<{
    id: number | null;
    popularName: string;
    officialName: string | null;
    family: string | null;
    shadeTolerance: number | null;
    dryingTolerance: number | null;
    heatTolerance: number | null;
    coldTolerance: number | null;
    price: number | null;
    purchaseDate: Date | null;
    buyer: string | null;
    possessed: boolean;
  }>({
    id: null,
    popularName: "",
    officialName: null,
    family: null,
    shadeTolerance: null,
    dryingTolerance: null,
    heatTolerance: null,
    coldTolerance: null,
    price: null,
    purchaseDate: null,
    buyer: null,
    possessed: true,
  });

  const [increaseImgs, setIncreaseImgs] = useState<File[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
  const [successVisible, setSuccessVisible] = useState<boolean>(false);
  const [pushDeleteButton, setPushDeleteButton] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleValueChange = (
    field:
      | "popularName"
      | "officialName"
      | "family"
      | "shadeTolerance"
      | "dryingTolerance"
      | "heatTolerance"
      | "coldTolerance"
      | "price"
      | "purchaseDate"
      | "buyer",

    newValue: string | null
  ) => {
    setPlantInfo((prevState) => ({ ...prevState, [field]: newValue }));
  };

  const viewModal = () => {
    setVisible(true);
  };
  const viewDeleteModal = () => {
    setVisibleDelete(true);
  };
  const handleCancel = () => {
    setVisible(false);
    setVisibleDelete(false);
  };

  const savePlant = async () => {
    let plantImgId: number;

    //画像以外の植物情報を保存
    if (!plantInfo.popularName) {
      Toast.error("通称を入力してください。");
      return;
    }
    if (increaseImgs.length < 1) {
      Toast.error("画像を1枚以上追加してください。");
      return;
    }

    if (props?.plantDetails) {
      plantInfo.id = props?.plantDetails.id;
    }

    if (isWantPlantPage || isFromWantPlantsPage) {
      plantInfo.possessed = false;
    }

    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        `${apiUrl}/plants/save-plant-info`,
        plantInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      plantImgId = response.data.data.id;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      return;
    }

    //画像を保存
    const fileDataArray: Array<any> = [];

    for (const file of increaseImgs) {
      // ファイルをBase64エンコードする処理
      const base64File = await new Promise<string | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result.split(",")[1]);
          } else {
            reject("ファイルがBase64形式に変換できませんでした。");
          }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });

      if (base64File) {
        const fileData = {
          plantId: plantImgId,
          base64Data: base64File,
          fileName: file.name,
        };
        fileDataArray.push(fileData);
      }
    }

    try {
      const response = await axios.post(
        `${apiUrl}/imgs/save-plant-imgs`,
        fileDataArray
      );
      setVisible(false);
      setSuccessVisible(true);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
    }
  };

  const deletePlant = async () => {
    setPushDeleteButton(true);
    try {
      const response = await axios.delete(
        `${apiUrl}/plants/delete-plant-info?deletePlantId=${editPlantId}`
      );
      setVisibleDelete(false);
      setSuccessVisible(true);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      return;
    }
  };

  const clickBatsu = () => {
    setSuccessVisible(false);
    const destination =
      isWantPlantPage || isFromWantPlantsPage ? "/want" : "/list";
    navigate(destination);
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Modal
        visible={visible}
        centered
        okText="保存"
        onCancel={handleCancel}
        onOk={savePlant}
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
        植物を保存しますか?
      </Modal>
      <Modal
        visible={visibleDelete}
        centered
        okText="削除"
        onCancel={handleCancel}
        onOk={deletePlant}
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
        この植物を削除しますか?
      </Modal>
      <Modal
        visible={successVisible}
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
        {isEditPage && pushDeleteButton
          ? "植物を削除しました。"
          : "植物を保存しました。"}
      </Modal>
      <div style={{ textAlign: "center", padding: "10px 0px" }}>
        <div
          style={{
            padding: "20px",
          }}
        >
          <PlantImg
            setIncreaseImgs={setIncreaseImgs}
            plantDetails={props?.plantDetails}
          />
          <h2 className="sub-title">植物</h2>
          <PlantName
            handleValueChange={handleValueChange}
            plantDetails={props?.plantDetails}
          />
        </div>
        {isWantPlantPage || isFromWantPlantsPage ? (
          <></>
        ) : (
          <>
            <div
              style={{
                padding: "20px",
              }}
            >
              <h2 className="sub-title" style={{ marginTop: "-10px" }}>
                特徴
              </h2>
              <PlantFeature
                featureName="乾燥"
                handleValueChange={handleValueChange}
                plantDetails={props?.plantDetails}
              />
              <PlantFeature
                featureName="耐陰性"
                handleValueChange={handleValueChange}
                plantDetails={props?.plantDetails}
              />
              <PlantFeature
                featureName="耐暑性"
                handleValueChange={handleValueChange}
                plantDetails={props?.plantDetails}
              />
              <PlantFeature
                featureName="耐寒性"
                handleValueChange={handleValueChange}
                plantDetails={props?.plantDetails}
              />
            </div>
            <div
              style={{
                padding: "25px",
                marginBottom: isEditPage ? "20px" : "150px",
              }}
            >
              <h2 className="sub-title">購入</h2>
              <PlantPurchase
                handleValueChange={handleValueChange}
                plantDetails={props?.plantDetails}
              />
            </div>
          </>
        )}

        {isEditPage ? (
          <div
            style={{
              // padding: "25px",
              marginBottom: "150px",
            }}
          >
            <Button
              onClick={viewDeleteModal}
              className="edit-plant-delete-button"
            >
              この植物を削除する
            </Button>
          </div>
        ) : null}
      </div>
      <div className="increase-plants-save-container">
        <Button onClick={viewModal} className="increase-plants-save-button">
          保存
        </Button>
      </div>
    </div>
  );
};

export default IncreasePlants;
