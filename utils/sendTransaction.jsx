import { useState, useCallback } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";

const CreateTransaction = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [processing, setProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState(false);

  const handleTransaction = useCallback(
    async (senderPublicKey, receiverPublicKey, amount) => {
      setProcessing(true);

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
        setConfirmation(true);
      } catch (error) {
        console.warn(error);
        setConfirmation(false);
        setError(true);
      }

      setProcessing(false);
    },
    [publicKey, sendTransaction, connection]
  );

  return { processing, confirmation, error, handleTransaction };
};

export default CreateTransaction;
