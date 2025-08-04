import { NextRequest, NextResponse } from 'next/server';

import { axiosInstance } from '@/shared/lib/axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 사용자 타입에 따라 다른 데이터 구조 생성
    let signUpData;

    if (body.role === 'OWNER') {
      // 사장님 회원가입 데이터
      signUpData = {
        email: body.email,
        password: body.password,
        role: body.role,
        name: '',
        nickname: body.nickname,
        phoneNumber: body.phoneNumber,
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
      };
    }

    // 백엔드 API로 회원가입 요청
    const response = await axiosInstance.post('/auth/sign-up', signUpData);

    if (response.status === 200) {
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
      details: (error as any).response?.data?.details, // 추가
      validationErrors: (error as any).response?.data?.validationErrors, // 추가
    });

    // 백엔드에서 반환한 상세 오류 정보 사용
    const backendError = (error as any).response?.data;
    const errorMessage =
      backendError?.message ||
      backendError?.error ||
      (error as any).message ||
      '회원가입 중 오류가 발생했습니다.';

    return NextResponse.json(
      {
        error: errorMessage,
        details: backendError?.details, // 상세 오류 정보 포함
        validationErrors: backendError?.validationErrors, // 검증 오류 포함
      },
      { status: (error as any).response?.status || 500 }
    );
  }
}
