import fetchClient from "@/lib/fetch-client";
import { jwt } from "@/lib/utils";
import { DefaultSession, getServerSession, type NextAuthOptions, type User } from "next-auth";
import type { DefaultJWT, JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { LoginResponse, Role, Status } from "./models";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { inter } from "@/app/fonts";
import { json } from "stream/consumers";


export interface JWTObject extends DefaultJWT{
  id?:string,
  role?:Role,
  status?:Status,
  firstName?:string,
  lastName?:string,
  accessToken?:string,
  refreshToken?:string,
  exp?:string,
}



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
      

          if (!data?.token) {
            throw response;
          }

          return{
            id:data.user.id,
            email:data.user.email,
            role:data.user.role,
            status:data.user.status,
            name:`${data.user.firstName} ${data.user.lastName}`,
            firstName: data.user.firstName,
            lastName:data.user.lastName,
            accessToken:data?.token,
            exp:data.tokenExpires,
            refreshToken:data.refreshToken,
            picture:data.user.photo
          }
        } catch (error) {
          if (error instanceof Response) {
           
            return null;
          }

          throw new Error("An error has occurred during login request");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session,account }) {
      const jwtToken = token as JWTObject
      // console.log("jwt auth---> " + JSON.stringify(jwtToken) + " \n user---> " + JSON.stringify(user) + "\n trigger--->" + JSON.stringify(trigger) + "\n session--->" + JSON.stringify(session)+"\n account---> "+JSON.stringify(account) + "\n now---> " + JSON.stringify(Date.now()))
      if(trigger === "signIn"){
        if(account){
          if(account.type === "credentials"){
            return { ...jwtToken, ...user };
          }else if(account.type === "oauth"){
            const response = await fetchClient({
              method: "POST",
              url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "v1/auth/google/login",
              body:`{"idToken":"${account?.id_token}"}`,
            });
            
            if(!response.ok){
              throw response
            }

            const data: LoginResponse = await response.json();

            return{
              ...jwtToken,
              id:data.user.id,
              email:data.user.email,
              role:data.user.role,
              status:data.user.status,
              name:`${data.user.firstName} ${data.user.lastName}`,
              firstName: data.user.firstName,
              lastName:data.user.lastName,
              accessToken:data?.token,
              exp:data.tokenExpires,
              refreshToken:data.refreshToken,
              picture:data.user.photo
            }
          }
        }
      }

      else if (trigger === "update") {
        if (session.type === "MANUAL") {
          const response = await fetchClient({
            url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "v1/auth/me",
            token: jwtToken.accessToken,
          });

          

          const user = await response.json();
          // console.log("update response ----- > " +JSON.stringify(user))

          
          return { ...jwtToken, ...user , name: `${user.firstName} ${user.lastName}`};
        }

        return { ...jwtToken, ...session };
      }

      


      const {exp : accessTokenExpires } = jwt.decode(token.accessToken as string);

      if (!accessTokenExpires) {
        return token;
      }

      const currentUnixTimestamp = Math.floor(Date.now() / 1000);
      const accessTokenHasExpired = currentUnixTimestamp > accessTokenExpires;

      if (accessTokenHasExpired) {
        console.log("expired")
        return await refreshAccessToken(token);
      }

      return jwtToken;
    },
    async session({ session, token }) {

      if (token.error) {
        // console.log("token error ----> " + JSON.stringify(token.error))
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
    async signIn({account,user}){
      if(account?.type === "oauth"){
        try{
          const response = await fetchClient({
            method: "POST",
            url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "v1/auth/google/login",
            body:`{"idToken":"${account?.id_token}"}`,
          });
          // console.log("google login ---- > " + JSON.stringify(await response.json()))
          if(!response.ok){
            return false
          }
        }catch(error){
          return error.message
        }
      }
      
     
      return true
    }
  },
  events: {
    async signOut({ token }) {
      const response = await fetchClient({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "v1/auth/logout",
        token: token.accessToken as string,
      });

    }
  },
};

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetchClient({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "v1/auth/refresh",
    });

    console.log(response)

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