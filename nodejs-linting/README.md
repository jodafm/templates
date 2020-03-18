# ESlint Pattern
Available EsLint Rules:
https://eslint.org/docs/rules/


### Walkthrough Video:
https://www.loom.com/share/d9b69f2eceaa4774a5024cfc4f08d539
### Strategy for implementing the most important lint rules for new features only
https://www.loom.com/share/19c0ed77be114f50a61ed7616b58b103


# Overall Strategy for Speed and Quality
![Speed and Quality Diagram](./assets/speedAndQualityStrategy.png)

Recommendations:
To reduce the amount of work involved in code reviews and QA, we suggest using the following tools:
- Jest testing will validate functionality
- ESLint will validate code style standards

The QA team will manually check what is not automatically checked by our tests. The code reviewer will manually check what is not automatically checked by ESLint


# Code checks that should be automated with ESLint
ESLint rules should take into account the context, development team, and codebase they are being applied to. The purpose of these rules is to acheive readable, debuggable, testable code. Acheiving these goals may mean different things per context.

### Maximum Block Size
One important way to achieve readable, debuggable, testable code is to keep our functions small and flat. One way to acheive this is to set limits on how many lines a function can have (height) and how many times a function is allowed to indent (width). You can imagine, with these 2 rules, we are drawing a box around our functions and defining the maximum size:

![Demonstration of Function Size](./assets/function-size.png)

We will refer to this idea as 'Maximum Block Size'. In the diagram above, we are determining that the maximum function line length is 14, and the maximum indentation depth is 4. These 2 rules which make up our Miximum Block Size are visualized as a green box above. The red line of code to the right of the green box is breaking the maximum depth rule of 4, since it is indented 5 times. The red lines of code below the green box are breaking our maximum function line rule of 14.

The goal here is not to reach an ideal function length or width, its to make our code more readable, debuggable, and testable. Enforcing ESLint rules is simply one concrete way to help us write readable code.

### Rules to define in ESLint
- For new code, is indentation at an acceptable maximum depth (as defined in ESLint)
- For new code, is function length an acceptable maximum length (as defined in ESLint)
- Prefer modern javascript syntax such as
    - const and let over var (as defined in ESLint)
- Are there an acceptable amount of nested callbacks? (as defined in maximum callbacks in ESLint)

All of the rules above will be automatically checked by ESLint, and will not require a manual check in a code review.

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