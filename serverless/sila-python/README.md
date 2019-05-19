# Sila Python SDK - Example Lambda w/ Serverless Framework

#### Author: Serverless Guru
#### Date: 05/17/2019

## Purpose of repository

Show how to run Sila Python SDK inside a lambda function deployed via the Serverless Framework. While also teaching how to write serverless backends with Python.

## Install

* `brew install pipenv` (https://pypi.org/project/pipenv/) - Installs pipenv (python package manager similar to npm)

* `pipenv install` - Installs dependencies from pipenv file called Pipfile (similar to package.json)


## What is Pipenv?

Pipenv is a package manager similar to npm which is typically used with NodeJS. We use pipenv over other methods because a) the python community is moving that direction and b) it solves a lot of problems which you can read more about here, https://pypi.org/project/pipenv/.


## How to deploy to AWS

After, we have something working we want to be able to deploy it to AWS. For our purposes we created a file called `deploy.bash` which allows us to consolidate the deploy commands into a single file. The deploy script will expect a `stage` (e.g. dev, test), `region` (e.g. us-west-2), and `profile` (e.g. default).

You can run this script:

```bash
bash ./scripts/deploy.bash <stage> <region> <aws_profile_name>
```

## Steps

### AWS Setup

#### Create an AWS account

If you don't already have an AWS account setup then you can do that now or wait till the end when we are making the deployment to AWS.

#### Create an AWS IAM user

The AWS IAM user should have programmtic access and have admin permissions. You should scope these permissions down as you move from testing to production.

* Navigate to AWS IAM

* Create user

* Name: `serverless-admin`

* Grant Admin permissions

* Grant programmtic access

* Create user and copy the `SECRET_ACCESS_KEY_ID` and `ACCESS_KEY_ID`

### Setup the Serverless Framework

We are going to use the Serverless Framework to handle deploying our Sila SDK implementation as a Lambda function to AWS.

#### Install the Serverless CLI

```bash
npm install -g serverless
```

#### Project Setup (using template)

```bash
serverless create --template aws-python3 --path sila-python
cd sila-python
```

### Small Edits

* Rename `handler.py` file to `main.py`

#### Handler.py file

The first thing we are going to do is rename `handler.py` to `main.py`. It's a personal preference, but I like to keep things "somewhat" consistent across the Serverless projects I work on.

Then we want to change the `hello` function to be called `handler`. You can see that in the snippet below.

```python
import json


def handler(event, context):
    body = {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "input": event
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response
```

### Add local testing

If we want to run this file locally we can add the following snippet of Python to the bottom.

```python
...

# Testing locally
if __name__ == "__main__":
    handler({}, {})
```

This will allow us to execute the file by running the following command:

```bash
python main.py
```

Which will give us some immediate feedback into whether or not we are setup correctly.

### Serverless.yml file

Now we are going to edit the `serverless.yml` file to remove some comments and change the lambda import path.

```yaml
service: sila-python

provider:
  name: aws
  runtime: python3.7
  stage: ${opt:stage, "dev"}
  region: ${opt:region, "us-west-2"}
  profile: ${opt:profile, "default"}

functions:
  main:
    handler: main.handler
```

Note: we added these properties

```yaml
stage: ${opt:stage, "dev"}
region: ${opt:region, "us-west-2"}
profile: ${opt:profile, "default"}
```

These properties allow us to pass `flags` to the Serverless command. For example:

```bash
sls deploy --stage dev --region us-west-2 --profile default
```

With those changes in place we are good to install our Python package manager called, `pipenv`. Pipenv will handle installing the `silasdk` dependency. If you're familiar with NodeJS development and the use of `npm` it's very similar.

### Pipenv Installation

We can install `pipenv` using HomeBrew.

```bash
brew install pipenv
```

#### Installation Issues

If `brew install pipenv` breaks then you might need to upgrade `Xcode`.

```bash
==> Installing pipenv dependency: python
Error: Your Xcode (9.4.1) is too outdated.
Please update to Xcode 10.2.1 (or delete it).
Xcode can be updated from the App Store.
```

You can upgrade by going to the app store and searching for Xcode (https://stackoverflow.com/a/15417752).

Note: you may need to upgrade your Mac OS version to support the latest Xcode. You can do that inside the Mac App Store.

### Sila SDK

Let's first import the `silasdk` into our `main.py` file before we install to see how it breaks.

```python
import json

# Sila Dependencies
from silasdk import App

...
```

To test the `main.py` file the command will be slightly more involved than just running `python main.py`. We will need to execute the `python main.py` inside of a virtual environment that has our Python dependencies. Luckily, `pipenv` will do a lot of this for us. Here is the command:

```bash
pipenv run python main.py
```

Ideally the result should look like this:

```bash
Traceback (most recent call last):
  File "main.py", line 4, in <module>
    from silasdk import App
ModuleNotFoundError: No module named 'silasdk'
```

We're effectively telling `pipenv` to lookup the virtual environment corresponding to this project and then run or execute `python main.py` inside of that virtual environment. If you remember we ran `pipenv install silasdk` which was navigating into the python virtual environment and installing the `silasdk`.

Hopefully, all of that now makes sense :)

Okay now let's install the silasdk into our virtual environment using `pipenv`.

```bash
pipenv install silasdk
```

Now let's test again:

```bash
pipenv run python main.py
```

We should see the following output:

```bash
Event: {}
Response: {'statusCode': 200, 'body': '{"message": "Go Serverless v1.0! Your function executed successfully!", "input": {}}'}
```

Perfect, now we can see that no module errors are being thrown and our function is executing as it should. Time to make a deployment to AWS.

### Deploying to AWS

Now that we have something working locally. Let's get Python and the Serverless Framework working together. To do this we need to use a serverless framework plugin called, [serverless-python-requirements](https://github.com/UnitedIncome/serverless-python-requirements).

#### Install serverless-python-requirements

```bash
npm init
npm install --save-dev serverless-python-requirements
```

Then open the `serverless.yml` file and add:

```yaml
...
plugins:
  - serverless-python-requirements
```

or if you want to be even fancier we can skip a few steps:

```bash
sls plugin install -n serverless-python-requirements
```

This handy command will create a `package.json` file, install `serverless-python-requirements` as an npm dependency, and update our `serverless.yml` file to include the plugin!!

#### Setup serverless-python-requirements

Now we need to setup the `serverless-python-requirements` to use `pipenv` when we are packaging our lambda function for deployments to AWS. We need to do this to ensure our lambda function has the dependencies required to work.

Let's add the following code to our `serverless.yml` file.

```yaml
plugins:
  ...

custom:
  pythonRequirements:
    usePipenv: false
```

#### Test the package

To test the Serverless Framework packaging we can run:

```bash
serverless package
```

