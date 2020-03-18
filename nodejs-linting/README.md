# ESlint Pattern
Available EsLint Rules:
https://eslint.org/docs/rules/


### Walkthrough Video:
https://www.loom.com/share/d9b69f2eceaa4774a5024cfc4f08d539
### Strategy for implementing the most important lint rules for new features only
https://www.loom.com/share/19c0ed77be114f50a61ed7616b58b103


# An example Code Review Checklist
Recommendations:

To reduce the amount of work involved in code reviews and QA, we suggest using the following tools:

- Jest testing will validate functionality
- ESLint will validate code style standards

The QA team will manually check what is not automatically checked by our tests

The code reviewer will manually check what is not automatically checked by ESLint

### Serverless.yml checklist

- are we using `package:` to define what we are including in deployment
- Is the serverless.yml file valid (has it been tested by deploying to INT from developers machine)
- Do resources include variable stage names
- Do we have any hard coded resources that need to be dynamic?

### General Code Review checklist

- For new code, is indentation at an acceptable maximum depth (as defined in ESLint)
- For new code, is function length an acceptable maximum length (as defined in ESLint)
- If new code includes callbacks, do we have a good reason for it? (limit number of callbacks with ESLint)
- Are names semantic and meaningful?
- Does the code consider failures? Messages, information, error handling
- Prefer modern javascript syntax such as
    - const and let over var (as defined in ESLint)
    - async await over callbacks

### Documentation checklist

- Is there any complex code that requires documentation
- Is documentation on functions, methods, classes, contexts, and behaviours adequate?