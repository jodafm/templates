# Deploying Static Web App to AWS

#### By: Serverless Guru
#### Author: Ryan Jones
#### Date: 11/23/2018

## Why?

Setting up a basic website can be time consuming. This template aims to cut that time down dramatically.

## What?

Serverless makes it easy by leveraging a plugin called, [Serverless Finch](). Serverless Finch allows you to point the `distrubutionFolder` property to where you production files live (e.g. `dist/` or `src/`).

## How?

After you clone the repo and install the dependencies you can simply run `npm run deploy <stage> <region>` and you will have a website up.

### Commands:

* Install--`npm install`

* Deploy--`npm run deploy <stage> <region>` (Ex: `npm run deploy dev us-west-1` or `npm run deploy prod us-west-2`)

* Remove--`npm run remove <stage> <region>` (Ex: `npm run remove dev us-west-1` or `npm run remove prod us-west-2`)

## Examples

Once you have a basic website deploying using this template then you can expand any direction you choose. For instance, why not build an Angular app.

### Angular Example:

Building/Deploying an Angular app is easy with the [`Angular CLI`](https://cli.angular.io/) and this template.

```bash
# Create Angular app with boilerplate
ng new blog

# Build Angular app
ng build

# Update serverless.yml to point to built Angular app
...
  client:
    ...
    distributionFolder: dist/blog

# Deploy to dev environment
npm run deploy dev us-west-2
```

### React Example:

Building/Deploying a React app is easy with the [`create-react-app`](https://github.com/facebook/create-react-app) CLI and this template.

```bash
# Create React app with boilerplate
npx create-react-app blog

# Build React app
npm run build

# Update serverless.yml to point to built React app
...
  client:
    ...
    distributionFolder: build/

# Deploy to dev environment
npm run deploy dev us-west-2
```

### Basic Website Example:

Building/Deploying a basic website is easy with this template. All you need to do is add your own `html`, `css`, and `js`. Into the `/public` directory and everything will be handled for you.

```bash
# Deploy to dev environment
npm run deploy dev us-west-2
```

## Call to action

If you like this template and want to see more content like this. Please give us a follow or shoutout on [Twitter](https://twitter.com/serverlessgurux), [Medium](https://medium.com/@serverlessguru), [Facebook](https://facebook.com/serverlessguru), [Instagram](https://instagram.com/serverlessguru), or check out our courses at [training.serverlessguru.com](https://training.serverlessguru.com).

## Author Information:

### Ryan Jones
Founder & Lead Cloud Developer at [Serverless Guru](https://www.serverlessguru.com)
[ryan@serverlessguru.com](mailto:ryan@serverlessguru.com)

### Social Media
[LinkedIn](https://www.linkedin.com/in/ryanjonesirl), [Twitter](https://www.twitter.com/ryanjonesirl), [Website](https://www.ryanjonesirl.com)