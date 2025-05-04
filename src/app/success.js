// pages/success.js
import Link from 'next/link';

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Form Submitted Successfully!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Thank you for submitting your induction form. Well review your application and get back to you soon.
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <Link href="/">
            <a className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Return to Home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}