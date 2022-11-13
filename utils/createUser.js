import { useState, useCallback } from "react";
import { Program, AnchorProvider, web3, BN } from "@project-serum/anchor";
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

const SendUser = () => {
  const provider = getProvider();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [processingUser, setProcessingUser] = useState(false);
  const [confirmationUser, setConfirmationUser] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  let program;

  if (provider) {
    program = new Program(idl, idl.metadata.address, provider);
  }

  const handleUser = useCallback(
    async (id, userState, signers) => {
      setErrorUser(false);
      setConfirmationUser(false);
      setProcessingUser(true);

      try {
        if (!publicKey) throw new WalletNotConnectedError();
        await program.methods
          .createUser(id)
          .accounts({
            userState: userState,
            authority: provider?.wallet?.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .signers([signers])
          .rpc();

        setConfirmationUser(true);
      } catch (error) {
        console.warn(error);
        setConfirmationUser(false);
        setErrorUser(true);
      }

      setProcessingUser(false);
    },
    [publicKey, connection]
  );

  return {
    processingUser,
    confirmationUser,
    errorUser,
    handleUser,
  };
};

export default SendUser;
