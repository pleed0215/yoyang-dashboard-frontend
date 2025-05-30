import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const response = NextResponse.json({ success: true });
  response.cookies.set('access_token', '', {
    expires: new Date(0),
    path: '/',
  });
  response.cookies.set('refresh_token', '', {
    expires: new Date(0),
    path: '/',
  });
  return response;
};
