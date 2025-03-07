import UnderBar from "../components/UnderBar";
import ImageList from "../components/ImageList";
import "../../src/index.css";
import listBackimg from "../img/list_background.png";

const ListofPlantsPage = () => {
  const opacityProps = {
    happa: true,
    plant2: false,
    men: false,
  };

  return (
    <div className="listOfPlantsPageContainer">
      <div
        style={{
          backgroundImage: `url(${listBackimg})`,
        }}
        className="back-img2"
      >
        <h1 className="pageTitle" style={{ marginTop: "20px" }}>
          ぼくの植物たち
        </h1>
        <ImageList></ImageList>

        <UnderBar {...opacityProps} />
      </div>
    </div>
  );
};
export default ListofPlantsPage;
