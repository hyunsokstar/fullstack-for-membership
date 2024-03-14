'use client'
import type { Metadata } from "next";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import HeaderNavigation from "./components/HeaderNavigation";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <HeaderNavigation />
            {children}
          </ChakraProvider>
        </QueryClientProvider>
      </body>
    </html >
  );
}
