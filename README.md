# Universal lit

## On Boarding new Dev
The main purpose of this project is to provide independent components to build complete pages to be imported in Universal.
The goal is:

1 - to wrap lit pages into asp master pages in order to keep separated logic between the FE and the BE.

2 - provide single elements to be exported into legacy Universal pages.
Due to the nature of the project [shadow dom](https://web.dev/shadowdom-v1/) is not necessary.

## Project setup
[Install the latest LTS node version](https://nodejs.org/en/) if not already in your pc. Npm (node package manager) will be available after that.

If you use VS Code, is highly reccomend the [lit-plugin extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), which enables some extremely useful features for lit-html templates:
- Syntax highlighting
- Type-checking
- Code completion
- Hover-over docs
- Jump to definition
- Linting
- Quick Fixes

The project is setup to reccomend lit-plugin to VS Code users if they don't already have it installed.

Inside the package.json file there are useful intels about the project itself. The most important ones are the sections **scripts, dependencies and devDependencies**.

The first section contains all the available scripts for the project (to build it, to run it inside a dev server, to run tests...)
The second section shows the project dependencies, which means all it needs to work correctly and what will be inserted in the final bundle.
The third section contains all the utilities for the developer to work on the project. These kind of dependencies will **not** be in the final bundle.

To download all the dependencies run

```bash
npm i
```

This command creates the node_modules folder where all the deps are downloaded.

## Build your first component

Inside src/components there is **base-component**, a starter component which can be copied and developed as a new one.
Remember to export your components from **src/main.ts** to make it available.
Before doing so it's important to understand the basis behind this library, so here some useful links to the doc.

### [Define a new web component](https://lit.dev/docs/components/defining/)

Basically add the **@customElement** decorator on a class which extends LitElement

### [Render a new component](https://lit.dev/docs/components/rendering/) & [How the template works](https://lit.dev/docs/templates/expressions)

> The template chapter of the lit doc explains the syntax and how to work with **child nodes, attributes, properties and event listeners**.
Moreover it explains how to work with conditionals (ie if-else),lists of elements to be rendered and how to use loops.

- To use JS inside the template put it in **${}**
    > `<h1>Hello ${name}</h1>`
- To pass datas in an attribute is possible to do something like this: **class=${stringOfClasses}**
    > `<div class=${highlightClass}></div>`
- To set boolean attributes use **?** before it. Ie: **?hidden=${!show}**
    > `<div ?hidden=${!show}></div>`
- To set a property use **.** before it. Ie: **.value=${value}**
    > `<input .value=${value}>`
- Event listeners work with **@** before them. Ie: **@click=${this._clickHandler}**
    > `<button @click=${this._clickHandler}>Go</button>`


### [Component attributes and state](https://lit.dev/docs/components/properties/)

> An attribute is a class property that can trigger the reactive update cycle when changed, re-rendering the component, 
and optionally be read or written to attributes.
>
> While Internal reactive state refers to reactive properties that aren't part of the component's API. 
These properties don't have a corresponding attribute, and are typically marked protected or private in TypeScript.

### [Lifecycles](https://lit.dev/docs/components/lifecycle/)

> About lifecycles is important to know that they are divided in 2 categories:
> - standard 
> - reactive
>
> In the first category there are the **constructor, connectedCallback and disconnectedCallback** fns.
The first is used to initialize the component, the second is mainly used to handle external events and the last to remove 
event handlers.
>
> In the second category there is the **requestUpdate** method which performs a component update when a prop changes or when 
this method is explicitly called. There are other method other than that in the call stack to perform an update, but their
implementation (to perform a custom behavior) is recommended only for advanced use cases (ie better performance when necessary).  

### [Manage events: how to listen and dispatch events](https://lit.dev/docs/components/events/)
### [How to use decorators](https://lit.dev/docs/components/decorators/)

### Style the component

Inside src/asset/style there is the **index.scss** file which works as the index for all the components single stylesheets.
Import them here and remember to import the compiled index.min.css inside the project you want to use web components.

### Api Integration

Use [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to connect to the web APIs.
Inside src/service create specific files for api groups where containing the respective clients.
When the yml will be ready, use an automation to create and delivery the clients inside the app

## Build the project

To build the bundle for dev purpose:

```bash
npm run build:dev
```
To build the bundle for prod purpose:
```bash
npm run build:prod
```
Both the commands will generate a dist folder containing 2 other folders:
- **css**: contains all the styles wrapped in the index.css file
- **js**: contains the main.js file where all the web components are grouped, while types contains transpiling datas.

The main differences are that the first command rebuild the project on every code change and the second one the final code will be minified and both the console and the debugger will be disabled.
Both the TypeScript compiler and lit-analyzer are configured to be very strict. You may want to change `tsconfig.json` to make them less strict.

## Automated Testing

## Component testing

Into test directory is kept index.html where the behaviour of the components and the result of bundling (directly importing the js and css dependencies) can be tested.
To correctly view this file is necessary to serve it with a server like es-dev-server.

Before running the server, open a terminal window and run 

```bash
npm run build:dev
```
Then run the dev server

```bash
npm run serve
```

Doing so opens a new window in the browser where updates on the code are automatically visible.

## Linting

Linting of TypeScript files is provided by [ESLint](eslint.org) and [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint). In addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to type-check and lint lit-html templates with the same engine and rules as lit-plugin.

The rules are mostly the recommended rules from each project, but some have been turned off to make LitElement usage easier. The recommended rules are pretty strict, so you may want to relax them by editing `.eslintrc.json` and `tsconfig.json`.

## Publishing
TODO

## Integrate with Universal

To simplify the management of the dependencies the resulting bundle provides the web components inside dist/js/main.js and
the style inside dist/css/index.css.

Bootstrap JS and its dep Popper need to be imported separately.
