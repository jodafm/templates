# Example AppSync API

This will create an AppSync API with a single Lambda connection, lambda layer for dependencies, IAM role, and AppSync API.

## Setup

Create .env file

```console
AWS_ACCESS_KEY_ID=XXXX
AWS_SECRET_ACCESS_KEY=XXXX
```

```console
$ npm run setup
```

## Deploy

### ALL

```console
$ npm run deploy all
```

### IAM

```console
$ npm run deploy iam
```

### Layer

```console
$ npm run deploy layer
```

### Lambda

```console
$ npm run deploy lambda
```

### AppSync

```console
$ npm run deploy appsync
```