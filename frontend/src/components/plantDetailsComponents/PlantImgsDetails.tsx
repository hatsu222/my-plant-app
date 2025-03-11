import React, { useState, useEffect } from "react";
import rightArrowGray from "../../img/rightArrowGray.png";
import leftArrowGray from "../../img/leftArrowGray.png";
import rightArrow from "../../img/rightArrow.png";
import leftArrow from "../../img/leftArrow.png";
import heart1 from "../../img/heart1.png";
import heart2 from "../../img/heart2.png";
import axios from "axios";
import { AxiosError } from "axios";
import { Modal } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";

const PlantImgsDetails = (props: any) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const isFromWantPlantsPage = props?.isFromWantPlantsPage ? true : false;

  const plantId = props.plantDetails?.id;
  const [visible, setVisible] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<string>("");
  const [previewImgNumber, setPreviewImgNumber] = useState<number>(0);
  const [previewHeart, setPreviewHeart] = useState<string>(heart1);

  useEffect(() => {
    if (props.plantDetails?.favorite) {
      setPreviewHeart(heart2);
    } else {
      setPreviewHeart(heart1);
    }
  }, [props.plantDetails?.favorite]);

  const pushHeart = () => {
    if (previewHeart === heart1) {
      setPreviewHeart(heart2);
      const favorite: boolean = true;
      favoritePlant(favorite);
    } else {
      setPreviewHeart(heart1);
      const favorite: boolean = false;
      favoritePlant(favorite);
    }
  };

  //DBの特定の植物をお気に入り植物として更新する処理
  const favoritePlant = async (favorite: boolean) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/plants/favorite-plant?plantId=${plantId}`,
        { favorite: favorite }
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      return;
    }
  };

  useEffect(() => {
    if (props.plantDetails?.images[0].base64Data) {
      setPreviewImg(props.plantDetails?.images[0].base64Data);
      setPreviewImgNumber(0);
    }
  }, [props.plantDetails]);

  let previewRightArrow: string;
  let previewLeftArrow: string;
  if (
    props.plantDetails?.images.length > previewImgNumber + 1 &&
    previewImgNumber > 0
  ) {
    previewRightArrow = rightArrow;
    previewLeftArrow = leftArrow;
  } else if (props.plantDetails?.images.length > previewImgNumber + 1) {
    previewRightArrow = rightArrow;
    previewLeftArrow = leftArrowGray;
  } else if (previewImgNumber > 0) {
    previewLeftArrow = leftArrow;
    previewRightArrow = rightArrowGray;
  } else {
    previewRightArrow = rightArrowGray;
    previewLeftArrow = leftArrowGray;
  }

  const pushRightArrow = (previewRightArrow: string) => {
    if (previewRightArrow === rightArrowGray) {
      return;
    }
    const currentPreviewNumber = previewImgNumber;
    if (
      props.plantDetails?.images.length > currentPreviewNumber + 1 &&
      props.plantDetails?.images[currentPreviewNumber + 1].base64Data
    ) {
      setPreviewImg(
        props.plantDetails?.images[currentPreviewNumber + 1].base64Data
      );
      setPreviewImgNumber(currentPreviewNumber + 1);
    } else {
      return;
    }
  };
  const pushLeftArrow = (previewLeftArrow: string) => {
    if (previewLeftArrow === leftArrowGray) {
      return;
    }
    const currentPreviewNumber = previewImgNumber;
    if (
      props.plantDetails?.images.length > currentPreviewNumber - 1 &&
      props.plantDetails?.images[currentPreviewNumber - 1].base64Data
    ) {
      setPreviewImg(
        props.plantDetails?.images[currentPreviewNumber - 1].base64Data
      );
      setPreviewImgNumber(currentPreviewNumber - 1);
    } else {
      return;
    }
  };

  const navigate = useNavigate();
  const openModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    navigate(`/edit/${plantId}`, {
      state: { wantToList: true, wantPlantDetails: props?.plantDetails },
    });
  };

  return (
    <>
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
          width: "320px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ”ぼくの植物たち”に追加しますか?
        <br />
        &nbsp;編集画面に移動します。
      </Modal>
      <div className="detail-page-imgs-container">
        <div className="detail-page-img-arrow-container">
          <img
            key=""
            src={previewLeftArrow}
            alt=""
            className="detail-page-img-arrow"
            onClick={() => pushLeftArrow(previewLeftArrow)}
          />
          <div className="detail-page-img">
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={`data:image/jpeg;base64,${previewImg}`}
              alt=""
            />
            {isFromWantPlantsPage ? (
              <></>
            ) : (
              <>
                <img
                  key=""
                  src={previewHeart}
                  alt=""
                  style={{
                    width: "40px",
                    zIndex: "5",
                    position: "absolute",
                    top: "255px",
                    left: "215px",
                  }}
                  onClick={pushHeart}
                />
              </>
            )}
          </div>
          <img
            key=""
            src={previewRightArrow}
            alt=""
            className="detail-page-img-arrow"
            onClick={() => pushRightArrow(previewRightArrow)}
          />
        </div>
        {isFromWantPlantsPage ? (
          <>
            {" "}
            <span
              className="detail-page-plantName1"
              style={{ marginTop: "40px" }}
            >
              {props.plantDetails?.plantPopularName}
            </span>
            <span
              className="detail-page-plantName2"
              style={{ marginTop: "18px", fontWeight: "normal" }}
            >
              正式名称 :&nbsp;{props.plantDetails?.plantOfficialName ?? ""}
            </span>
            <span
              className="detail-page-plantName3"
              style={{ marginTop: "8px", fontWeight: "normal" }}
            >
              科名 :&nbsp;{props.plantDetails?.plantFamily ?? ""}
            </span>
            <button className="want-page-button" onClick={openModal}>
              "ぼくの植物たち"に追加する
            </button>
          </>
        ) : (
          <>
            <span className="detail-page-plantName1">
              {props.plantDetails?.plantPopularName}
            </span>
            <span className="detail-page-plantName2">
              正式名称 :&nbsp;{props.plantDetails?.plantOfficialName ?? ""}
            </span>
            <span className="detail-page-plantName3">
              科名 :&nbsp;{props.plantDetails?.plantFamily ?? ""}
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default PlantImgsDetails;
