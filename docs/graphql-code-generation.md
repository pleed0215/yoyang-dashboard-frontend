# GraphQL 코드 생성 가이드

이 문서는 GraphQL 백엔드 서버에서 스키마를 가져와 TypeScript 타입을 자동으로 생성하는 방법을 설명합니다.

## 목차

1. [필요한 패키지 설치](#필요한-패키지-설치)
2. [GraphQL Code Generator 설정](#graphql-code-generator-설정)
3. [스키마 가져오기 및 코드 생성](#스키마-가져오기-및-코드-생성)
4. [생성된 타입 사용하기](#생성된-타입-사용하기)
5. [자동화 및 CI/CD 통합](#자동화-및-cicd-통합)

## 필요한 패키지 설치

GraphQL Code Generator와 관련 플러그인을 설치합니다:

```bash
# yarn을 사용하는 경우
yarn add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/introspection

# npm을 사용하는 경우
npm install --save-dev @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/introspection
```

각 패키지의 역할:
- `@graphql-codegen/cli`: GraphQL Code Generator의 명령줄 인터페이스
- `@graphql-codegen/typescript`: TypeScript 타입 정의 생성
- `@graphql-codegen/typescript-operations`: 쿼리, 뮤테이션, 구독에 대한 TypeScript 타입 생성
- `@graphql-codegen/typescript-react-apollo`: Apollo Client용 React hooks 생성
- `@graphql-codegen/introspection`: GraphQL 스키마의 인트로스펙션 결과 생성

## GraphQL Code Generator 설정

프로젝트 루트에 `codegen.ts` 파일을 생성합니다:

```typescript
import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.BACKEND_URL + '/graphql', // 백엔드 GraphQL 엔드포인트
  documents: ['lib/graphql/**/*.ts'], // GraphQL 쿼리가 정의된 파일 경로
  generates: {
    './lib/graphql/generated/': {
      preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true, // React hooks 생성
        withComponent: false, // React 컴포넌트 생성 안 함
        withHOC: false, // HOC 생성 안 함
      },
    },
    './lib/graphql/schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
```

## package.json에 스크립트 추가

`package.json` 파일의 `scripts` 섹션에 다음 스크립트를 추가합니다:

```json
"scripts": {
  "dev": "next dev --turbopack --port 8000",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "codegen": "graphql-codegen",
  "codegen:watch": "graphql-codegen --watch"
}
```

## 스키마 가져오기 및 코드 생성

GraphQL 스키마를 가져오고 코드를 생성하려면 다음 명령을 실행합니다:

```bash
# 환경 변수 설정 (필요한 경우)
export BACKEND_URL=http://your-backend-url

# 코드 생성 실행
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

## 인증이 필요한 경우

백엔드 서버에 인증이 필요한 경우, `codegen.ts` 파일에 다음과 같이 헤더를 추가할 수 있습니다:

```typescript
import { CodegenConfig } from '@graphql-codegen/cli';
import { config as dotenvConfig } from 'dotenv';

// .env 파일에서 환경 변수 로드
dotenvConfig();

const config: CodegenConfig = {
  schema: {
    [process.env.BACKEND_URL + '/graphql']: {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        // 필요한 다른 헤더들...
      },
    },
  },
  documents: ['lib/graphql/**/*.ts'],
  generates: {
    // ... 이전과 동일
  },
};

export default config;
```

## 생성된 타입 사용하기

코드 생성이 완료되면 `lib/graphql/generated/` 디렉토리에 TypeScript 타입과 Apollo hooks가 생성됩니다. 다음과 같이 사용할 수 있습니다:

```typescript
// lib/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    me {
      id
      email
      name
    }
  }
`;

// 컴포넌트에서 사용
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

## 자동화 및 CI/CD 통합

CI/CD 파이프라인에 코드 생성 단계를 추가하여 배포 전에 항상 최신 스키마를 기반으로 코드를 생성할 수 있습니다:

```yaml
# .github/workflows/build.yml 예시
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: yarn install
      - name: Generate GraphQL code
        run: yarn codegen
        env:
          BACKEND_URL: ${{ secrets.BACKEND_URL }}
          API_TOKEN: ${{ secrets.API_TOKEN }}
      - name: Build
        run: yarn build
```

## 결론

GraphQL Code Generator를 사용하면 백엔드 GraphQL 스키마를 기반으로 TypeScript 타입과 Apollo Client hooks를 자동으로 생성할 수 있습니다. 이를 통해 다음과 같은 이점을 얻을 수 있습니다:

1. 타입 안전성: 컴파일 타임에 GraphQL 쿼리와 뮤테이션의 타입 오류를 잡을 수 있습니다.
2. 자동 완성: IDE에서 GraphQL 쿼리 결과의 필드에 대한 자동 완성을 제공합니다.
3. 리팩토링 안전성: 백엔드 스키마가 변경되면 타입 오류를 통해 프론트엔드 코드를 업데이트해야 함을 알 수 있습니다.
4. 개발 효율성: 수동으로 타입을 작성하는 대신 자동으로 생성된 타입을 사용하여 개발 시간을 절약할 수 있습니다.