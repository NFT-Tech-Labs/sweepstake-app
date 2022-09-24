import { useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import bs58 from "bs58";
import { sign } from "tweetnacl";

const CreateSign = () => {
  const { publicKey, signMessage } = useWallet();
  const [processing, setProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState(false);

  const handleSign = useCallback(
    async (text) => {
      setProcessing(true);

      try {
        // `publicKey` will be null if the wallet isn't connected
        if (!publicKey) throw new WalletNotConnectedError();
        // `signMessage` will be undefined if the wallet doesn't support it
        if (!signMessage)
          throw new Error("Wallet does not support message signing!");

        // Encode anything as bytes
        const message = new TextEncoder().encode(text);
        // Sign the bytes using the wallet
        const signature = await signMessage(message);
        // Verify that the bytes were signed using the private key that matches the known public key
        if (!sign.detached.verify(message, signature, publicKey.toBytes()))
          throw new Error("Invalid signature!");

        console.log(`Message signature: ${bs58.encode(signature)}`);
        setConfirmation(true);
      } catch (error) {
        // alert(`Signing failed: ${error?.message}`);
        setConfirmation(false);
        setError(true);
      }

      setProcessing(false);
    },
    [publicKey, signMessage]
  );

  return { processing, confirmation, error, handleSign };
};

export default CreateSign;
