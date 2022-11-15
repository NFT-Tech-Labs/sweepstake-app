import { useState } from "react";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { SystemProgram } from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
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

const SendSplTokens = () => {
  const provider = getProvider();
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [processing, setProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState(false);
  let program;

  if (provider) {
    program = new Program(idl, idl.metadata.address, provider);
  }

  const handlePayment = async (
    input,
    mint,
    userState,
    dagoatsWallet,
    sweepstakeState,
    signers
  ) => {
    setError(false);
    setConfirmation(false);
    setProcessing(true);

    const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
      provider?.connection,
      provider?.wallet,
      new web3.PublicKey(mint),
      provider?.wallet?.publicKey
    );

    const dagoatsAssociatedTokenAccount =
      await getOrCreateAssociatedTokenAccount(
        provider?.connection,
        provider?.wallet,
        new web3.PublicKey(mint),
        new web3.PublicKey(dagoatsWallet)
      );

    try {
      if (!publicKey) throw new WalletNotConnectedError();

      const {
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      const signature = await program.methods
        .createSweepstakeSpl(input)
        .accounts({
          mint: new web3.PublicKey(mint),
          userState: userState,
          authority: provider?.wallet?.publicKey,
          dagoatsWallet: dagoatsAssociatedTokenAccount?.address,
          systemProgram: SystemProgram.programId,
          sweepstakeState: sweepstakeState,
          userWallet: associatedTokenAccount?.address,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([signers])
        .rpc();

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
  };

  return {
    processing,
    confirmation,
    error,
    handlePayment,
  };
};

export default SendSplTokens;
