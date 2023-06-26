import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/app/prisma";
import bcrypt from "bcryptjs";
import { encryptJWT } from "@/app/lib/jwt";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string }, req) {
        console.log(credentials);
        const { email, password } = credentials;
        async function checkCredentials() {
          try {
            if (email && password) {
              //checking if email and password exists on Body or not
              const checkUser = await prisma.users.findUniqueOrThrow({
                where: { email: email },
                include: { cart: true },
              });
              console.log(checkUser);
              const checkPass = await bcrypt.compareSync(
                password,
                checkUser.password
              );
              if (checkPass) {
                const { name, id, email } = checkUser;
                const cartId = checkUser.cart.id;
                return {
                  UserData: {
                    name,
                    id,
                    email,
                    cartId,
                  },
                  error: false,
                };
              } else {
                return null;
              }
            }
          } catch (error) {
            return null;
          }
        }
        const Result = await checkCredentials();
        if (Result?.UserData) {
          const Token = await encryptJWT(Result.UserData);
          return { ...Result.UserData, accessToken: Token };
        } else {
          // return null;
          throw new Error("Password Wrong");
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, //24Hours Expiry
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: { newUser: "/auth/register" },
});

export { handler as GET, handler as POST };
