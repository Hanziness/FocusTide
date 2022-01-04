# AnotherPomodoro contribution guidelines

**AnotherPomodoro** is not a huge project and as such its guidelines are not so strict, either. It might be a great project for beginners and students to implement new features or bug fixes in.

Still, **before contributing, please read this short guide** to make sure you submit a new issue or pull request the right way!

## Branches and other technical information

### Branches

The app's most up-to-date development version is on the `develop` branch. **You should always submit pull requests against `develop`** and you should be working on this branch locally.

**The `prod` branch is only updated when a new version is released** as it contains the deployed version of the application (found at https://another-pomodoro.netlify.app).

The `preview` branch is for testing production updates early, it is rarely updated -- sometimes the `develop` branch is merged into it before it is merged into `prod` to test new releases.

## Where to discuss what

There are two places to have a chat with people about this software: [the discussions page](https://github.com/Hanziness/AnotherPomodoro/discussions) and [the issues page](https://github.com/Hanziness/AnotherPomodoro/issues).

### Issues

**Only specific problems or discussed new features and improvements should be posted here.**

*If you experienced a problem with the application, **you should report it here with all the necessary details**.*

If you can help solve an issue or you can provide more information about an issue, you can comment it here.

### Discussions

Generally everything that involves questions or feature requests and ideas (so anything that does not necessarily fit into the issues page) can be posted here.

*If you want to see a feature implemented, it's best to post it here.*

### How to run the app

During development, you'll be running the app using `yarn dev`. This starts a live development server that is exposed at `http://localhost:3000`.

To generate a production-ready build, run `yarn generate:modern`, which will create the final static website in the `dist` folder that will be served in production. To debug issues in the production version, you can start any live server in that folder:

```bash
# Install live-server to your system
yarn global add live-server
```

```bash
# Run it **from the dist folder**
cd dist
live-server .

# or if you don't want a browser window to open:
live-server --no-browser .
```
`live-server` will open at `http://localhost:8080`.

**Before submitting code, make sure it works in the production build as well!**

## Submitting issues

### a) When you suspect a bug

If you strongly believe that something is not working as intended, please make sure to:

1. Test the app in your up-to-date browser with extensions disabled
2. [Check if there was already a discussion about it](https://github.com/Hanziness/AnotherPomodoro/discussions)
3. [Check if someone else had already reported the issue](https://github.com/Hanziness/AnotherPomodoro/issues)
4. If not, then collect all the necessary steps to reproduce the issue (eg. "1. open the app in private browsing, 2. click here, 3. press this button, 4. the app crashed")
5. Submit a **detailed** (please!) report of what went wrong (most importantly: what did you expect to happen, what happened instead, how it happened, what was the error (check the console - `CTRL + SHIFT + i`)).

Again, it is most critical that you try to collect everything that could help us diagnose the issue.

Please avoid submitting *mega-issues*: if you have found multiple bugs, submit separate issues for them. If you're unsure, you can always [open a discussion](https://github.com/Hanziness/AnotherPomodoro/discussions) or ask if your problem is relevant to an already open issue (in the issue's comment section).

### b) Feature requests, ideas

If you'd like to have something implemented in the application, it is probably a better approach to [start a discussion first](https://github.com/Hanziness/AnotherPomodoro/discussions), so a new feature can be thought over and planned. This also helps avoid issues getting closed without solutions to them.

If that feature request is approved or there is a concrete idea to implement:

1. [Make sure there is no issue (open or closed) about it](https://github.com/Hanziness/AnotherPomodoro/issues)
2. Open an issue with all necessary information. **There is no need to provide implementation details**, just so much as someone can start working on it.

## Submitting pull requests

AnotherPomodoro is an open software and such it welcomes others to contribute code (fixes or features) to it. Adhering to the following simple rules will help your code get accepted:

* Before submitting code, please start a discussion (either [on the discussions](https://github.com/Hanziness/AnotherPomodoro/discussions) or the [issues page](https://github.com/Hanziness/AnotherPomodoro/issues)). **Code submitted without prior discussion will likely not be accepted.**
* Fork the repository. **Don't forget to switch to the `develop` branch after cloning!**
* Make sure your code is fixing [an open issue](https://github.com/Hanziness/AnotherPomodoro/issues?q=is%3Aopen+is%3Aissue). **Don't submit code to issues assigned to others.** If an issue is assigned to someone, they are expected to sooner or later submit their own fixes to it.
* It's best if you are submitting code that fixes an issue **assigned to you**. If you'd like to work on an issue, please indicate it.

### Technical requirements

* **Submit code against the `develop` branch!** It contains the most up-to-date development version of the app.
* Make sure your code works
  1. The app should work in development mode (`yarn dev`)
  2. and also in production mode (`yarn generate:modern`)
* The code should pass all lints (ie. it should follow all the code styling rules set by ESLint and Stylelint).

## Thank you ❤

Lastly, thank you. For reading this short guide and for contributing to open software. If you have any questions, feel free to [open a new discussion](https://github.com/Hanziness/AnotherPomodoro/discussions).
