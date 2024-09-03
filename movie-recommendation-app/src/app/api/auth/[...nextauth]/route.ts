// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';

const users = [
  { id: 1, email: 'user@example.com', password: 'password123' },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = users.find(
          (user) => user.email === credentials?.email && user.password === credentials?.password
        );
        if (user) {
          return user;
        }
        throw new Error('Invalid email or password');
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(authOptions);
