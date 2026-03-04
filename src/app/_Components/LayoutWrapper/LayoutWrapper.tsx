"use client";

import React from "react";

import { Toaster } from "react-hot-toast";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </>
  );
}
