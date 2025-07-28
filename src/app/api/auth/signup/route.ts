import { NextRequest, NextResponse } from 'next/server';

import { axiosInstance } from '@/shared/lib/axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('회원가입 API 호출:', body);

    // 백엔드 스펙에 맞게 데이터 정리
    const signUpData = {
      email: body.email,
      password: body.password,
      name: body.name,
      role: body.role,
      nickname: body.nickname,
      phoneNumber: body.phoneNumber,
      location: body.location,
      storeName: body.storeName,
      storePhoneNumber: body.storePhoneNumber,
    };

    console.log('백엔드로 전송할 데이터:', signUpData);

    // 백엔드 API로 회원가입 요청
    const response = await axiosInstance.post('/auth/sign-up', signUpData);

    console.log('백엔드 회원가입 응답 상태:', response.status);
    console.log('백엔드 회원가입 응답 데이터:', response.data);

    if (response.status === 200) {
      // 백엔드 응답 데이터를 그대로 반환 (사용자 정보 + 토큰)
      return NextResponse.json(response.data, { status: 200 });
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
      response: (error as any).response?.data,
      status: (error as any).response?.status,
    });

    const errorMessage =
      (error as any).response?.data?.message ||
      (error as any).message ||
      '회원가입 중 오류가 발생했습니다.';

    return NextResponse.json(
      { error: errorMessage },
      { status: (error as any).response?.status || 500 }
    );
  }
}
