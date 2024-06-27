const useConvertToBase64 = () => {
  const convertBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result;
      callback(base64String);
    };
    reader.onerror = (error) => {
      console.error("Error converting file to base64:", error);
    };
  };

  return { convertBase64 };
};

export default useConvertToBase64;
