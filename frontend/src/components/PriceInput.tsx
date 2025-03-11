import React, { useState, useEffect } from "react";
import { Input } from "@douyinfe/semi-ui";
const PriceInput = (props: any) => {
  const plantDetails = props?.plantDetails;
  const [amount, setAmount] = useState<number>(1000);

  const handleOnChange = (e: any) => {
    setAmount(e.target.value);
  };
  const handleInputChangePrice = (value: string) => {
    const cleanedValue = value.replace(/[^\d]/g, "");
    setAmount(Number(cleanedValue));
  };

  useEffect(() => {
    props.handlePriceValueChange("price", amount);
  }, [amount]);

  return (
    <div>
      <Input
        name="plantPopularName"
        onChange={handleInputChangePrice}
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
        value={plantDetails?.price ? `¥${plantDetails.price}` : `¥${amount}`}
        type="text"
      />
      <input
        type="range"
        min="0"
        max="30000"
        step="100"
        value={plantDetails?.price ? plantDetails.price : amount}
        onChange={handleOnChange}
        style={{
          color: "red",
          outline: "none",
        }}
        className="custom-slider"
      />
      <style></style>
    </div>
  );
};

export default PriceInput;
