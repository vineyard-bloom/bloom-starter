# Bloom Starter

This is a starter kit for React/Redux projects.

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
- [Using React 16 Context](https://github.com/vineyard-bloom/bloom-starter/blob/master/docs/using-react-16-context.md)
- [Layout Components](https://github.com/vineyard-bloom/bloom-starter#layout-components)
- [Forms](https://github.com/vineyard-bloom/bloom-starter#forms)

### Forms
All form functionality is done through the [bloom-forms](https://github.com/vineyard-bloom/bloom-forms) package.
You can find all set up, usage, etc. docs there.

### Layout Components
Accordions, Alerts, Modals, Tables, and Tooltips are all taken from the [bloom-layout]() package. You can find all set up, usage, etc. docs there.

[Back to Contents](https://github.com/vineyard-bloom/bloom-starter#contents)
