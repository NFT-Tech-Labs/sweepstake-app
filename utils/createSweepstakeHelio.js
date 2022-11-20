import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { toast } from "react-toastify";
import { postData } from "./api";

const SendHelio = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [processingHelio, setProcessingHelio] = useState(false);
  const [confirmationHelio, setConfirmationHelio] = useState(false);
  const [errorHelio, setErrorHelio] = useState(false);

  const handleHelioPayment = async (accessToken, data) => {
    setErrorHelio(false);
    setConfirmationHelio(false);
    setProcessingHelio(true);

    try {
      if (!publicKey) throw new WalletNotConnectedError();

      await toast.promise(
        postData(
          "https://backend-x7q2esrofa-no.a.run.app/api/v1/sweepstakes",
          accessToken,
          data
        ),
        {
          success: "Submitted!",
          error: "Something went wrong!",
        }
      );

      console.log("postHelio");
      setConfirmationHelio(true);
    } catch (error) {
      console.warn(error);
      setConfirmationHelio(false);
      setErrorHelio(true);
    }

    setProcessingHelio(false);
  };

  return {
    processingHelio,
    confirmationHelio,
    errorHelio,
    handleHelioPayment,
  };
};

export default SendHelio;
