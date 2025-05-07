// src/middleware.js
import { NextResponse } from 'next/server';

// This middleware will run on all routes
export function middleware(request) {
  // Get the path of the current request
  const path = request.nextUrl.pathname;
  
  // Only apply protection to the success page
  if (path === '/success') {
    // Check if a cookie exists indicating successful submission
    // For SSR, we use cookies instead of sessionStorage
    const formSubmission = request.cookies.get('formSubmissionComplete');
    
    // If the cookie doesn't exist, redirect to the home page
    if (!formSubmission) {
      return NextResponse.redirect(new URL('/', request.url));

    }
  }
}
