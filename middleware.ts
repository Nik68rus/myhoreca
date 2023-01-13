import { TokenPayload } from './types/user';
import { Routes } from './types/routes';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateToken, generateToken } from './helpers/token';
import { errors } from 'jose';
import ApiError from './helpers/error';

const protectedRoutes = [Routes.ACCOUNT, Routes.ACTIVATION];

const updateTokens = async (
  token: string | undefined,
  request: NextRequest
) => {
  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
  }
  try {
    const data = await validateToken(token, process.env.JWT_REFRESH_SECRET);
    const user: TokenPayload = {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      isActivated: data.isActivated,
    };

    const aToken = await generateToken(user, process.env.JWT_ACCESS_SECRET, 20);

    request.cookies.set('accessToken', aToken);
    return NextResponse.next();
  } catch (error) {
    console.log(error);

    return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
  }
};

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
    if (error instanceof errors.JWTExpired) {
      const url = new URL('/api/user/refresh', request.url);
      url.search = `from=${request.url}`;
      return NextResponse.redirect(url);
    }

    return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
  }
}
