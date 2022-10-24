const postData = async (endpoint, token, body) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  };

  const res = await fetch(endpoint, options);

  const data = res.json();

  return data;
};

const getData = async (endpoint) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(endpoint, options);

  const data = res.json();

  return data;
};

export { postData, getData };
