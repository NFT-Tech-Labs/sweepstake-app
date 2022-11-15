import { useState } from "react";
import { Program, AnchorProvider } from "@project-serum/anchor";
import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { SystemProgram } from "@solana/web3.js";
import idl from "utils/idl.json";

const getProvider = () => {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  if (!anchorWallet) {
    return null;
  }

  const provider = new AnchorProvider(connection, anchorWallet, {
    preflightCommitment: "processed",
  });

  return provider;
};

const SendSolanaTokens = () => {
  const provider = getProvider();
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [processingSolana, setProcessingSolana] = useState(false);
  const [confirmationSolana, setConfirmationSolana] = useState(false);
  const [errorSolana, setErrorSolana] = useState(false);

  let program;
  if (provider) {
    program = new Program(idl, idl.metadata.address, provider);
  }

  const handleSolanaPayment = async (
    input,
    userState,
    dagoatsWallet,
    sweepstakeState,
    signers
  ) => {
    setErrorSolana(false);
    setConfirmationSolana(false);
    setProcessingSolana(true);

    try {
      if (!publicKey) throw new WalletNotConnectedError();

      const {
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      const signature = await program.methods
        .createSweepstakeSol(input)
        .accounts({
          userState: userState,
          authority: provider?.wallet?.publicKey,
          dagoatsWallet: dagoatsWallet,
          systemProgram: SystemProgram.programId,
          sweepstakeState: sweepstakeState,
        })
        .signers([signers])
        .rpc();

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
  };
  return {
    processingSolana,
    confirmationSolana,
    errorSolana,
    handleSolanaPayment,
  };
};

export default SendSolanaTokens;
