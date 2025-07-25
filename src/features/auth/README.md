# Auth Feature - 쿼리 파라미터 기반 사용자 타입 분기 처리

## 개요

이 문서는 auth 관련 컴포넌트들에서 쿼리 파라미터(`?type=owner` 또는 `?type=applicant`)를 통해 사용자 타입을 구분하는 방법을 설명합니다.

## 구현 방식

### 1. AuthProvider 중심 구현 (권장)

모든 auth 관련 컴포넌트들이 `AuthContext`를 통해 사용자 타입 정보를 공유받는 방식입니다.

#### 장점

- 중앙 집중식 관리
- 컴포넌트별 중복 코드 제거
- 일관된 사용자 타입 처리
- 유지보수 용이

#### 사용법

```typescript
// AuthProvider가 자동으로 쿼리 파라미터를 감지하여 userType을 제공
const authContext = useContext(AuthContext);
const { userType, authContent } = authContext;

// 사용자 타입에 따른 조건부 렌더링
if (userType === 'owner') {
  return <OwnerForm />;
} else {
  return <ApplicantForm />;
}
```

### 2. 네비게이션 훅 사용 (새로 추가)

`useAuthNavigation` 훅을 사용하여 사용자 타입 전환과 페이지 이동을 쉽게 처리할 수 있습니다.

#### 사용법

```typescript
import { useAuthNavigation } from '@/features/auth/hooks/useAuthNavigation';

function MyComponent() {
  const {
    currentUserType,
    switchToUserType,
    navigateToAuthPage,
    navigateWithCurrentType,
  } = useAuthNavigation();

  // 사장님으로 전환
  const handleSwitchToOwner = () => {
    switchToUserType('owner');
  };

  // 지원자 회원가입으로 이동
  const handleGoToApplicantSignup = () => {
    navigateToAuthPage('signup', 'applicant');
  };

  // 현재 타입 유지하면서 로그인 페이지로 이동
  const handleGoToSignin = () => {
    navigateWithCurrentType('signin');
  };
}
```

### 3. 라우트 유틸리티 사용

`createAuthRoute` 유틸리티를 사용하여 사용자 타입별 URL을 쉽게 생성할 수 있습니다.

#### 사용법

```typescript
import { createAuthRoute } from '@/features/auth/constants/route';

// 사장님 로그인 URL 생성
const ownerSigninUrl = createAuthRoute.signin('owner');
// 결과: '/signin?type=owner'

// 지원자 회원가입 URL 생성
const applicantSignupUrl = createAuthRoute.signup('applicant');
// 결과: '/signup?type=applicant'

// 현재 페이지에서 다른 사용자 타입으로 전환
const switchUrl = createAuthRoute.switchUserType('/signin', 'owner');
// 결과: '/signin?type=owner'
```

## URL 예시

```
# 사장님 로그인
/signin?type=owner

# 지원자 회원가입
/signup?type=applicant

# 사장님 계정 정보
/account-info?type=owner
```

## 우선순위

사용자 타입 결정 우선순위는 다음과 같습니다:

1. **쿼리 파라미터** (`?type=owner` 또는 `?type=applicant`)
2. **세션 정보** (로그인된 사용자의 역할)
3. **경로 정보** (`/owner/*` 또는 `/applicant/*`)

## 자동 리다이렉션

### 미들웨어에서의 스마트 기본값 설정

- `type` 파라미터가 없는 경우 자동으로 기본값 설정
- Referer 헤더를 확인하여 이전 페이지에서 온 사용자 타입 추론
- 이전 페이지가 owner 관련이면 `owner`, 그렇지 않으면 `applicant`로 설정

### 동적 링크 생성

- `AuthTitleArea`에서 현재 사용자 타입을 유지하면서 다른 페이지로 이동하는 링크 자동 생성
- 로그인 페이지에서 "회원가입 하기" 클릭 시 현재 타입의 회원가입 페이지로 이동
- 회원가입 페이지에서 "로그인 하기" 클릭 시 현재 타입의 로그인 페이지로 이동

## 컴포넌트별 적용 예시

### AuthForm 컴포넌트

```typescript
const AuthForm = () => {
  const authContext = useContext(AuthContext);
  const { userType, authPageType } = authContext;

  // 사용자 타입에 따른 폼 구성
  const formConfig = getFormConfig(authPageType, userType);

  // 폼 제출 시 사용자 타입별 처리
  const onSubmit = async data => {
    if (userType === 'owner') {
      // 사장님 회원가입/로그인 처리
    } else {
      // 지원자 회원가입/로그인 처리
    }
  };
};
```

### RightMenu 컴포넌트

```typescript
const RightMenu = () => {
  const { currentUserType, switchToUserType } = useAuthNavigation();

  return (
    <nav>
      <button onClick={() => switchToUserType('owner')}>
        사장님 전용
      </button>
      <button onClick={() => switchToUserType('applicant')}>
        지원자 전용
      </button>
    </nav>
  );
};
```

## 새로운 기능들

### 1. useAuthNavigation 훅

- 사용자 타입 전환
- 인증 페이지 간 이동
- 현재 타입 유지하면서 페이지 이동

### 2. createAuthRoute 유틸리티

- 사용자 타입별 URL 생성
- 페이지 간 전환 URL 생성

### 3. 스마트 미들웨어

- Referer 기반 사용자 타입 추론
- 자동 기본값 설정

### 4. 동적 링크 생성

- AuthTitleArea에서 현재 타입 유지하면서 링크 생성
- 사용자 경험 개선
