import UnderBar from "../components/UnderBar";
import ImageList from "../components/ImageList";
import "../../src/index.css";
import listBackimg from "../img/list_background.png";
import { useLocation } from "react-router-dom";

const FavoritePlantsPage = () => {
  const location = useLocation();
  const isFromIncreasePlantsPage = location.state?.fromIncreasePlantPage
    ? true
    : false;

  const opacityProps = {
    happa: false,
    plant2: isFromIncreasePlantsPage ? true : false,
    men: isFromIncreasePlantsPage ? false : true,
  };

  return (
    <div
      style={{
        backgroundImage: `url(${listBackimg})`,
      }}
      className="back-img2"
    >
      <h1 className="pageTitle" style={{ marginTop: "20px" }}>
        欲しい植物
      </h1>
      <ImageList wantListPage={true} />

      <UnderBar {...opacityProps} />
    </div>
  );
};
export default FavoritePlantsPage;
