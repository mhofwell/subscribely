import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import client from "../apollo-client";
import { signIn, signOut, useSession } from "next-auth/client";
import gql from "graphql-tag";

export async function getServerSideProps() {
  
  const { data } = await client.query({
    query: gql`
      query Users {
        users {
          _id
          email
          emailVerified
        }
      }
    `,
  });
  return {
    props: {
      users: data.users
    }
  }
}

export default function Home({users}) {
  
const [session, loading] = useSession();

  console.log(users);

if (loading) {
  return <p>We're almost there!...</p>
}

  return (
    <div className={styles.container}>
      <Head>
      <title>Subscribely</title>
        <meta name="description" content="Monitor your credit carb subs!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Subscribely</h1>
        <p className={styles.description}>Track your active monthly subscriptions in one place </p>
        <h2>
          {session ? (
            <>
              <p>Signed in as {session.user.email}</p>
              <div className={styles.containerb}>
                <button className={styles.button} href="#" onClick={signOut}>
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <button className={styles.button} href="#" onClick={signIn}>
              Start
            </button>

          )}
        </h2>
        <div className={styles.grid}>
          {users.map((user) => (
            <div key={user._id} className={styles.card}>
              <h3>{user.email}</h3>

            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
