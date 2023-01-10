# lint setting

```
eslint, prettier, stylelint 등을 설정하는 방법
```

## style lint 설정

```sh
## 공통
npm install --save-dev stylelint
yarn add -D stylelint
```

### css

```sh
# css style lint
npm install --save-dev stylelint stylelint-config-standard stylelint-config-prettier
yarn add -D stylelint stylelint-config-standard stylelint-config-prettier
```

// .stylelintrc.json

```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-prettier"]
}
```

### scss

```sh
# scss style lint
npm install --save-dev stylelint stylelint-config-standard-scss stylelint-config-prettier-scss
yarn add -D stylelint stylelint-config-standard-scss stylelint-config-prettier-scss
```

// .stylelintrc.json

```json
{
  "extends": [
    "stylelint-config-standard-scss",
    "stylelint-config-prettier-scss"
  ]
}
```

### css in js

```sh
# css in js style lint
npm install --save-dev stylelint stylelint-config-standard stylelint-config-prettier postcss postcss-syntax @stylelint/postcss-css-in-js
yarn add -D stylelint stylelint-config-standard stylelint-config-prettier postcss postcss-syntax @stylelint/postcss-css-in-js
```

// .stylelintrc.json

```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-prettier"],
  "overrides": [
    {
      "files": ["**/*.tsx"],
      "customSyntax": "@stylelint/postcss-css-in-js"
    }
  ],
  "rules": {
    "function-no-unknown": [true, { "ignoreFunctions": ["/\\${/"] }]
  }
}
```

## eslint & prettier 설정

```sh
npm install eslint prettier  --save-dev
yarn add eslint prettier eslint-config-prettier eslint-plugin-prettier -D
```

### eslint-config-prettier

> eslint-config-prettier 는 prettier 의 설정 중 eslint 의 설정과 충돌이 나는 설정들을 비활성화 해주는 라이브러리이다.

// .eslintrc.json

```json
{
  "extends": ["prettier"]
  // prettier plugin을 eslint 설정에 추가
  "plugins": ["prettier"],
  // prettier 코드 스타일이 어긋나면 eslint에 걸리도록 처리
  "rules": {
    "prettier/prettier": "error"
  }
}
or
{
 "extends": ["plugin:prettier/recommended"]
}
```

### Lint 설정 추가 참고

```sh
@typescript-eslint/eslint-plugin
```

```sh
yarn add --dev eslint eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser


npm i -D eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks

npm i -D prettier eslint-config-prettier eslint-plugin-prettier

npm i -D babel-eslint eslint-plugin-babel

npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### .vscode

```
1. .vscode 파일 하위에 위에서 작성했던 .stylelintrc.json 파일을 위치
2. vscode의 경우 extension 설치 : vscode-stylelint
=> https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint
3. .vscode 하위에 extensions.json 파일 생성 및 하위 스크립트 추가
{
    "recommendations": ["stylelint.vscode-stylelint"]
}
4. settings.json 파일 .vscode 하위에 추가 및 하위 스크립트 추가
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
        "source.fixAll": true,
    },
    "editor.formatOnSave": true,
    "stylelint.enable": true,
    "css.validate": false,
    "less.validate": false,
    "scss.validate": false,
    "stylelint.validate": ["css", "scss"],
}
```
