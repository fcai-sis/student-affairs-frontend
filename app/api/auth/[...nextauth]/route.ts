import dbConnect from "@/database";
import {
  EmployeeModel,
  StudentModel,
  UserModel,
} from "@fcai-sis/shared-models";
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
        employeeUsername: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("CREDENTIALS:", credentials);

        if (
          credentials?.password === undefined ||
          credentials?.employeeUsername === undefined
        ) {
          console.log("NOTHING FOUND");

          return null;
        }

        await dbConnect();

        const employee = await EmployeeModel.findOne({
          username: credentials.employeeUsername,
        });
        console.log("EMPLOYEE ACQUIRED:", employee);

        if (!employee) {
          return null;
        }

        const user = await UserModel.findById(employee.userId);
        console.log("USER ACQUIRED:", user);

        if (!user) {
          return null;
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log("IS PASSWORD MATCH:", isPasswordMatch ? "YES" : "NO");

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
