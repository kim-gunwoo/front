# monorepo demo

## lerna-demo

> Mono-repo : lern + yarn workspace 사용 예제

## lerna 시작하기

```
// lerna 시작하기
// 글로벌 설치 후 생성 또는 npx로 생성
$ npm install -g lerna
or
$ npx lerna init

// 신규 패키지 생성
$ lerna create ${project-name}

// 공통 종속성 설치(root에 존재하는 packageg.json 에만 설치할 경우 사용)
$ yarn add eslint --dev --ignore-workspace-root-check
or
$ npm install eslint --dev

// 각 패키지에 모듈 설치
$ lerna add {설치할 패키지/dependencies 명 / $dependencies } --scope={패키지/프로젝트 명 / $project-name }
***
  root 프로젝트(monorepo) - packages/{각각의 모노레포 하위 프로젝트 $project-name}
    $dependencies : 설치하려는 라이브러리 명칭
    $project-name : 실제 만들려는 프로젝트 명칭
***

// 모든 패키지 스크립트 실행
$ lerna run {실행시킬 스크립트 명}


// 로컬 패키지에서 다른 로컬 패키지로 임포트
$ npx lerna add {local workspace name} --scope={local workspace name}
***
  export 하는 패키지에서는 npx tsc 를 통해 파일을 js로 변환하여 내보내야함 
  아래의 방법을 통해 js 파일을 만들어도 되나 파일의 형태를 신경써야함 (CRA, Nextjs 를 통해 만드는 방법은 아직 모름)
  만약 쓴다고 하면 ***"next 외부 컴포넌트 사용시" 를 참조해서 진행(Nextjs일 경우)
  
  packages/export-exam 폴더 참조
***
$ yarn workspace {local workspace name} build

```

#### reference
> Lerna를 활용한 Mono-Repo 구축 완벽 가이드 - 개념 정리 : https://kdydesign.github.io/2020/08/25/mono-repo-lerna/
> Lerna를 활용한 Mono-Repo 구축 완벽 가이드 - 예제를 통한 완벽 파악 : https://kdydesign.github.io/2020/08/27/mono-repo-lerna-example/
> 예제 코드 : https://github.com/kdydesign/lerna-example
> 모던 프론트엔드 프로젝트 구성 기법 - 모노레포 도구 편 : https://d2.naver.com/helloworld/7553804


### next 외부 컴포넌트 사용시

```js
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 프로젝트 외부 참고 가능
  experimental: {
    externalDir: true, 
  },
}

// module.exports = nextConfig

// yarn add next-transpile-modules
/*
  외부에서 import 하여 사용시 node_modules를 못가져오는 경우가 존재함  
  이때 위 라이브러리 설치후 아래 적용시 문제없이 사용가능
*/

const withTM = require('next-transpile-modules')([`${project-name}`]);

// ex
const withTM = require('next-transpile-modules')(['demo-next-container']);

// 기존 설정된 nextConfig를 인자로 넘겨주면 된다.
module.exports = withTM(nextConfig);

```



### zero install

#### yarn berry

```
// yarn version 2 이상을 yarn berry 라고 함
$ yarn -v

// yarn -v 이 2 이상일때 아래의 명령어 실행시 .yarnrc.yml, .yarn 이 생성
$ yarn set version berry
***
  .yarn 파일을 만들어내며 파일 생성 이후 lerna bootstrap 이 되지 않음
    .yarnrc 에서는 pnpMode, yarnPath, cacheFolder등을 설정 할 수 있음
    .yarn 에서는 cache folder에 의존성 정보를 저장하며, releases
***

```
#### .gitignore 설정

```
### yarn ###
# used Zero-Install
.yarn/*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions

# unused Zero-Install
.yarn/*
!.yarn/patches
!.yarn/releases
!.yarn/plugins
!.yarn/sdks
!.yarn/versions
.pnp.*
```


### Lerna에서 open source 및 changelog

```
## commitlint , husky
$ yarn add @commitlint/cli @commitlint/config-conventional husky -D --ignore-workspace-root-check

## husky 설치
$ yarn husky install
or
$ npx husky install
***
  ommit-msg 파일 추가 및 하단 내용 추가
    npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'

    # npm을 사용하는 경우
    npx husky add .husky/commit-msg 'npx commitlint --edit $1'
    
    # yarn을 사용하는 경우
    npx husky add .husky/commit-msg 'yarn commitlint --edit $1'
***

## eslint prettier
$ yarn add -D eslint eslint-plugin-prettier eslint-config-prettier prettier --ignore-workspace-root-check
$ yarn add -D prettier  --ignore-workspace-root-check


### add eslint
$ yarn add -D typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin @typescript-eslint/typescript-estree eslint-plugin-prettier eslint-config-prettier eslint-plugin-import  --ignore-workspace-root-check


```
#### setting

```js
// husky.config.js
module.exports = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
  }
}
```

```js
// commitlint.config.js
module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ]
}
```

#### reference
> 오픈 소스(Open-Source) 구조와 모듈 파악하기 : https://kdydesign.github.io/2020/10/19/open-source-flow/
> Lerna에서 lerna version을 사용하여 CHANGELOG를 생성해보자. : https://kdydesign.github.io/2020/11/27/lerna-changelog/
