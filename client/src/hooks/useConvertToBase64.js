import { useState } from "react";
const useConvertToBase64 = () => {
  const [base64Image, setBase64Image] = useState("");
  const convertBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64Image(reader.result);
    };
    return base64Image;
  };
  return { base64Image, convertBase64 };
};

export default useConvertToBase64;
