import dbConnect from "@/database";
import { EmployeeModel, UserModel } from "@fcai-sis/shared-models";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.password === undefined ||
          credentials?.username === undefined
        ) {
          return null;
        }

        await dbConnect();

        const employee = await EmployeeModel.findOne({
          username: credentials.username,
        });

        if (!employee) {
          return null;
        }

        const user = await UserModel.findById(employee.userId);

        if (!user) {
          return null;
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) {
          return null;
        }

        return {
          id: user._id,
          email: user._id,
          name: "employee",
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
