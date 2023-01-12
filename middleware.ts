import { Routes } from './types/routes';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { access } from 'fs';
import tokenService, { TokenPayload } from './services/TokenService';
import jwt from 'jsonwebtoken';

const protectedRoutes = [Routes.ACCOUNT, Routes.ACTIVATION];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (
    !protectedRoutes.some(
      (route) => route === request.nextUrl.pathname.toString()
    )
  ) {
    return NextResponse.next();
  }
  const accessToken = request.cookies.get('accessToken');

  if (!accessToken) {
    return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
  }

  // let userData = await tokenService.validateAccessToken(accessToken.value);

  // console.log(userData);

  // console.log(userData);

  // if (!userData) {
  //   // return NextResponse.redirect(process.env.APP_URL + Routes.LOGIN);
  //   return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
  // }
  return NextResponse.next();
}
