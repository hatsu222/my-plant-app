import React, { useState, useEffect } from "react";

import "../../styles.css";
import { Input } from "@douyinfe/semi-ui";
import { DatePicker } from "@douyinfe/semi-ui";
import PriceInput from "../PriceInput";

const PlantPurchase = (props: any) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayDate = `${year}-${month}-${day}`;

  const plantDetails = props?.plantDetails;
  useEffect(() => {
    if (plantDetails) {
      props.handleValueChange(
        "purchaseDate",
        plantDetails?.purchaseDate || null
      );
      props.handleValueChange("buyer", plantDetails.buyer || null);
    }
  }, [plantDetails]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        marginTop: "-20px",
      }}
    >
      <div>
        <span className="input-title">価格</span>
        <PriceInput
          handlePriceValueChange={props.handleValueChange}
          plantDetails={props?.plantDetails}
        />
      </div>
      <div>
        <span className="input-title" style={{ marginRight: "249px" }}>
          購入日
        </span>

        <DatePicker
          type="date"
          onChange={(date) => props.handleValueChange("purchaseDate", date)}
          placeholder={todayDate}
          defaultValue={plantDetails?.purchaseDate || null}
          style={{
            marginTop: "2px",
            borderColor: "#dedede",
            borderWidth: "1.5px",
            borderRadius: "7px",
            backgroundColor: "white",
            color: "#698067",
            width: "287px",
            height: "45px",
          }}
        />
      </div>
      <div>
        <span className="input-title" style={{ marginRight: "235px" }}>
          購入場所
        </span>

        <Input
          name="buyer"
          defaultValue={plantDetails?.buyer || null}
          onChange={(e) => props.handleValueChange("buyer", e)}
          style={{
            marginTop: "2px",
            borderColor: "#dedede",
            borderWidth: "1.5px",
            borderRadius: "7px",
            backgroundColor: "white",
            color: "black",
            width: "287px",
            height: "45px",
            lineHeight: "42px",
          }}
        />
      </div>
    </div>
  );
};

export default PlantPurchase;
