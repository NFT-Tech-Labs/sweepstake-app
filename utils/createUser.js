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
import { toast } from "react-toastify";

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
  const { publicKey } = useWallet();
  const [processingUser, setProcessingUser] = useState(false);
  const [confirmationUser, setConfirmationUser] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  let program;

  if (provider) {
    program = new Program(idl, idl.metadata.address, provider);
  }

  const handleUser = async (id, userState, signers) => {
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
      const signature = await toast.promise(
        program.methods
          .createUser(id)
          .accounts({
            userState: userState,
            authority: provider?.wallet?.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .signers([signers])
          .rpc(),
        {
          pending: "Initializing user...",
          error: "Something went wrong!",
        }
      );

      // we confirm the transaction using the latest blockheight
      await toast.promise(
        connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature,
        }),
        {
          success: "User initialized!",
          error: "Something went wrong!",
        }
      );

      // update confirmation state
      setConfirmationUser(true);
    } catch (error) {
      console.warn(error);
      setConfirmationUser(false);
      setErrorUser(true);
    }

    setProcessingUser(false);
  };

  return {
    processingUser,
    confirmationUser,
    errorUser,
    handleUser,
  };
};

export default SendUser;
