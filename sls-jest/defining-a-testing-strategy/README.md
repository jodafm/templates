Purpose of this meeting:

- Define Air Canada testing strategy, based on the projects ServerlessGuru has been involved in with AirCanada, we are proposing the **Test Pyramid Strategy**
- Give a high level understanding on the different kinds of tests and how they fit into AirCanada's strategy
- Understand the 'why' of each type of test

Agenda for the meeting:

- Overview of available Test Strategies
- Overview of Test Types
- High level overview of E2E Testing
- High level overview of Integration Testing
- High level overview of Unit Testing
- Comparison of Test Strategies and tradeoffs
- Example project demonstrating the unit, integration, and e2e tests
- Discussion on which strategy best fits AirCanada

# Overview of common test strategies

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/84a92712-1188-46f2-bccd-94b8433f649e/01-test-strategiy-options.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/84a92712-1188-46f2-bccd-94b8433f649e/01-test-strategiy-options.png)

At a high level, a test strategy involves at least 3 kinds of tests

- End to end tests
- Integration tests
- Unit tests

How much energy and resources you give to each kind of tests depends on your test strategy. Before we can talk about the comparisons and tradeoffs between them, we need to have a high level understanding of each kind of test.

### Comments worth making

- There isnt a wrong shape, we need to look at our context and codebase in order to choose the right one
- What is the value of this? Well if your org has committed to the honeycomb strategy, this diagram is really helpful in guiding your energy and effort. It is an easy guide or map for future work. It is also an agreement among the team to accept the tradeoffs that come with that strategy.
- Each strategy has tradeoffs. If you don't choose a strategy, you may be going down a path that, if the team had a discussion, would have decided not to go down. You may accidentally go down the test ice cream cone path without any discussion on it, and later say we would have never explicitly have chosen this if the tradeoffs where presented to us upfront.
- It is good for a team to discuss the tradeoffs they are willing to accept and which tradeoffs to avoid, and summarize it by committing to a test strategy.

# Overview of Test Types

We can split our application into 2 parts: 

- Code
- Infrastructure or Resources

The combination of our code and our infrastructure make an application

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bf8b1b52-148d-408f-98c1-7f0630d55a67/02_typeoverview_01.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bf8b1b52-148d-408f-98c1-7f0630d55a67/02_typeoverview_01.png)

We can see 3 concerns when looking at the above picture:

- Is our code/business logic working correctly
- Is our code interacting with external resources correctly
- Does the combination of our code and external resources result in a working app

These 3 concerns represent the 3 kinds of tests. 

- End to End
- Integration
- Unit

**End to end tests** will look at the whole picture

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f721c066-a2a2-456d-836e-e9120f670639/02_typeoverview_02.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f721c066-a2a2-456d-836e-e9120f670639/02_typeoverview_02.png)

**Unit tests** confirm our business logic is working correctly

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/722499fb-1dd8-4127-8bbe-e2d31d20dfe4/02_typeoverview_03.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/722499fb-1dd8-4127-8bbe-e2d31d20dfe4/02_typeoverview_03.png)

And **Integration tests** confirm that our code is interacting with external resources correctly

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f69449a0-b81b-454a-b0c1-58b555bb076e/02_typeoverview_04.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f69449a0-b81b-454a-b0c1-58b555bb076e/02_typeoverview_04.png)

# High level overview of End to End Tests

### What is an End to End test

An End to End test will test the whole system from the perspective of a user. This test knows nothing about the internals of the system. The test will hit an external endpoint and expect a specific response.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/56b9efaf-5e8c-402f-878b-3e879c5efe2d/03_e2e_01.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/56b9efaf-5e8c-402f-878b-3e879c5efe2d/03_e2e_01.png)

Of course there is a lot more going on on the inside, but this is completely hidden from the End to End test.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a0fbda93-9278-40b1-860d-1a65f30c5b56/03_e2e_02.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a0fbda93-9278-40b1-860d-1a65f30c5b56/03_e2e_02.png)

### What is an End to End test good for?

End to End tests are really good for confirming the app performs as expected. Another name often given to these tests is acceptance tests. They confirm that all individual pieces are connected properly and are able to deliver on the happy path.

### What is an End to End test not going to do for you?

End to End tests are very blunt. They know nothing about the internals, and so all they can do is test that when endpoints are hit, the correct thing happens from the users perspective. They cannot simulate failures, which means they often are only able to test happy paths.

End to End tests also cannot test any small piece of the system, they can only test the whole system all at once. Because of this, they are often not as helpful in the development process as other types of tests are.

### Location of Complexity

End to End tests are very simple to write, but are very complex to maintain from a resource standpoint. Development is simply, Ops is complicated

# High level overview of Unit Tests

### What is a Unit Test?

Unit tests test the business logic of your application. They are also able to test very small parts of your system, which make them great for:

- developing new features
- isolating bugs
- covering parts of the system that where previously break so they do not break again

Unit tests also have the benefit of being very fast since they do not rely on any infrastructure or external resources. This means a developer can run their whole unit test suite on every save of their file and receive very fast feedback on their feature development process.

Because Unit Tests do not use use any external resources, any code that interacts with any infrastructure must be mocked.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d1838eb1-94df-4e44-9025-2cfca44ec201/04_unit_01.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d1838eb1-94df-4e44-9025-2cfca44ec201/04_unit_01.png)

The blue lines in the image above represent regular lines of code that do interact with a resource, the green lines represent lines of code that interact with a database or external service. Instead of hitting real services in our unit tests, we swap them out for mocked resources:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7ab0b3af-7b04-44d5-a8cc-3330d1204a6e/04_unit_02.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7ab0b3af-7b04-44d5-a8cc-3330d1204a6e/04_unit_02.png)

Why mock? When we mock a service, we are able to keep our tests very fast, and make them deterministic, meaning they will always return the same response. We are not relying on anything outside of our code in order to run this test. This is great because we can instead focus on our business logic.

The other great thing about mocking is we can simulate scenarios. For example, what if the first db call fails, does our code handle that correctly? That is hard to answer with an End to End test. But we can easily setup a scenario in our unit tests where the first, second, or third call fail. 

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/82bfe6a9-5e4a-4b62-8675-2b23ebebb25e/04_unit_04.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/82bfe6a9-5e4a-4b62-8675-2b23ebebb25e/04_unit_04.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dc8cd717-df7b-4478-b368-6aeae6550f4c/04_unit_05.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dc8cd717-df7b-4478-b368-6aeae6550f4c/04_unit_05.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/657059ea-f332-42b0-98ae-306467d05f1a/04_unit_06.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/657059ea-f332-42b0-98ae-306467d05f1a/04_unit_06.png)

This gives us great flexibility, and insures that all of our code is confirmed to work as expected.

### What are Unit tests good for?

Because they are fast, they can run on every save a developer makes. Because they can be as big or small as you like, they are much more flexible, and can help a developer gain immediate feedback the feature they are developing. 

Unit Tests are also great for creating many scenarios, insuring that all branches in your code, including error branches are tested and confirmed to respond correctly.

### What are Unit tests not good for?

Validating that any integration with an outside system is working correctly.

### Location of Complexity

Unit tests can potentially be more complex to write when mocking is involved. When it comes to managing external resources, there is no complexity because there is no dependencies. Because of this, Operations is extremely simple. Fitting unit tests into a pipeline is very straightforward since there are no resources to maintain.

# High level overview of Integration Tests

Integration tests test the integration between your code and your resource is working as expected.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a11a57f1-2873-4cca-8c79-bac207b05aea/05_int-01.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a11a57f1-2873-4cca-8c79-bac207b05aea/05_int-01.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/35f269db-f31d-4863-9bdc-29892bab7960/05_int-02.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/35f269db-f31d-4863-9bdc-29892bab7960/05_int-02.png)

When making integration tests, you will notice when there are duplicates of the same call in your code. Because integration tests take time, developers are often extra motivated to make their code dry and extract common integration logic into helper functions. This cuts down drastically on the amount of integration testing developers will have to write. 

In the images above, we see smaller helper functions being tested against external resources.

### What are Integration Tests good for?

Integration tests are good for validating that the code which calls or interacts with external resources is actually interacting with them the way the developer expects them to. 

### What are Integration Tests not good for?

Testing the business logic of your app, running tests rapidly on every save of the codebase.

### Location of Complexity

Integration tests are slightly more complex to write than E2E, but less complex to maintain since they only rely on 1 resource rather than all resources to run the app. 

When compared to Unit tests, they may be simpler to write, but much more complex to maintain from an Ops perspective.

# Comparison of Test Strategies

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/84a92712-1188-46f2-bccd-94b8433f649e/01-test-strategiy-options.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/84a92712-1188-46f2-bccd-94b8433f649e/01-test-strategiy-options.png)

### How to choose?

- Test Pyramid is good for projects that have lots of business logic
- Test Honeycomb is good for projects that have mostly integration 'glue' code
- Test Ice cream cone can be dangerous for large projects, but can be effective for small simple serverless applications

### Location of Complexity

- All strategies include all 3 tests. But the Test Pyramid tends to be simpler to maintain and run since most of the tests require no infrastructure
- Test Honeycomb may involve complexity in the infrastructure, but if most of your application is glue code, this tradeoff is worth it
- Infrastructure complexity is high in the Test Icecream cone. Test code may be smaller and simpler.
