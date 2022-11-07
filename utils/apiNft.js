/* eslint-disable no-undef */
export async function fetchData(type, address, method) {
  try {
    const options = {
      headers: {
        accept: "application/json",
        "x-api-key": process.env.MORALIS_API_KEY,
      },
    };

    const res = await fetch(
      `https://solana-gateway.moralis.io/${type}/${process.env.NETWORK}/${address}/${method}`,
      options
    );
    const data = res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
}
