# Albamate - 라우트 그룹 기반 접근 권한 시스템

### 📁 라우트 그룹 구조

```
src/app/
├── (auth)/          # 인증 페이지 (로그인/회원가입)
├── (private)/       # 비공개 페이지 (로그인 필수 + 역할 기반)
└── (public)/        # 공개 페이지 (모든 사용자 접근 가능)
```

### 🔐 접근 권한 시스템

#### 1. (auth) - 인증 페이지

- **접근 권한**: 모든 사용자 (로그인/비로그인)
- **로그인 시**: 홈페이지로 리다이렉트
- **페이지**: `/signin`, `/signup`, `/account-info`

#### 2. (private) - 비공개 페이지

- **접근 권한**: 로그인 필수 + 역할 기반 접근 제어
- **비로그인 시**: 로그인 페이지로 리다이렉트

**사장님 전용 페이지:**

- `/addform` - 알바폼 등록
- `/myalbalist` - 내 알바 목록
- `/application` - 지원자 관리
- `/mypage` - 마이페이지

**지원자 전용 페이지:**

- `/myapply` - 내 지원 목록
- `/mypage` - 마이페이지

#### 3. (public) - 공개 페이지

- **접근 권한**: 모든 사용자 (로그인/비로그인)
- **페이지**: `/`, `/albalist`, `/alba/[formId]`, `/apply/[formId]`, `/albatalk`, `/addtalk`

### 🛠️ 주요 파일

#### 미들웨어 및 권한 관리

- `src/middleware.ts` - 메인 미들웨어 로직
- `src/features/auth/utils/routePermissions.ts` - 라우트 권한 유틸리티
- `src/features/auth/utils/userType.ts` - 사용자 타입 관리 (하위 호환성)
- `src/features/auth/ROUTE_PERMISSIONS.md` - 상세 권한 문서

#### 테스트 및 개발 도구

- `src/features/auth/utils/routePermissions.test.ts` - 권한 시스템 테스트

### 🔧 사용법

#### 미들웨어 설정

```typescript
// src/middleware.ts
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};
```

#### 권한 확인

```typescript
import {
  getRouteGroup,
  hasAccessPermission,
} from '@/features/auth/utils/routePermissions';

const routeGroup = getRouteGroup(pathname);
const hasAccess = hasAccessPermission(userRole, pathname, routeGroup);
```

#### 사용자 타입 변환

```typescript
import { mapBackendRoleToUserType } from '@/features/auth/utils/routePermissions';

const userType = mapBackendRoleToUserType('OWNER'); // 'owner'
```

### 🧪 테스트

개발 환경에서 브라우저 콘솔에서 테스트할 수 있습니다:

```javascript
// 전체 테스트 실행
window.testRoutePermissions.runAllTests();

// 특정 경로 접근 권한 확인
window.testRoutePermissions.checkAccessForPath('/addform', 'OWNER');
```

## 사용자 타입 결정 우선순위

1. **쿼리 파라미터** (`?type=owner` 또는 `?type=applicant`)
2. **세션 정보** (로그인된 사용자의 역할)
3. **경로 정보** (라우트 그룹 기반 추론)

### 역할별 접근 권한 매트릭스

| 페이지           | 비로그인        | 지원자      | 사장님      |
| ---------------- | --------------- | ----------- | ----------- |
| `/signin`        | ✅              | ❌ (홈으로) | ❌ (홈으로) |
| `/signup`        | ✅              | ❌ (홈으로) | ❌ (홈으로) |
| `/addform`       | ❌ (로그인으로) | ❌ (홈으로) | ✅          |
| `/myalbalist`    | ❌ (로그인으로) | ❌ (홈으로) | ✅          |
| `/application`   | ❌ (로그인으로) | ❌ (홈으로) | ✅          |
| `/myapply`       | ❌ (로그인으로) | ✅          | ❌ (홈으로) |
| `/mypage`        | ❌ (로그인으로) | ✅          | ✅          |
| `/albalist`      | ✅              | ✅          | ✅          |
| `/alba/[formId]` | ✅              | ✅          | ✅          |

### 🚨 주의사항

- API 라우트 (`/api/*`)는 미들웨어 처리에서 제외됩니다
- 정적 파일 (`/_next/static/*`, `/_next/image/*`)도 제외됩니다
- 새로운 private 페이지 추가 시 `ROLE_ACCESS` 설정을 업데이트해야 합니다

### 📝 추가 정보

더 자세한 정보는 다음 문서를 참조하세요:

- [라우트 권한 시스템 상세 문서](./src/features/auth/ROUTE_PERMISSIONS.md)
