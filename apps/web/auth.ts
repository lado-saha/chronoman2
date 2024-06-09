import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/models';
import bcrypt from 'bcryptjs';

const BASE_URL = process.env.API_BASE_URL;

async function getUser(email: string): Promise<User | undefined> {
  try {
    const response = await fetch(
      `${BASE_URL}/users/search?email=${encodeURIComponent(email)}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user.');
    }

    const user: User = await response.json();
    return user;
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
}
/**
 * Logs in the user
 */
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig /**We destructure the object to store  */,
  providers: [
    Credentials({
      async authorize(credentials) {
        // We try to validation and match the passed credentials
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          console.log(user);
          if (!user) return null;
          // Compare the hashes
          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log(`Password hash: ${passwordMatch}`);

          // if the passwords matches we return the user
          return user;
        }

        console.log('Invalid credentials.');
        return null;
      },
    }),
  ],
});
