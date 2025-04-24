'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="h-screen flex items-center justify-center">
      {session ? (
        <>
          <div className="text-center">
            <h1 className="text-2xl">Welcome, {session.username}!</h1>
            <img
              src={session.avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full mx-auto my-4"
            />
            <button
              onClick={() => signOut()}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center mb-4">
            <h1 className="text-2xl mb-4">Please sign in</h1>
            <button
              onClick={() => signIn('github')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign in with GitHub
            </button>
          </div>
        </>
      )}
    </div>
  );
}
