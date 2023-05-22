import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      phone: string;
      role: string;
      accessToken: string;
    };
  }
}