import { useState } from "react";

const useEncryptMessage = () => {
  const [loading, setLoading] = useState(false);
  const encryptMessage = async (message, publicKeyBase64) => {
    setLoading(true);
    try {
      const publicKey = await window.crypto.subtle.importKey(
        "spki",
        new Uint8Array(
          window
            .atob(publicKeyBase64)
            .split("")
            .map((c) => c.charCodeAt(0))
        ),
        {
          name: "RSA-OAEP",
          hash: { name: "SHA-256" },
        },
        true,
        ["encrypt"]
      );
      const encrypted = await window.crypto.subtle.encrypt(
        {
          name: "RSA-OAEP",
        },
        publicKey,
        new TextEncoder().encode(message)
      );
      return window.btoa(String.fromCharCode(...new Uint8Array(encrypted)));
    } catch (error) {
      console.error("Encryption error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { loading, encryptMessage };
};

export default useEncryptMessage;
