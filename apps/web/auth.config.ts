import type { NextAuthConfig } from 'next-auth';

/**
 * This is where we wil add options and routes for our auth pages
 * The callback is called before any navigation to a new Url
 */
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  // This is the middleware to protect our routes from unauthorized access
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // Get if the user is currently logged-in
      const isLoggedIn = !!auth?.user;
      // Check if user is currently on the dashboard
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        return isLoggedIn; //If false, Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // To avoid the user to enter a route direclty to a protected url
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig; // We make sure we satisfy the NextAuthConfig type spec
