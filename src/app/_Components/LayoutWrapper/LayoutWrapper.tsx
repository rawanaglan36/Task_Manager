"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Toaster } from "react-hot-toast";
import AuthGuard from "@/app/_utils/gurad/AuthGurad";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/verify";

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {isAuthPage ? (
        children
      ) : (
        <AuthGuard>
          {children}
        </AuthGuard>
      )}
    </>
  );
}
