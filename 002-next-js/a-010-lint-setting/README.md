# Nextjs setting

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
  "extends": ["stylelint-config-standard-scss", "stylelint-config-prettier-scss"]
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