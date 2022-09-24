import { useState, useCallback, useEffect } from "react";
import { Metaplex } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

const FetchNfts = () => {
  // const { connection } = useConnection();
  const { publicKey } = useWallet();
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const [nftData, setNftData] = useState();
  const [processing, setProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState(false);

  const handleFetch = async (address) => {
    setProcessing(true);
    // "Hk6pt29VWbTfFn9kfS58jhPhQA8qUesEBcq9pzJjeXW4",
    try {
      const metaplex = new Metaplex(connection);
      if (publicKey) {
        const myNfts = await metaplex
          .nfts()
          .findAllByOwner({
            owner: "Hk6pt29VWbTfFn9kfS58jhPhQA8qUesEBcq9pzJjeXW4",
          })
          .run();

        setNftData(myNfts);
        setConfirmation(true);
      }
    } catch (error) {
      console.log(error);
      setConfirmation(false);
      setError(true);
    }

    setProcessing(false);
  };

  useEffect(() => {
    handleFetch();
  }, [publicKey]);

  return { nftData, processing, confirmation, error, handleFetch };
};

export default FetchNfts;
