import { useState } from 'react';
import useSWR, { mutate, trigger } from 'swr';
import fetchData from '../libs/fetch';
import { v4 as uuidv4 } from 'uuid';

const optimisticUI = ({ query, secret, endPoint }) => {
  const [text, setText] = useState('');
  const { data } = useSWR(query, getData);

  async function getData(...args) {
    return await fetchData(query, secret, endPoint);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    mutate(
      query,
      { users: [...data.users, { id: uuidv4(), name: text }] },
      false
    );

    const mutation = {
      query:
        'mutation users($name: String!) { insert_users(objects: [{name: $name}]) { affected_rows } }',
      variables: { name: text },
    };

    await fetchData(mutation, secret, endPoint);
    trigger(mutation);
    setText('');
  }

  return (
    <div>
      <h1>Insert a new user</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {data
          ? data.users.map((user) => <li key={user.id}>{user.name}</li>)
          : 'Loading...'}
      </ul>
    </div>
  );
};

export const getServerSideProps = () => {
  const secret = process.env.HASURA_ADMIN_SECRET;
  const endPoint = process.env.GRAPHQL_ENDPOINT;

  const query = {
    query:
      'query { users(limit: 10, order_by: {created_at: desc}) { id name } }',
  };

  return {
    props: {
      query,
      secret,
      endPoint,
    },
  };
};

export default optimisticUI;
