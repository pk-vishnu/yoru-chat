import bufferToBase64 from "../utils/bufferToBase64";

const useSymmetricEncryption = () => {
  const symmetricEncrypt = async (message) => {
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
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Generate a random IV
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      data
    );

    return { encryptedData: bufferToBase64(encrypted), iv: bufferToBase64(iv) };
  };
  return { symmetricEncrypt };
};

export default useSymmetricEncryption;
