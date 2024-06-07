import fetchClient from "@/lib/fetch-client";
import { jwt } from "@/lib/utils";
import { getServerSession, type NextAuthOptions, type User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginResponse } from "./models";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { tokenToString } from "typescript";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: parseInt(process.env.NEXTAUTH_JWT_AGE!) || 1209600,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const response = await fetchClient({
            method: "POST",
            url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "v1/auth/email/login",
            body: JSON.stringify(credentials),
          });
         

          if (!response.ok) {
            throw response;
          }

          const data: LoginResponse = await response.json();
          console.log("login---->"+JSON.stringify(data))

          if (!data?.token) {
            throw response;
          }

          return { ...data.user, name: `${data.user.firstName} ${data.user.lastName}`, accessToken: data?.token };
        } catch (error) {
          if (error instanceof Response) {
            console.log("login error---->"+JSON.stringify(error))
            return null;
          }

          throw new Error("An error has occurred during login request");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
    
      if (trigger === "update") {
        if (session.type === "MANUAL") {
          const response = await fetchClient({
            url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/user",
            token: token.accessToken,
          });
          const user = await response.json();

          console.log("returning manual ---- ")
          return { ...token, ...user };
        }

        console.log("returning update ---- ")
        return { ...token, ...session };
      }

      if (user) {
        console.log("returning user ---- " + JSON.stringify(user))
        return { ...token, ...user };
      }

      const { exp: accessTokenExpires } = jwt.decode(token.accessToken);

      if (!accessTokenExpires) {
        return token;
      }

      const currentUnixTimestamp = Math.floor(Date.now() / 1000);
      const accessTokenHasExpired = currentUnixTimestamp > accessTokenExpires;

      if (accessTokenHasExpired) {
        console.log("returning after refresh ---- " + JSON.stringify(token))
        return await refreshAccessToken(token);
      }

      console.log("returning token ---- " + JSON.stringify(token))
      return token;
    },
    async session({ session, token }) {

      console.log("session ----- > " + JSON.stringify(session) + " token ----- > " + JSON.stringify(token) )

      if (token.error) {
        throw new Error("Refresh token has expired");
      }

      session.accessToken = token.accessToken;
      session.user.name = token.name || "";
      session.user.email = token.email || "";
      session.user.firstName = token.firstName || "";
      session.user.lastName = token.lastName || "";
      session.user.isEmailVarified = token.status.id === "1";

      return session;
    },
  },
  events: {
    async signOut({ token }) {
      console.log("logout---->"+token.accessToken)
      const response = await fetchClient({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "v1/auth/logout",
        token: token.accessToken,
      });

      console.log("logout---->"+response)
    },
  },
};

async function refreshAccessToken(token: JWT) {
  console.log("---------- refreshing token ---------- ")
  try {
    const response = await fetchClient({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "v1/auth/refresh",
    });

    if (!response.ok) throw response;

    const refreshedAccessToken: { access_token: string } = await response.json();
    const { exp } = jwt.decode(refreshedAccessToken.access_token);

    return {
      ...token,
      accessToken: refreshedAccessToken.access_token,
      exp,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}



// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions)
}