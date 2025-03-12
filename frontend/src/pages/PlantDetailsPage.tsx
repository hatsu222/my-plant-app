import UnderBar from "../components/UnderBar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AxiosError } from "axios";
import PlantImgsDetails from "../components/plantDetailsComponents/PlantImgsDetails";
import PlantFeature from "../components/increasePlantsComponents/PlantFeature";
import { useLocation } from "react-router-dom";

const PlantDetailsPage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const { plantId } = useParams();
  const [plantDetails, setPlantDetails] = useState<any>(null);
  const [sameFamilyPlants, setSameFamilyPlants] = useState<any>([]);

  const location = useLocation();
  //欲しい植物の詳細か、お気に入り植物の詳細か、持っている植物の詳細かを判別
  const isFromWantPlantsPage = location.state?.fromWantPlantPage ? true : false;
  const isFromFavoritePlantsPage = location.state?.fromFavoritePlantPage
    ? true
    : false;

  const navigate = useNavigate();
  const opacityProps = {
    happa: isFromWantPlantsPage || isFromFavoritePlantsPage ? false : true,
    plant2: false,
    men: isFromWantPlantsPage || isFromFavoritePlantsPage ? true : false,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/plants/get-plant-info-details?plantId=${plantId}`
        );
        setPlantDetails(response.data.plant);
        setSameFamilyPlants(response.data.sameFamilyPlants);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError);
      }
    };
    fetchData();
  }, []);

  let formattedPurchaseDate;
  if (plantDetails?.purchaseDate) {
    const date = new Date(plantDetails?.purchaseDate);
    formattedPurchaseDate = date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const sameFamilyPlantName = sameFamilyPlants.map(
    (plant: { plant_popular_name: string }) => plant.plant_popular_name
  );
  const fomattedSameFamilyPlantName = sameFamilyPlantName.join("、");

  const editPlant = () => {
    navigate(`/edit/${plantId}`, {
      state: {
        plantDetails: plantDetails,
        fromWantPlantPage: isFromWantPlantsPage,
      },
    });
  };

  const { sortName, sortNumber } = useParams();
  const clickReturn = () => {
    if (isFromWantPlantsPage) {
      navigate("/want");
    } else if (isFromFavoritePlantsPage) {
      navigate("/favorite");
    } else {
      if (sortName && sortNumber) {
        navigate(`/list/${sortName}/${sortNumber}`);
      } else {
        navigate("/list");
      }
    }
  };
  return (
    <div>
      <p className="increase-page-modoru-button" onClick={clickReturn}>
        戻る
      </p>
      <h1 className="pageTitle" style={{ marginTop: "20px" }}>
        {isFromWantPlantsPage ? "欲しい植物" : "この植物について"}
      </h1>
      <button className="detail-page-edit-button" onClick={editPlant}>
        編集
      </button>
      <PlantImgsDetails
        plantDetails={plantDetails}
        isFromWantPlantsPage={isFromWantPlantsPage}
      />
      {isFromWantPlantsPage ? (
        <></>
      ) : (
        <>
          <span className="detail-page-feature-text">特徴</span>
          <div>
            <div className="detail-page-feature-container-dai">
              <div className="detail-page-feature-container">
                <PlantFeature
                  featureDetails={{
                    featureName: "乾燥",
                    featureNumber: plantDetails?.featureDryingTolerance,
                  }}
                />
                <PlantFeature
                  featureDetails={{
                    featureName: "耐陰性",
                    featureNumber: plantDetails?.featureShadeTolerance,
                  }}
                />
                <PlantFeature
                  featureDetails={{
                    featureName: "耐暑性",
                    featureNumber: plantDetails?.featureHeatTolerance,
                  }}
                />
                <PlantFeature
                  featureDetails={{
                    featureName: "耐寒性",
                    featureNumber: plantDetails?.featureColdTolerance,
                  }}
                />
              </div>
            </div>
            <div className="detail-page-purchase-container">
              <div>
                <span>価格:&nbsp;</span>
                <span className="detail-page-purchase-text">
                  ￥{plantDetails?.price?.toLocaleString() ?? ""}
                </span>
              </div>
              <div>
                <span>購入日:&nbsp;</span>
                <span className="detail-page-purchase-text">
                  {formattedPurchaseDate ?? ""}
                </span>
              </div>
              <div>
                <span>購入場所:&nbsp;</span>
                <span className="detail-page-purchase-text">
                  {plantDetails?.buyer ?? ""}
                </span>
              </div>

              <span style={{ marginTop: "17px" }}>同じ科の植物</span>
              <input
                type="text"
                id="same-plant-family"
                className="same-plant-family-input"
                value={fomattedSameFamilyPlantName}
                style={{ fontWeight: "bold", fontSize: "12px" }}
              ></input>
            </div>
          </div>
        </>
      )}
      <UnderBar {...opacityProps} />
    </div>
  );
};
export default PlantDetailsPage;
