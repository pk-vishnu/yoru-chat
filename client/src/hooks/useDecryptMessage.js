import { useState } from "react";

const useDecryptMessage = () => {
  const [decryptionLoading, setdecryptionLoading] = useState(false);

  const decryptMessage = async (encryptedMessage) => {
    setdecryptionLoading(true);
    try {
      // Retrieve private key from localStorage
      const privateKeyBase64 = localStorage.getItem("privateKey");
      if (!privateKeyBase64) {
        throw new Error("Private key not found in localStorage");
      }
      // Import private key
      const privateKey = await window.crypto.subtle.importKey(
        "pkcs8",
        new Uint8Array(
          atob(privateKeyBase64)
            .split("")
            .map((c) => c.charCodeAt(0))
        ),
        {
          name: "RSA-OAEP",
          hash: { name: "SHA-256" },
        },
        true,
        ["decrypt"]
      );

      // Decrypt message
      const decryptedArrayBuffer = await window.crypto.subtle.decrypt(
        {
          name: "RSA-OAEP",
        },
        privateKey,
        new Uint8Array(
          Array.from(atob(encryptedMessage), (c) => c.charCodeAt(0))
        )
      );

      const decryptedMessage = new TextDecoder().decode(decryptedArrayBuffer);
      return decryptedMessage;
    } catch (error) {
      console.error("Decryption error:", error);
      throw error;
    } finally {
      setdecryptionLoading(false);
    }
  };

  return { decryptionLoading, decryptMessage };
};

export default useDecryptMessage;
