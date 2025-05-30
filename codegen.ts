import { CodegenConfig } from '@graphql-codegen/cli';
import { configDotenv } from 'dotenv';

configDotenv();

const config: CodegenConfig = {
  schema: process.env.BACKEND_URL + '/graphql', // 백엔드 GraphQL 엔드포인트
  documents: ['lib/graphql/**/*.ts'], // GraphQL 쿼리가 정의된 파일 경로
  generates: {
    './lib/graphql/generated/graphql.ts': {
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
