import { useState, useCallback } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";

const SendSolanaTokens = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [processingSolana, setProcessingSolana] = useState(false);
  const [confirmationSolana, setConfirmationSolana] = useState(false);
  const [errorSolana, setErrorSolana] = useState(false);

  const handleSolanaPayment = useCallback(
    async (senderPublicKey, receiverPublicKey, amount) => {
      setErrorSolana(false);
      setConfirmationSolana(false);
      setProcessingSolana(true);

      try {
        if (!publicKey) throw new WalletNotConnectedError();
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: senderPublicKey,
            toPubkey: receiverPublicKey,
            lamports: LAMPORTS_PER_SOL * amount,
          })
        );

        const {
          context: { slot: minContextSlot },
          value: { blockhash, lastValidBlockHeight },
        } = await connection.getLatestBlockhashAndContext();

        const signature = await sendTransaction(transaction, connection, {
          minContextSlot,
        });

        await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature,
        });
        setConfirmationSolana(true);
      } catch (error) {
        console.warn(error);
        setConfirmationSolana(false);
        setErrorSolana(true);
      }

      setProcessingSolana(false);
    },
    [publicKey, sendTransaction, connection]
  );

  return {
    processingSolana,
    confirmationSolana,
    errorSolana,
    handleSolanaPayment,
  };
};

export default SendSolanaTokens;
