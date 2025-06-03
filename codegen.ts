import {CodegenConfig} from '@graphql-codegen/cli';

// Use the same backend URL as in the Apollo client
const BACKEND_URL = process.env.VITE_BACKEND_URL || 'http://localhost:3000';

const config: CodegenConfig = {
    schema: `${BACKEND_URL}/graphql`,
    documents: ['app/**/*.tsx', 'app/**/*.ts'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './schema.json': {
            plugins: ['introspection']
        },
        './app/graphql/types.ts': {
            plugins: ['typescript',
                'typescript-operations',
            ]
        },
        './app/graphql/operations.ts': {
            preset: 'import-types-preset',
            presetConfig: {typesPath: './types',},
            plugins: [
                'typescript-react-apollo',
            ],
            config: {
                withHooks: true,
                withComponent: false,
                withHOC: false,
                gqlImport: "@apollo/client#gql",
            }
        }
    },
};

export default config;
