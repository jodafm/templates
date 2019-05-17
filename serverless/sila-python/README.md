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


## Installation Issues

If `brew install pipenv` breaks then you might need to upgrade `Xcode`.

```
==> Installing pipenv dependency: python
Error: Your Xcode (9.4.1) is too outdated.
Please update to Xcode 10.2.1 (or delete it).
Xcode can be updated from the App Store.
```

You can upgrade by going to the app store and searching for Xcode (https://stackoverflow.com/a/15417752).