vite react setting

### setting 

#### package install

```sh
# package add

# style
pnpm add styled-component 
pnpm add @types/styled-components -D

# tsconfig path
pnpm add vite-tsconfig-paths -D

# svg
pnpm add vite-plugin-svgr -D 

# prettier
pnpm add prettier -D
pnpm add eslint-config-prettier -D
pnpm add eslint-plugin-prettier -D

# stylelint
pnpm add stylelint -D
pnpm add stylelint-config-standard -D

## stylelint css in js
pnpm add postcss-styled-syntax -D

# not use stylelint 
# pnpm add postcss -D 
# pnpm add postcss-syntax -D
# pnpm add stylelint-config-prettier -D
# pnpm add stylelint-config-styled-components stylelint-processor-styled-components -D
# pnpm add @stylelint/postcss-css-in-js -D
# pnpm add stylelint stylelint-config-recommended -D

# testing
pnpm add jest -D
pnpm add @testing-library/react -D

pnpm add ts-jest @types/jest -D

pnpm add ts-node -D
pnpm add jest-environment-jsdom -D
pnpm add @testing-library/jest-dom -D

# css, scss | svg 등 mock 으로 처리
pnpm add identity-obj-proxy -D 
pnpm add jest-transformer-svg -D 

```

#### init

styled-component : styles 폴더 참고
svg: vite-env.d.ts, vite.config.ts 파일 참고
env: .env 참고 prefix VITE 붙어야함
tsconfig alias path : vite.config.ts, tsconfig.json 파일 참고
prettier : eslintrc.cjs 설정 참고 .prettierrc, .prettierignore 상황에 맞게 사용 .vscode/settings.json 참고
stylelint : .vscode/settings.json 참고, .stylelintrc 파일 참고, package.json script 참고
test : __test__ 참고, jest.*.ts 참고
