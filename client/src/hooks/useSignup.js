import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (props) => {
    setLoading(true);

    try {
      // Generate the key pair using Web Crypto API
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: { name: "SHA-256" },
        },
        true,
        ["encrypt", "decrypt"]
      );

      const publicKey = await window.crypto.subtle.exportKey(
        "spki",
        keyPair.publicKey
      );
      const publicKeyBase64 = window.btoa(
        String.fromCharCode(...new Uint8Array(publicKey))
      );

      const privateKey = await window.crypto.subtle.exportKey(
        "pkcs8",
        keyPair.privateKey
      );
      const privateKeyBase64 = window.btoa(
        String.fromCharCode(...new Uint8Array(privateKey))
      );
      localStorage.setItem("privateKey", privateKeyBase64);

      // For symmetric encryption
      const myKey = await window.crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );
      const jwk = await window.crypto.subtle.exportKey("jwk", myKey);
      localStorage.setItem("myKey", JSON.stringify(jwk));

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...props, publicKey: publicKeyBase64 }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
