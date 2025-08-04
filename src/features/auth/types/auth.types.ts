/**
 * 사용자 정보 타입
 *
 * 백엔드에서 반환하는 사용자(User) 객체의 구조를 정의합니다.
 * 일반적으로 로그인, 회원가입, 세션 조회 시 응답의 일부로 포함됩니다.
 * 대부분의 화면에서 사용자 정보를 보여줄 때 이 타입을 기반으로 사용합니다.
 *
 * 예시:
 * {
 *   location: "서울시 강남구",
 *   phoneNumber: "01012345678",
 *   storePhoneNumber: "021234567",
 *   storeName: "가게 이름",
 *   role: "APPLICANT",
 *   imageUrl: "https://cdn.com/avatar.png",
 *   nickname: "이름",
 *   name: "이름",
 *   email: "user@example.com",
 *   id: 1
 * }
 */
export interface User {
  location: string | null; // 가게 위치 (nullable)
  phoneNumber: string | null; // 사장님 전화번호 (nullable)
  storePhoneNumber: string | null; // 가게 전화번호 (nullable)
  storeName: string | null; // 가게 이름 (nullable)
  role: 'APPLICANT' | 'OWNER';
  imageUrl: string | null; // 프로필 이미지 URL, 없으면 null
  nickname: string | null; // 사용자 별명 (nullable)
  name: string | null; // 사용자 이름 (nullable)
  email: string; // 사용자 이메일 (로그인 ID)
  id: number; // 사용자의 고유 ID (DB의 PK)
}

/**
 * 인증 응답 타입
 *
 * 로그인, 회원가입 요청 이후 백엔드에서 반환하는 전체 응답 구조입니다.
 * accessToken과 refreshToken은 JWT 기반 인증을 위한 필수 요소이며,
 * user는 현재 로그인된 사용자 정보를 포함합니다.
 *
 * 프론트엔드에서 이 정보를 받아 세션 상태를 저장하거나,
 * accessToken을 이후 API 요청 시 Authorization 헤더에 포함시켜 사용합니다.
 */
export interface AuthResponse {
  user: User; // 로그인한 사용자 정보
  accessToken: string; // API 요청 시 사용할 짧은 수명의 JWT
  refreshToken: string; // accessToken 만료 시 재발급에 사용하는 긴 수명의 토큰
}

/**
 * 로그인 요청 타입
 *
 * 로그인 폼에서 입력한 값을 서버에 보낼 때 사용하는 형식입니다.
 * 사용자는 이메일과 비밀번호를 입력하고,
 * 이 값들이 POST 요청의 body로 전송됩니다.
 *
 * 예시:
 * {
 *   email: "user@example.com",
 *   password: "password123"
 * }
 */
export interface SignInRequest {
  email: string; // 사용자 이메일
  password: string; // 사용자 비밀번호 (평문 상태)
}

/**
 * 사장님 회원가입 API 요청 타입
 *
 * 백엔드 API에 전송하는 실제 요청 형식
 */
export interface OwnerSignUpRequest {
  email: string;
  password: string;
  passwordConfirmation: string;
  role: 'OWNER';
}

/**
 * 지원자 회원가입 API 요청 타입
 *
 * 백엔드 API에 전송하는 실제 요청 형식
 */
export interface ApplicantSignUpRequest {
  email: string;
  password: string;
  passwordConfirmation: string;
  role: 'APPLICANT';
}

/**
 * 통합 회원가입 API 요청 타입
 */
export type SignUpRequest = OwnerSignUpRequest | ApplicantSignUpRequest;

/**
 * 토큰 갱신 요청 타입
 *
 * accessToken이 만료되었을 때, refreshToken을 이용하여 새로운 accessToken을
 * 요청할 때 사용하는 요청 형식입니다.
 *
 * 예시:
 * {
 *   refreshToken: "refresh-token-value"
 * }
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * 토큰 갱신 응답 타입
 *
 * 토큰 갱신 요청 이후 백엔드에서 반환하는 응답 구조입니다.
 * 새로운 accessToken을 반환합니다.
 *
 * 예시:
 * {
 *   accessToken: "new-access-token-value"
 * }
 */
export interface RefreshTokenResponse {
  accessToken: string;
}
