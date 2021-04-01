import fetchData from '../libs/fetch';

import useSWR from 'swr';

export default function Home({ query, secret, endPoint }) {
  const { data, error } = useSWR(query, getData);

  async function getData(...args) {
    return await fetchData(query, secret, endPoint);
  }

  if (error) {
    return <div>Error...</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Users from database</h1>
      <div>
        {data.users.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = () => {
  const secret = process.env.HASURA_ADMIN_SECRET;
  const endPoint = process.env.GRAPHQL_ENDPOINT;

  const query = {
    query: 'query { users(limit:10, order_by:{created_at: desc}) { id name } }',
  };

  return {
    props: {
      query,
      secret,
      endPoint,
    },
  };
};
