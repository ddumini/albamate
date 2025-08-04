import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 환경 변수에서 API URL 가져오기
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL ||
      'https://fe-project-albaform.vercel.app';
    const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID || '15-3';
    const baseURL = `${API_URL}${TEAM_ID}/`;

    // 사용자 타입에 따라 다른 데이터 구조 생성
    let signUpData;

    if (body.role === 'OWNER') {
      // 사장님 회원가입 데이터
      signUpData = {
        email: body.email,
        password: body.password,
        role: body.role,
        name: '',
        nickname: '',
        phoneNumber: '',
        location: body.location,
        storeName: body.storeName,
        storePhoneNumber: body.storePhoneNumber,
      };
    } else {
      // 지원자 회원가입 데이터
      signUpData = {
        email: body.email,
        password: body.password,
        role: body.role,
        name: body.name,
        nickname: body.nickname,
        phoneNumber: body.phoneNumber,
        location: body.location,
        storeName: body.storeName,
        storePhoneNumber: body.storePhoneNumber,
      };
    }

    // 백엔드 API로 회원가입 요청
    const response = await fetch(`${baseURL}auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpData),
    });

    const responseData = await response.json();

    if (response.ok) {
      return NextResponse.json(responseData, { status: response.status });
    } else {
      return NextResponse.json(
        { error: '회원가입에 실패했습니다.' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('회원가입 API 오류:', error);
    console.error('에러 상세:', {
      message: (error as any).message,
      cause: (error as any).cause,
    });

    // 에러 메시지 처리
    const errorMessage =
      (error as any).message || '회원가입 중 오류가 발생했습니다.';

    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
