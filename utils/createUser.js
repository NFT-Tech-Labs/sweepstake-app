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

        // get latest block height
        const {
          value: { blockhash, lastValidBlockHeight },
        } = await connection.getLatestBlockhashAndContext();

        // get transaction signature
        const signature = await program.methods
          .createUser(id)
          .accounts({
            userState: userState,
            authority: provider?.wallet?.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .signers([signers])
          .rpc();

        // we confirm the transaction using the latest blockheight
        await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature,
        });

        // update confirmation state
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

  console.log(confirmationUser);

  return {
    processingUser,
    confirmationUser,
    errorUser,
    handleUser,
  };
};

export default SendUser;
