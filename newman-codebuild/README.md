# Newman with Codebuild

&nbsp;

This is a template for adding Newman to a test project and automatically testing on build. The goal is for SLS Offline to provision a local server for Newman API tests before deployment: if any tests fail the build is stopped to prevent failed code from being published. 

&nbsp;

1. [Write Postman Tests](Write-Postman-Tests)
2. [Create Newman Tests](Create-Newman-Tests)
3. [Create Buildspec File](Create-Buildspec-File)
4. [Deploy](Deploy)

## Writing Postman Tests

### Test Scripts & Assertions

Tests occur after an API request is finished and typically analyze or use data from the response.

For example let's say we have a test named "Status Test" that checks if the response status is 200. This is written as:

```
pm.test("Status Test", function () {
    pm.response.to.have.status(200);
});
```

Assertions are run in a similar format:

```
"pm.test('expect response json contain args', function () {",
"    pm.expect(pm.response.json().args).to.have.property('source')",
"      .and.equal('newman-sample-github-collection')",
"})"
```

Finally you can find more example tests below or read further with [this tutorial](https://learning.getpostman.com/docs/postman/scripts/test-scripts/):

```
pm.test("response should be okay to process", function () {
    pm.response.to.not.be.error;
    pm.response.to.have.jsonBody("");
    pm.response.to.not.have.jsonBody("error");
});
```

### Pre-request Scripts

Pre-request scripts run _before_ an API call is made and are generally used for setting up environmental variables & headers. An example would be setting a dynamic date for your header:

```
pm.environment.set("currentTimeHeader", new Date());
```

Another would be resetting a variable to ensure it's consistent:

```
pm.environment.set("username", "Erin Korth");
```

## Create Newman Tests

## Create Buildspec File

## Deploy