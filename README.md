# Node API Template

A boilerplate for any kind of API service projects.

> Note: This project contains a collection of libraries and technologies that we feel are the most convenient as a starting point for any API service project, therefore we are open to discussion to continuously improve this set of tools.

**Features:**
  - JavaScript **ES6** Babel Transpiling during hot reload!
  - **MongoDB** cloud/local server connection.
    - Example Models and Schemas
  - Basic email and password based **JWT** authentication endpoints
  - Basic endpoint routes supporting modern HTTP2 methods.
    - Controllers architecture
  - Convenient set of helper utilities
    - Pagination
    - Error handler
    - Response handler
    - Sessions and Cookies
    - Much more


## Table of Contents

_Note: This is only a navigation guide for the specification, and does not define or mandate terms for any specification-compliant documents._

- [Getting Started](#getting-started)
- [Common Issues](#common-issues)

## Getting Started

#### Install Dependencies
```
npm install
```

#### Start Dev Server
```
npm run watch
```

## Usage

**Routes:**
- You may start adding new routes to the `/routes` folder.
- All routes are imported into `app.js` for route prefixing.

**Controllers:**
- Controllers are where we recommend keeping the business logic.
- We recommend keeping business logic and route logic separate.

**Models:**
- We use [Mongoose](https://mongoosejs.com/) as the Database ORM for MongoDB.
- We keep all the model schemas and data structures within `/models`.

## Common Issues
If you run into Babel 7.0.0 version not compatible error, simply remove the `node_modules` folder and `package-lock.json` or `yarn.lock` whichever applies, then run:
```
npm clean-install
```

and then it should straighten out your babel issue.

## Todo List
- Deployment scripts
- Environment variable support
- SQL support
- Basic CRUD examples
- Usage tutorial videos

## Maintainer(s)

- [mxdi9i7](https://github.com/mxdi9i7)
- [ssysm](https://github.com/ssysm)


## Contributing
- All contributions are welcomed.
- If you have a question or suggestion to make, here's a link to the issues section: [Issues](https://github.com/mxdi9i7/node-api-template/issues)
- Please reach out to the maintainers first if you want to work on a PR.

## License

[MIT](./LICENSE) Open Source License
