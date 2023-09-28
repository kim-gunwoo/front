# vite project boilerplate - react-ts

## lint

> .vscode 폴더 하위 모두 참고 및 추가

### prettier

-D 
prettier 
eslint-config-prettier 
eslint-plugin-prettier 

> .eslintignore .eslintrc.cjs .prettierrc .prettierignore 파일 내용 참고 추가

### stylelint

-D
stylelint stylelint-config-standard stylelint-config-prettier

> .stylelintrc.json 파일 추가 및 참고

## css in js 

@emotion/react @emotion/styled
 
> css props 사용을 위해서 vite.config.ts, tsconfig.json 참고하여 수정

```ts
// vite.config.ts 
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
});

```

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "jsxImportSource": "@emotion/react"
  }
}
```

## storybook

📌 프로젝트 세팅 당시 스토리북 이슈가 존재(v7.0.15으로 보임)하여 버전 정보가 이상함
나중에 진행할 경우 버전 정보 확인해보고 진행해야함

npx sb init --builder @storybook/builder-vite

> .storybook/main.ts 참고 

```ts
const config: StorybookConfig = {
  ...,
  typescript: {
    reactDocgen: 'react-docgen', // 👈 react-docgen configured here.
  },
};

```