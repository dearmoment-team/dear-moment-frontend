import { NextRequest, NextResponse } from 'next/server';
import { fetchLogin } from '@/api/oauth/kakao/callback';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ success: false, message: 'code 파라미터 없음' }, { status: 400 });
  }

  const response = await fetchLogin(code);
  console.log('response>> ', response);
  return NextResponse.json({ success: true, data: response });
}
