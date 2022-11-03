import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
  },
  {
    callbacks: {
      authorized: ({token}) => !!token,
    },
    pages: {
      signIn: '/auth/signin'
    }
  }
)

export const config = { matcher: "/dashboard/:path*"}
