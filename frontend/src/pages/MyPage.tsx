import UnderBar from "../components/UnderBar";
import "../styles.css";
import React, { useState, useEffect } from "react";
import "../../src/index.css";
import mypageBackimg from "../img/mypage_backimg.png";
import mypage from "../img/sankoumypage.png";
import men from "../img/men.png";
import axios from "axios";
import { AxiosError } from "axios";
import { Modal } from "@douyinfe/semi-ui";
import MyPagePlantInfo from "../components/MyPagePlantInfo";
import MyPagePlantList from "../components/MyPagePlantList";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const opacityProps = {
    happa: false,
    plant2: false,
    men: true,
  };
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<{
    userId: number;
    userName: string;
    myImgBase64Data: string | null;
  } | null>(null);
  console.log("userInfo", userInfo);
  const [visible, setVisible] = useState<boolean>(false);
  const [logoutVisible, setLogoutVisible] = useState<boolean>(false);

  const [totalNumbersOfPlants, setTotalNumbersOfPlants] = useState<
    number | null
  >(null);
  const [totalMoney, setTotalMoney] = useState<number | null>(null);

  const exitMyImgBase64Data = !!userInfo?.myImgBase64Data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        console.log("token", token);
        const userResponse = await axios.get(`${apiUrl}/users/get-user-info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (userResponse.data.data) {
          if (userResponse.data.data.myImgBase64Data) {
            setUserInfo({
              userId: userResponse.data.data.id,
              userName: userResponse.data.data.name,
              myImgBase64Data: userResponse.data.data.myImgBase64Data || null,
            });
          }
        }

        const plantResponse = await axios.get(
          `${apiUrl}/plants/get-plant-info-my-page`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (plantResponse) {
          setTotalNumbersOfPlants(plantResponse.data.totalNumbersOfPlants);
          setTotalMoney(plantResponse.data.totalMoney);
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError);
      }
    };
    fetchData();
  }, []);

  const changeMyImgModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setLogoutVisible(false);
  };

  const handleOk = () => {
    setVisible(false);
    document.getElementById("my-image-input")!.click();
  };

  const handleMyImageChange = async (e: any) => {
    const myImgFile = e.target.files[0];

    let myImgData;
    const base64File: string | null = await new Promise<string | null>(
      (resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result.split(",")[1]);
          } else {
            reject("ファイルがBase64形式に変換できませんでした。");
          }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(myImgFile);
      }
    );
    const fileName: string = myImgFile.name;
    myImgData = { base64File: base64File, fileName: fileName };

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${apiUrl}/users/upload-my-img`,
        myImgData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserInfo((prevInfo) => ({
        ...prevInfo!,
        myImgBase64Data: response.data.data.myImgBase64Data || null,
      }));
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
    }
  };

  const clickLogOut = () => {
    setLogoutVisible(true);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="myPageContainer">
      <div
        style={{
          zIndex: "1",
          position: "relative",
          // backgroundImage: `url(${mypage})`,
          backgroundImage: `url(${mypageBackimg})`,
        }}
        className="back-img2"
      >
        <Modal
          visible={visible}
          centered
          okText={exitMyImgBase64Data ? "変更" : "追加"}
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
          {exitMyImgBase64Data
            ? "マイページ画像を変更しますか?"
            : "マイページ画像を追加しますか?"}
        </Modal>
        <Modal
          visible={logoutVisible}
          centered
          okText="ログアウト"
          cancelText="キャンセル"
          onCancel={handleCancel}
          onOk={logout}
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
          ログアウトしますか?
        </Modal>
        <h1 className="pageTitle" style={{ marginTop: "20px" }}>
          マイページ
        </h1>
        <div>
          <div style={{ width: "100%", height: "160px" }}>
            <div className="profile-image" onClick={changeMyImgModal}>
              <img
                src={
                  exitMyImgBase64Data !== null && !!userInfo?.myImgBase64Data
                    ? `data:image/jpeg;base64,${userInfo?.myImgBase64Data}`
                    : men
                }
                alt=""
                style={{
                  color: "red",
                  opacity: exitMyImgBase64Data ? "1" : "0.4",
                  width: exitMyImgBase64Data ? "100%" : "50px",
                  height: exitMyImgBase64Data ? "100%" : "50px",
                  objectFit: exitMyImgBase64Data ? "cover" : "contain",
                }}
              />
            </div>
            <input
              type="file"
              id="my-image-input"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleMyImageChange}
            ></input>
          </div>
          <div className="mypage-name">{userInfo?.userName}</div>
          <MyPagePlantInfo
            totalNumbersOfPlants={totalNumbersOfPlants ?? 0}
            totalMoney={totalMoney ?? 0}
          />
          <MyPagePlantList />

          <span className="mypage-logout-button" onClick={clickLogOut}>
            ログアウト
          </span>
        </div>
        <UnderBar {...opacityProps} />
      </div>
    </div>
  );
};
export default MyPage;
