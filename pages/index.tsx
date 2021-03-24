import Head from "next/head";
import { HomePage } from "../src/components/HomePage";

export default function Index() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </div>
  );
}
