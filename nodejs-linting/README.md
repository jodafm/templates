# ESlint Pattern
Available EsLint Rules:
https://eslint.org/docs/rules/


### Walkthrough Video:
https://www.loom.com/share/d9b69f2eceaa4774a5024cfc4f08d539
### Strategy for implementing the most important lint rules for new features only
https://www.loom.com/share/19c0ed77be114f50a61ed7616b58b103


# Overall Strategy for Speed and Quality
![Speed and Quality Diagram](./assets/speedAndQualityStrategy.png)

# An example Code Review Checklist
Recommendations:

To reduce the amount of work involved in code reviews and QA, we suggest using the following tools:

- Jest testing will validate functionality
- ESLint will validate code style standards

The QA team will manually check what is not automatically checked by our tests

The code reviewer will manually check what is not automatically checked by ESLint


# Code checks that should be automated with ESLint:
ESLint rules should take into account the context, development team, and codebase they are being applied to. The purpose of these rules is to acheive readable, debuggable, testable code. Acheiving these goals may mean different things per contexts.

One important way to achieve readable, debuggable, testable code is to keep our functions as small and flat as possible. One way to acheive this is to set limits on how many lines a function can have and how many times a function is allowed to indent. With these 2 rules, we are drawing a box around our functions and defining the maximum size:

![Demonstration of Function Size](./assets/function-size.png)

In the digram above, we are determining that the maximum function line length is 14, and the maximum indentation depth is 4. This conceptually forms a box, which you can see above as a green box. The red line of code is breaking our maximum depth rule, since it is indented 5 times. The red lines of code below are breaking our maximum function line rule.

The goal here is not to reach an ideal function length or width, its to make our code more readable, debuggable, and testable. The ESLint rule is simply a pragmatic concrete way to try and make our functions an acceptable size.

### Rules to define in ESLint
- For new code, is indentation at an acceptable maximum depth (as defined in ESLint)
- For new code, is function length an acceptable maximum length (as defined in ESLint)
- Prefer modern javascript syntax such as
    - const and let over var (as defined in ESLint)
- Are there an acceptable amount of nested callbacks? (as defined in maximum callbacks in ESLint)


# Code checks manually performed by a code reviewer

### Serverless.yml checklist
- are we using `package:` to define what we are including in deployment
- Is the serverless.yml file valid (has it been tested by deploying to INT from developers machine)
- Do resources include variable stage names
- Do we have any hard coded resources that can be made dynamic with SLS pro outputs and params?

### General Code Review checklist
- If new code includes callbacks, do we have a good reason for it?
- Are names semantic and meaningful?
- Does the code consider failures? Messages, information, error handling
- Prefer modern javascript syntax such as async await over callbacks
- Should certain functionality be abstracted into a helper function for others to make use of?

### Documentation checklist
- Is there any complex code that requires documentation
- Is documentation on functions, methods, classes, contexts, and behaviours adequate?
