# webpack 설정

```
    Micro FrontEnd webpack 설정
        webpack v5 에서 제공되는 ModuleFederationPlugin 사용
```


## init

### webpack

```
$ yarn init -y

# webpack 
$ yarn add webpack webpack-cli -D

# html-loader
$ yarn add -D html-loader

# html-webpack-plugin
$ yarn add -D html-webpack-plugin

# webpack-dev-server
$ yarn add -D webpack-dev-server

# css
$ yarn add -D style-loader css-loader

# file-loader
$ yarn add -D file-loader url-loader

# babel
$ yarn add --dev @babel/core babel-loader @babel/preset-react @babel/preset-env @babel/preset-typescript
yarn add -D @babel/plugin-transform-runtime
yarn add -D @babel/plugin-proposal-class-properties

# react-refresh
$ yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh
****

    React Fast Refresh 역할이 뭔가

        @pmmmwh/react-refresh-webpack-plugin react-refresh

    앱 전체를 다시 다운로드 하지 않고, React 구성 요소만 다시 렌더링 한다.
    구문 오류 또는 런타임 오류가 발생했을 경우에, 자동으로 앱을 다시 실행시킨다.
    구문 오류가 있는 모듈은 실행시키지 않는다. Fast Refresh가 동작하는 도중에 구문 오류가 발생할 경우, 오류가 발생한 파일을 수정하면 앱을 자동으로 다시 로드한다.
    Hooks를 지원한다.
    
****

# ts-loader
$ yarn add -D typescript ts-loader fork-ts-checker-webpack-plugin
// tsconfig setting
$ npx tsx --init
****
    ts-loader & fork-ts-checker-webpack-plugin 역할이 뭔가?

    ts-loader 
        tsconfig.json 파일 사용
        options 역할은 따로 확인 필요 options:{ transpileOnly: true, experimentalWatchApi: true, }
    fork-ts-checker-webpack-plugin 
        ts-loader 성능 향상을 위해 사용

****

# dotenv
$ yarn add -D dotenv-webpack
****
    dotenv-webpack 역할이 뭔가?
        app 상에서 env 파일을 사용하기 위함 // 기본은 root 아래로 되어있음
****

# mini-css-extract-plugin
$ yarn add -D mini-css-extract-plugin
****
    mini-css-extract-plugin 역할이 뭔가?

****

# sass-loader
$ yarn add -D sass-loader

# webpack-merge
$ yarn add -D webpack-merge


```


### eslint & prettier

```
# use default
yarn add -D eslint eslint-plugin-prettier eslint-config-prettier prettier
```

```
# eslint
$ yarn add -D eslint 
eslint-plugin-prettier eslint-config-prettier 
typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin @typescript-eslint/typescript-estree
eslint-plugin-prettier eslint-config-prettier eslint-plugin-import 


# prettier
$ yarn add -D prettier



# stylelint
$ yarn add -D stylelint stylelint-config-prettier stylelint-config-recommended stylelint-prettier stylelint-scss postcss-scss

```

### react 

```
# react
$ yarn add react react-dom react-router-dom

# typescript
$ yarn add -D typescript @types/react @types/react-dom

# sass
$ yarn add -D node-sass
or
$ yarn add -D sass

# react-scripts
$ yarn add react-scripts
```