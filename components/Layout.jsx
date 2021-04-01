import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Next SWR GraphQL</title>
      </Head>
      <header>
        <ul>
          <li>
            <Link href="/">
              <a>Queries</a>
            </Link>
          </li>
          <li>
            <Link href="/optimistic-ui">
              <a>Optimistic UI</a>
            </Link>
          </li>
          <li>
            <Link href="/subscriptions">
              <a>Subscriptions</a>
            </Link>
          </li>
        </ul>
      </header>
      {children}
    </div>
  );
};

export default Layout;
