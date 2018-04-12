# Bloom Starter

This is a starter kit for React/Redux projects.

You'll need to know:
- [React](https://reactjs.org/docs/thinking-in-react.html) and React's [internal state management & lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
- [Redux](https://redux.js.org/)
- [Sass](https://sass-lang.com/guide)
- [SUIT naming convention](https://suitcss.github.io/)

### Installation and Set Up
1. Install dependencies with `npm install`

2. For front-end debugging, you will need React and Redux Chrome dev tools. You can find them here:
    * [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
    * [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

3. Copy over any configuration from config-sample into a new config.json file. If you're not running a server on localhost:3000, make sure you point it to the correct api url. Or, if you're not running an api at all, set `useWebServiceStub` to `true`.

4. Boot up the server in the root directory with `npm run dev`. By default, it's served on port 8080.

### Build
1. `npm run build` to generate a production bundle.

## Contents
- [Examples](https://github.com/vineyard-bloom/bloom-starter#examples)
- [State Management](https://github.com/vineyard-bloom/bloom-starter#state-management)
- [External Calls](https://github.com/vineyard-bloom/bloom-starter#external-calls)
- [Application Structure](https://github.com/vineyard-bloom/bloom-starter#structure)
- [Styling](https://github.com/vineyard-bloom/bloom-starter#styling)
- [Using React 16 Context](https://github.com/vineyard-bloom/bloom-starter/blob/master/docs/using-react-16-context.md)
- [Accessibility](https://github.com/vineyard-bloom/bloom-starter#accessibility)
- [Layout Components](https://github.com/vineyard-bloom/bloom-starter#layout-components)
- [Forms](https://github.com/vineyard-bloom/bloom-starter#forms)

### Examples
Example usage of multiple components, such as Forms and Accordions, are in src/js/components/examples.

You may delete this folder if you're familiar with bloom projects.

### State Management
This starter kit encourages a standard React top-down state flow. Redux is used for shared state to prevent huge monolithic root containers.

Container components are allowed to manage their own state if that state will never need to be shared elsewhere.

Markup components are allowed to manage their own state if it's entirely presentational (i.e. show/hide some markup, change a color, etc.).

For more detail: [When to use Redux over React's built-in state management](https://github.com/vineyard-bloom/bloom-starter/blob/master/docs/when-redux-over-react.md)

#### When to call Redux actions versus the API directly
We use [redux-thunk](https://github.com/gaearon/redux-thunk) as a middleware for Redux, which allows us to call multiple actions inside each Redux action creator. This means that we can trigger WebService calls and then await their response before dispatching that response data to Redux's reducers.

While this is very helpful for use cases such as login, logout, etc. that heavily interact with your Redux state, it's not necessary and actually discouraged to use Redux actions for *every* API call.

You should call the API directly from your container components if the information you need will have no affect on your Redux state.

### External Calls
Generally, container components should call external APIs on `componentDidMount` or `componentWillReceiveProps` lifecycle methods. Sometimes, they should call them on button clicks (such as form submission).

You should write a method on the component to do these calls, such as:
```
class BloopContainer extends Component {

  ...

  getBleeps = async () => {
    try {
      const res = await WebService.getBleeps()
      this.setState({
        bleeps: res.data
      })
    } catch(err) {
      // trigger an error alert
    }
  }

  componentDidMount() {
    this.getBleeps
  }

  ...
}
```

### Structure
App sections should be organized into folders. These folders should have an index.js file that *only* exports the default of that folder's container.

All external logic (API calls, Redux state reading/updating) should be written into `<COMPONENT>-container.jsx` files. These should have no native HTML5 / JSX markup (including `div`s) in them, ideally. These container files should render another file for markup, usually named `<COMPONENT>.jsx`.

All markup should be written in `<COMPONENT>.jsx` files, which live in the presentation/ folder under `<COMPONENT>-container.jsx`, or in the reusable presentation/ folder.

The app is currently organized like:
```
/src
    index.js (entry point -- where you attach to the DOM, wrap in Providers, etc.)

    /styles
      /bloom-overrides (for other bloom packages, like bloom-forms and bloom-layout)
          tooltip.scss
      /components
          example-component.scss
      /core
          _animations.scss
          utilities.scss
          _variables.scss
      main.scss

    /images
        /css-svgs (for svgs used in your stylesheets)
        /inline-svgs (for svgs injected into your markup directly; distinction is because of WebPack loaders)
        other-images.png

    /js
        /components (main content of your app)
            /app
                app-container.jsx (renders layout around your main router, initializes timeouts, grabs user from API on mount, etc.)
                index.js (exports app-container)
            /dashboard
                presentation/
                    dashboard.jsx
                    component-of-dashboard.jsx
                dashboard-container.jsx (grabs dashboard data from APIs & Redux and passes to presentation/dashboard)
                index.js (exports dashboard-container)
            ...

        /pages (dumb components that don't talk to APIs or Redux; 404s, etc)
            404.jsx

        /redux-store
            /actions
                alerts-actions.js
                types.js (redux action types)
            /reducers
                alerts-reducer.js
                ...
            initial-state.js
            reducers.js (where combineReducers sets up your redux structure)
            store.js (where you createStore and add middleware)

        /routes
            authenticated-routes.jsx (for logged-in users)
            index.js (exports main-router)
            main-router.jsx (root of all route handling)
            public-routes.jsx (for logged-out users)

        /services
             /web-service
                 index.js

        /stubs
            authenticated-user-stub.js
            web-service-stub.js

        /util
            helpers.js
            requests.js (axios methods, preformatted)
            types.js (PropType definitions used everywhere)
```

[Back to Contents](https://github.com/vineyard-bloom/bloom-starter#contents)

### Styling
Styles should be written in Sass using variables to allow for easy updates.

All style names should follow [SUIT naming convention](https://suitcss.github.io/).

Avoid importing all styles into main.scss. Import them at the top of the components that use those styles.

[General Styling Practices](https://github.com/vineyard-bloom/bloom-starter/blob/master/docs/styling-practices.md)

### Accessibility
This starter kit has the baseline for an accessible application, but accessibility must be considered when building every component. Other bloom packages solve multiple accessibility challenges, such as screen reader markup and tab ordering. Bloom-starter does take semantics and accessibility into consideration (such as skip-to-main-content links, `<header>`, `<footer>` etc.), but focuses on bootstrapping a maintainable, extensible structure for a project. You're provided with an accessible foundation.

### Forms
All form functionality is done through [bloom-forms](https://github.com/vineyard-bloom/bloom-forms).
You can find all set up, usage, etc. docs there.

### Layout Components
Accordions, Alerts, Modals, Tables, and Tooltips are all taken from [bloom-layout](https://github.com/vineyard-bloom/bloom-layout). You can find all set up, usage, etc. docs there.

[Back to Contents](https://github.com/vineyard-bloom/bloom-starter#contents)
