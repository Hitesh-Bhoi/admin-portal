"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{
    console.warn('Home called');
  },[])
  return (
    <>
      <h1>Dashboard page</h1>
    </>
  );
}
