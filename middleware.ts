import { TokenPayload } from './types/user';
import { Routes } from './types/routes';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateToken, generateToken } from './helpers/token';
import { errors } from 'jose';
import ApiError from './helpers/error';

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
    console.log('!!!!!!!!!!!!!!!!!redirect-----------------');

    return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
  }

  try {
    await validateToken(accessToken, process.env.JWT_ACCESS_SECRET);
    return NextResponse.next();
  } catch (error) {
    console.log('-------!!!!!!!!!!!!!!!!!redirect-----------------');

    return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
  }
}
