import React, { useState, useEffect } from "react";
import feature1 from "../../img/feature1.png";
import feature2 from "../../img/feature2.png";
import "../../styles.css";

const PlantFeature = (props: any) => {
  //表示画面か編集画面かを判別
  const previewDetails = !!props.featureDetails;

  const [srcName, setSrcName] = useState<string[]>([
    feature1,
    feature1,
    feature1,
    feature1,
    feature1,
  ]);

  //表示の処理↓
  useEffect(() => {
    if (!!previewDetails) {
      setSrcName((prevSrcName) => prevSrcName.map(() => feature1));
      setSrcName((prevSrcName) => {
        const newSrcName = [...prevSrcName];
        if (props.featureDetails.featureNumber === null) {
          prevSrcName.map(() => feature1);
        } else {
          for (let i = 0; i < props.featureDetails.featureNumber; i++) {
            newSrcName[i] = feature2;
          }
        }
        return newSrcName;
      });
    }
  }, [previewDetails, props.featureDetails?.featureNumber]);

  //編集の処理↓
  let plantInfoName = "";
  if (props.featureName === "乾燥") {
    plantInfoName = "dryingTolerance";
  } else if (props.featureName === "耐陰性") {
    plantInfoName = "shadeTolerance";
  } else if (props.featureName === "耐暑性") {
    plantInfoName = "heatTolerance";
  } else if (props.featureName === "耐寒性") {
    plantInfoName = "coldTolerance";
  }

  const onClickFeatureImg = (imgId: number) => {
    setSrcName((firstSrcName) => {
      const newSrcName = [...firstSrcName];
      if (
        newSrcName[0] === feature2 &&
        newSrcName.slice(1).every((el) => el === feature1 && imgId === 1)
      ) {
        newSrcName[0] = feature1;
        props.handleValueChange(plantInfoName, 0);
        return newSrcName;
      }
      if (newSrcName[imgId - 1] === feature1)
        for (let i = 0; i < imgId; i++) {
          newSrcName[i] = feature2;
        }
      props.handleValueChange(plantInfoName, imgId);
      if (newSrcName[imgId - 1] === feature2) {
        for (let i = 4; i >= imgId; i--) {
          newSrcName[i] = feature1;
        }
        props.handleValueChange(plantInfoName, imgId);
      }

      return newSrcName;
    });
  };

  //表示から編集画面に行った時の処理↓
  const plantDetails = props?.plantDetails;
  useEffect(() => {
    if (plantDetails) {
      props.handleValueChange(
        "dryingTolerance",
        plantDetails.featureDryingTolerance || null
      );
      props.handleValueChange(
        "shadeTolerance",
        plantDetails.featureShadeTolerance || null
      );
      props.handleValueChange(
        "heatTolerance",
        plantDetails.featureHeatTolerance || null
      );
      props.handleValueChange(
        "coldTolerance",
        plantDetails.featureColdTolerance || null
      );

      let imgNumber: any;
      if (props.featureName === "乾燥") {
        imgNumber = plantDetails.featureDryingTolerance;
      } else if (props.featureName === "耐陰性") {
        imgNumber = plantDetails.featureShadeTolerance;
      } else if (props.featureName === "耐暑性") {
        imgNumber = plantDetails.featureHeatTolerance;
      } else if (props.featureName === "耐寒性") {
        imgNumber = plantDetails.featureColdTolerance;
      }
      setSrcName((prevSrcName) => prevSrcName.map(() => feature1));
      setSrcName((prevSrcName) => {
        const newSrcName = [...prevSrcName];
        if (imgNumber === null) {
          prevSrcName.map(() => feature1);
        } else {
          for (let i = 0; i < imgNumber; i++) {
            newSrcName[i] = feature2;
          }
        }
        return newSrcName;
      });
    }
  }, [plantDetails]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {previewDetails === false ? (
        <>
          <span
            style={{
              fontWeight: "bold",
              color: "#000000",
              fontSize: "10px",
              marginRight: props.featureName === "乾燥" ? "20px" : "10px",
            }}
          >
            {props.featureName}
          </span>

          <img
            src={srcName[0]}
            alt="img1"
            className="feature-image"
            onClick={() => onClickFeatureImg(1)}
          />
          <img
            src={srcName[1]}
            alt="img2"
            className="feature-image"
            onClick={() => onClickFeatureImg(2)}
          />
          <img
            src={srcName[2]}
            alt="img3"
            className="feature-image"
            onClick={() => onClickFeatureImg(3)}
          />
          <img
            src={srcName[3]}
            alt="img4"
            className="feature-image"
            onClick={() => onClickFeatureImg(4)}
          />
          <img
            src={srcName[4]}
            alt="img5"
            className="feature-image"
            onClick={() => onClickFeatureImg(5)}
          />
        </>
      ) : (
        <>
          <span
            style={{
              fontWeight: "bold",
              color: "#000000",
              fontSize: "14px",
              writingMode: "horizontal-tb", // 横書きに強制的に設定
              whiteSpace: "nowrap",
              marginRight:
                props.featureDetails.featureName === "乾燥" ? "20px" : "10px",
            }}
          >
            {props.featureDetails.featureName}
          </span>

          <img src={srcName[0]} alt="img1" className="feature-image2" />
          <img src={srcName[1]} alt="img2" className="feature-image2" />
          <img src={srcName[2]} alt="img3" className="feature-image2" />
          <img src={srcName[3]} alt="img4" className="feature-image2" />
          <img src={srcName[4]} alt="img5" className="feature-image2" />
        </>
      )}
    </div>
  );
};

export default PlantFeature;
