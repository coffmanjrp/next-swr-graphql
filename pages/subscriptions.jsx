import subscribe from '../libs/subscribe';
import useSWR from 'swr';

const Subscriptions = ({ ws, userSubscription }) => {
  const { data } = useSWR(userSubscription, subscriptionData);

  async function subscriptionData() {
    return subscribe(userSubscription, ws);
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Subscribed to Latest 10 users from the database</h1>
      <div>
        {data.users.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = () => {
  const endPoint = process.env.GRAPHQL_ENDPOINT_WS;

  const userSubscription = `
  subscription {
    users(order_by: {created_at: desc}, limit: 10) {
      id
      name
      created_at
    }
  }
`;

  return {
    props: {
      endPoint,
      userSubscription,
    },
  };
};

export default Subscriptions;
