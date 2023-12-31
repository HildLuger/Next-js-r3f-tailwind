'use client';

import Head from 'next/head';
import ThreeScene from './Skull';
import './globals.css';


export default function Home() {
  return (
    <>
   <Head>
        <title>Hild Luger Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <main >
  
      <ThreeScene />
      {/* Other page content */}
    </main>
  
    </>
  );
}