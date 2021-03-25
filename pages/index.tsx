import Head from "next/head";
import { HomePage } from "../src/components/HomePage";

export default function Index() {
  return (
    <div>
      <Head>
        <title>Sorting Algorithm Animation</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <HomePage />
    </div>
  );
}
