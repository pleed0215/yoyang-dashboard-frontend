# GraphQL Code Generator 사용 가이드

이 프로젝트는 [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)를 사용하여 GraphQL 백엔드 서버에서 스키마를 가져와 TypeScript 타입과 React hooks를 자동으로 생성합니다.

## 빠른 시작

### 1. 의존성 설치

프로젝트 의존성이 이미 설치되어 있다면 이 단계를 건너뛸 수 있습니다:

```bash
yarn install
# 또는
npm install
```

### 2. 환경 변수 설정

`.env` 또는 `.env.local` 파일에 백엔드 GraphQL 엔드포인트 URL을 설정합니다:

```
BACKEND_URL=http://your-backend-url
NEXT_PUBLIC_BACKEND_URL=http://your-backend-url
```

### 3. 코드 생성 실행

다음 명령을 실행하여 GraphQL 스키마를 가져오고 TypeScript 타입과 hooks를 생성합니다:

```bash
yarn codegen
# 또는
npm run codegen
```

개발 중에 파일 변경을 감지하여 자동으로 코드를 생성하려면:

```bash
yarn codegen:watch
# 또는
npm run codegen:watch
```

## 생성된 코드 사용하기

코드 생성이 완료되면 `lib/graphql/generated/` 디렉토리에 TypeScript 타입과 Apollo hooks가 생성됩니다.

### 예제: 쿼리 사용하기

```tsx
import { useGetUserQuery } from '@/lib/graphql/generated/graphql';

function UserProfile() {
  const { data, loading, error } = useGetUserQuery();
  
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error.message}</p>;
  
  return (
    <div>
      <h1>{data?.me?.name}의 프로필</h1>
      <p>이메일: {data?.me?.email}</p>
    </div>
  );
}
```

### 예제: 뮤테이션 사용하기

```tsx
import { useLoginMutation } from '@/lib/graphql/generated/graphql';

function LoginForm() {
  const [login, { loading, error }] = useLoginMutation();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    try {
      const { data } = await login({ 
        variables: { email, password } 
      });
      console.log('로그인 성공:', data);
    } catch (err) {
      console.error('로그인 실패:', err);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드 */}
    </form>
  );
}
```

## 설정 파일

GraphQL Code Generator 설정은 프로젝트 루트의 `codegen.ts` 파일에 있습니다. 필요에 따라 이 파일을 수정하여 코드 생성 방식을 변경할 수 있습니다.

## 자세한 문서

더 자세한 정보는 다음 문서를 참조하세요:

- [GraphQL 코드 생성 가이드](./docs/graphql-code-generation.md): 전체 설정 및 사용 방법
- [GraphQL 사용 가이드](./docs/graphql-usage.md): 프로젝트에서 GraphQL 사용하기

## 문제 해결

### 인증 오류

백엔드 서버에 인증이 필요한 경우, `codegen.ts` 파일에 인증 헤더를 추가해야 합니다. 자세한 내용은 [GraphQL 코드 생성 가이드](./docs/graphql-code-generation.md)의 "인증이 필요한 경우" 섹션을 참조하세요.

### 스키마를 가져올 수 없음

백엔드 서버에 연결할 수 없는 경우:

1. 백엔드 서버가 실행 중인지 확인하세요.
2. 환경 변수 `BACKEND_URL`이 올바르게 설정되었는지 확인하세요.
3. 네트워크 연결 및 방화벽 설정을 확인하세요.