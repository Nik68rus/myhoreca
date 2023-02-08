import { Routes } from './types/routes';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateToken, generateToken } from './helpers/token';

const protectedRoutes = [Routes.ACCOUNT, Routes.ACTIVATION];

export async function middleware(request: NextRequest) {
  if (
    !protectedRoutes.some(
      (route) => route === request.nextUrl.pathname.toString()
    )
  ) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
  }

  try {
    await validateToken(accessToken, process.env.JWT_ACCESS_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
  }
}
