import shiborikomi from "../img/shiborikomi.png";
import sort from "../img/sort.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import plantPlus2 from "../img/plantPlus2.png";
// import { useLocation } from "react-router-dom";

interface PlantImgData {
  data: {
    file_name: string;
    base64_data: string;
    plant_id: number;
    favorite: boolean;
    possessed: boolean;
  }[];
}

const ImageList = (props?: any) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  //お気に入り植物リストか、欲しい植物リストかを判別
  const isFavoritePlantPage = props?.favoritePage ? true : false;
  const isWantListPlantPage = props?.wantListPage ? true : false;

  const [plantImgData, setPlantImgData] = useState<PlantImgData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`${apiUrl}/imgs/get-plant-img`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlantImgData(response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const favoritePlantsImgData = plantImgData?.data.filter(
    (plant) => plant.favorite === true
  );
  const wantPlantsImgData = plantImgData?.data.filter(
    (plant) => plant.possessed === false
  );
  const ListOfPlantsImgData = plantImgData?.data.filter(
    (plant) => plant.possessed === true
  );

  const clickPlant = (plantId: number) => {
    navigate(`/details/${plantId}`);
  };
  const clickWantPlant = (plantId: number) => {
    navigate(`/details/${plantId}`, {
      state: { fromWantPlantPage: true },
    });
  };
  const clickWantPlantPlus = () => {
    navigate("/increase-plants", {
      state: { fromWantPlantPage: true },
    });
  };
  const clickFavoritePlant = (plantId: number) => {
    navigate(`/details/${plantId}`, {
      state: { fromFavoritePlantPage: true },
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "-10px 27px 25px 10px",
        }}
      >
        {isFavoritePlantPage ? (
          <></>
        ) : isWantListPlantPage ? (
          <>
            <img
              src={plantPlus2}
              alt=""
              style={{
                maxWidth: "33px",
                maxHeight: "33px",
                marginRight: "-10px",
              }}
              onClick={clickWantPlantPlus}
            />
          </>
        ) : (
          <>
            {/* <img
              src={shiborikomi}
              alt=""
              style={{
                maxWidth: "17px",
                maxHeight: "17px",
              }}
            />
            <img
              src={sort}
              alt=""
              style={{
                maxWidth: "17px",
                maxHeight: "17px",
                marginLeft: "15px",
              }}
            /> */}
          </>
        )}
      </div>
      <div
        style={{
          margin: "10px 10px",
          display: "flex",
          flexWrap: "wrap",
          gap: "13px 11px",
          justifyContent: "flex-start",
        }}
      >
        {isFavoritePlantPage
          ? favoritePlantsImgData?.map((imgData) => (
              <div
                key={imgData.plant_id}
                style={{
                  display: "inline-block",
                  width: "30%",
                  height: "120px",
                  overflow: "hidden",
                  borderRadius: "7px",
                  position: "relative",
                  border: "2px solid #9BB598",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={`data:image/jpeg;base64,${imgData.base64_data}`}
                  alt=""
                  onClick={() => clickFavoritePlant(imgData.plant_id)}
                />
              </div>
            ))
          : isWantListPlantPage
          ? wantPlantsImgData?.map((imgData) => (
              <div
                key={imgData.plant_id}
                style={{
                  display: "inline-block",
                  width: "30%",
                  height: "120px",
                  overflow: "hidden",
                  borderRadius: "7px",
                  position: "relative",
                  border: "2px solid #9BB598",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={`data:image/jpeg;base64,${imgData.base64_data}`}
                  alt=""
                  onClick={() => clickWantPlant(imgData.plant_id)}
                />
              </div>
            ))
          : ListOfPlantsImgData?.map((imgData) => (
              <div
                key={imgData.plant_id}
                style={{
                  display: "inline-block",
                  width: "30%",
                  height: "120px",
                  overflow: "hidden",
                  borderRadius: "7px",
                  position: "relative",
                  border: "2px solid #9BB598",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={`data:image/jpeg;base64,${imgData.base64_data}`}
                  alt=""
                  onClick={() => clickPlant(imgData.plant_id)}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default ImageList;
