# TremTec Code Generator

![Github Actions](https://github.com/marco-souza/react-base-project/workflows/Npm Publish/badge.svg)

Yeoman generator to create:

- components
- ducks
- tests

## Usage

First install `Yeoman` and `generator-tremtec`

```sh
npm install -g yo generator-tremtec
```

then you can just run

```sh
yo tremtec
```

os directly specify a command with

```sh
yo tremtec:test
yo tremtec:component
yo tremtec:redux
```

**WARNING**: this generator has **hard-coded paths**, so it only works fine in projects that are using this [`react-base-project`](https://github.com/marco-souza/react-base-project).
