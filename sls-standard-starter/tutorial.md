# Tutorial for Setting up and Deploying a Serverless Project

* [Overview](#Overview)

* [Breakdown](#File-Breakdown)

* [Deploy](#deploy)

## Overview

This tutorial explains how to create a project using the Serverless Framework and then deploy its resources to AWS. This particular example sets up a template API Gateway and then adds additional endpoints with subsequent deployments.

A full list of Serverless-specific properties for AWS can be found at the [Serverless.yml Reference](https://serverless.com/framework/docs/providers/aws/guide/serverless.yml/). General Serverless documentation can be found [here](https://serverless.com/framework/docs/). Lastly since Serverless Framework structure utilizes CloudFormation all those commands work as well - for anything not found above you can read the [CloudFormation docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html).

## File Breakdown

This section explains all the elements of our current working directory.

### Top level files/directories

```
$ ls
resources/  services/ lib/ ...
```

* `resources/` - contains all major resources components like databases, userpools, APIs, and so forth. Each has its own folder and deployment config. In this example we have `resources/api/`.
* `services/` - contains all API endpoints that are managed individually. In this example we have a single service, `services/countCharacters`.
* `lib/` contains resources files shared among multiple services and/or resources. None exist for this project but examples would include function libraries and hard-coded resource lists.


### Resource Folder

Our example has the following primary files:

```
$ ls resources/api/
.serverless/ serverless.yml index.js ...
```

* `serverless.yml` - the core build file required for Serverless functionality. Commands will typically run based on what's included.
* `index.js` - a handler file written for our dummy API function. THis is specific to our API service.
* `.serverless/` - a `gitignore` Serverless resource folder that auto-populates on build

Everything else at this level relates to general npm/git functions:
* `package.json`
* `package-lock.json`


#### resources/api/serverless.yml

```
org: serverlessguru
app: serverless-app

service: serverless-app-api

provider:
  name: aws
  runtime: nodejs12.x
  stage: ${opt:stage, "dev"}
  region: ${opt:region, "us-west-2"}
  profile: ${opt:profile, "default"}

plugins:
  - serverless-offline

package:
  exclude:
    - ./**
  include:
    - index.js

custom:
  base: ${self:service}-${self:provider.stage}

functions:
  test:
    name: ${self:custom.base}-test
    handler: index.handler
    description: Returns "Hello World". Dummy function for API deployment
    events:
      - http:
          path: /test
          method: any
          cors:
            origin: '*'
            headers:
              - Content-Type
              - X-Amz-Date
              - Authorization
              - X-Api-Key
              - X-Amz-Security-Token
              - X-Amz-User-Agent
              - version
              - x-uuid
outputs:
  ApiEndpoint:
    Fn::Join:
      - ''
      - - https://
        - Ref: ApiGatewayRestApi
        - .execute-api.${self:provider.region}.amazonaws.com/${self:provider.stage}
  ApiId:
    Ref: ApiGatewayRestApi
  ApiResourceId:
    Fn::GetAtt:
    - ApiGatewayRestApi
    - RootResourceId 
```

#### resources/api/index.js

```
module.exports.handler = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify({'message': "hello world"})
  }
};
```

#### resources/api/.serverless

### Service Folder

Our example has the following primary files:

```
$ ls services/countCharacters/
.serverless/ handlers/ serverless.yml ...
```

* `serverless.yml`
* `handlers/` - a folder for API handlers. In this instance we only have only endpoint, `handlers/index.js` for our lone POST function
* `.serverless/`
* `.gitignore`

#### services/countCharacters/serverless.yml

#### services/countCharacters/handlers/index.js

## Deploy

CONSIDER:
---- 

It's worth noting that these files could all share a monorepo structure with a single root-level `serverless.yml` build file. Project setup and resource sharing tends to be easier this way but we avoid this for a few reasons:
* Deployments are faster since you're only re-publishing edited sections, not the entire project
* Project security is easier to manage since 
* Core production elements like servers and databases are safter since their resources are separated from commonly updated elements like APIs and the frontend.