const fetchData = async (query, secret, endPoint) => {
  const headers = {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': secret,
  };

  const options = {
    headers,
    method: 'POST',
    body: JSON.stringify(query),
  };

  const res = await fetch(endPoint, options);
  const json = await res.json();
  if (json.errors) {
    throw JSON.stringify(json.errors);
  }

  return json.data;
};

export default fetchData;
