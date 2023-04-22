# nxapp base project exp

## 기본 린트 및 프리티어

### eslint prettier

```
.editorconfig 파일 추가
vscode 일 경우 플러그인 설치 EditorConfig

yarn add eslint prettier eslint-config-prettier eslint-plugin-prettier -D

.prettierignore 및 .prettierrc.json 파일 추가

vscode 일 경우 플러그인 설치 Stylelint

```

### stylelint emotion (css in js)

```
yarn add -D stylelint stylelint-config-standard stylelint-config-prettier postcss postcss-syntax @stylelint/postcss-css-in-js

.stylelintrc.json 파일 추가


yarn add @emotion/react @emotion/styled

.babelrc 및 emotion.d.ts, styled.d.ts 파일 추가
```

### setting

```
tsconfig.json 수정

# react-query 추가
yarn add @tanstack/react-query

```
