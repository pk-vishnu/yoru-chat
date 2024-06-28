import base64ToArrayBuffer from "../utils/base64ToBuffer";
const useSymmetricDecryption = () => {
  const symmetricDecrypt = async (encryptedData, iv) => {
    const jwk = JSON.parse(localStorage.getItem("myKey"));
    if (!jwk) {
      throw new Error("No key found in localStorage");
    }
    const key = await window.crypto.subtle.importKey(
      "jwk",
      jwk,
      {
        name: "AES-GCM",
      },
      true,
      ["encrypt", "decrypt"]
    );
    try {
      const encryptedDataArrayBuffer = base64ToArrayBuffer(encryptedData);
      const ivArrayBuffer = base64ToArrayBuffer(iv);
      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: ivArrayBuffer,
        },
        key,
        encryptedDataArrayBuffer
      );

      const decoder = new TextDecoder();
      return decoder.decode(decrypted);
    } catch (error) {
      console.error("Decryption error:", error);
      throw error;
    }
  };
  return { symmetricDecrypt };
};

export default useSymmetricDecryption;
