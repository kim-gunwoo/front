module.exports = {
    env: {
        // 전역 변수 사용을 정의합니다. 추가하지 않으면 ESLint 규칙에 걸리게 됩니다.
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended', // 리액트 추천 룰셋
        'plugin:@typescript-eslint/recommended', // 타입스크립트 추천 룰셋
        'next/core-web-vitals', // 기본 nextjs
        // eslint의 typescript 포매팅 기능을 제거(eslint-config-prettier)
        // "prettier/@typescript-eslint",
        // eslint의 포매팅 기능을 prettier로 사용함. 항상 마지막에 세팅 되어야 함.
        'plugin:prettier/recommended', // (eslint-plugin-prettier)
    ],
    parser: '@typescript-eslint/parser', // ESLint 파서를 지정합니다.
    parserOptions: {
        ecmaFeatures: {
            jsx: true, // JSX를 파싱할 수 있습니다.
        },
        ecmaVersion: 12, // Modern ECMAScript를 파싱할 수 있습니다.
        sourceType: 'module', // import, export를 사용할 수 있습니다.
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        // ESLint 규칙을 지정합니다. extends에서 지정된 규칙을 덮어 쓸수도 있습니다.
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
    },
    settings: {
        react: {
            version: 'detect', // 현재 사용하고 있는 react 버전을 eslint-plugin-react가 자동으로 감지합니다.
        },
    },
};
