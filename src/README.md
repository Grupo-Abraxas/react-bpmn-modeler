# react-bpmn-modeler

React bpmn modeler (Beta)

## Technologic Stack

- [React](https://es.reactjs.org/)
- [Docker](https://docs.docker.com/)
- [bpmn-js](https://github.com/bpmn-io/bpmn-js/)
- [yarn](https://yarnpkg.com/)

## Deploy with Docker

```bash
yarn run docker:build
yarn run docker:run
```

Stop app

```bash
yarn run docker:stop
```

## Run in dev mode

- Install Docker

- Run

```bash
yarn install
```

```bash
yarn start
```

## Publish package on npm

Change package version in **package.json**, replace **"x.x.x"** for current number of version.

```json
{
  ...
  "version": "x.x.x",
  ...
}
```

Change **"noEmit"** to **false** in **tsconfig.json**

```json
{
  ...
  "noEmit": false,
  ...
}
```

Build a dist

```bash
yarn build
```

To publish

```bash
npm login
```

Publish

```bash
npm publish --access public
```
