import { Modal } from "@douyinfe/semi-ui";

const SortModal = ({
  sortModalVisible,
  setSortModalVisible,
  setSortType,
}: {
  sortModalVisible: boolean;
  setSortModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSortType: React.Dispatch<
    React.SetStateAction<{
      sortName: string;
      sortNumber: number;
    } | null>
  >;
}) => {
  const handleCancel = () => {
    setSortModalVisible(false);
  };

  const clickSortType = ({
    sortName,
    sortNumber,
  }: {
    sortName: string;
    sortNumber: number;
  }) => {
    setSortType({ sortName, sortNumber });
  };
  return (
    <>
      <Modal
        visible={sortModalVisible}
        onCancel={handleCancel}
        footer={null}
        closeIcon={
          <span
            style={{
              fontSize: "16px !important;",
              marginTop: "-30px !important;",
            }}
          >
            ×
          </span>
        }
        style={{
          padding: "0px",
          fontWeight: "bold",
          width: "150px",
          display: "flex",
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        <div>
          <div style={{ fontSize: "13px" }}>並び替え</div>{" "}
          <div
            style={{ borderBottom: "1px solid #B2B2B2", margin: "3px 0 10px" }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "20px",
              fontSize: "12px",
              whiteSpace: "nowrap",
            }}
          >
            <span
              onClick={() =>
                clickSortType({ sortName: "price", sortNumber: 1 })
              }
            >
              値段が安い順
            </span>
            <span
              onClick={() =>
                clickSortType({ sortName: "price", sortNumber: 2 })
              }
            >
              値段が高い順
            </span>
            <span
              onClick={() =>
                clickSortType({ sortName: "purchaseDate", sortNumber: 1 })
              }
            >
              購入日が新しい順
            </span>
            <span
              onClick={() =>
                clickSortType({ sortName: "purchaseDate", sortNumber: 2 })
              }
            >
              購入日が古い順
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default SortModal;
