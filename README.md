# Bloom Starter

This is a starter kit for React/Redux projects.

### Installation and Set Up
1. Install dependencies with `yarn install`
    * If you don't have yarn installed, follow the instructions here: https://yarnpkg.com/en/docs/install


2. For front-end debugging, you will need React and Redux Chrome dev tools. You can find them here:
    * [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
    * [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

3. Copy over any configuration from config-sample into a new config.json file.

4. Boot up the server in the root directory with `yarn dev`. By default, it's served on port 8080.

### Build
1. `yarn build` to generate a production bundle.

## Contents
- [Accordions](https://github.com/vineyard-bloom/bloom-starter#accordions)
- [Alerts](https://github.com/vineyard-bloom/bloom-starter#alerts)
- [Forms](https://github.com/vineyard-bloom/bloom-starter#forms)
- [Modals](https://github.com/vineyard-bloom/bloom-starter#modals)
- [Tables](https://github.com/vineyard-bloom/bloom-starter#tables)
- [Tooltips](https://github.com/vineyard-bloom/bloom-starter#tooltips)


## Usage

### Accordions
Accordions are great UX elements for hiding needed content when it's not relevant, but they can be difficult to build with accessibility and good CSS in mind. The `<Accordion />` component tries to solve this.

Accordions only need one property: an array of sections. Each section should be an object with a header, child (a React element of the contents inside that accordion), and a boolean isValid for styling that section of the accordion.

```
const sections = [
  {
    header: 'User Data',
    contents: <UserDataSection />,
    isValid: props.userValid
  },
  {
    header: 'Pet Data',
    contents: <PetDataSection />,
    isValid: props.user.pets && !!props.user.pets.length
  }
]

...

<Accordion className='special-class' sections={ sections } />
```

By default, `Accordion`s have index 0 open on mounting. If you want a different section set as the default, use the `defaultOpenSection`, which requires a number.

[Back to Contents](https://github.com/vineyard-bloom/bloom-starter#contents)

### Alerts
Alerts function similarly to modals, except they close after a few seconds' timeout, and you can add several in a row, which appear in succession.

The alert methods available through redux are `addAlert`, `expireAlert`, and `hardDeleteAlert`.

`addAlert` takes two parameters: the alert message, and the style, which should be one of three strings: 'success', 'status', and 'warning'. (After grabbing via mapDispatchToProps), it's used like:
```
this.props.addAlert('I am an alert', 'success')
```

`expireAlert` times out the first alert in your array of alerts. For example, you might have two alerts pop up in succession: 'Server Error, please try again.' and 'You are not authorized to do this action.'
The 'Server Error' alert will show up first. By default it will stay on screen for a few seconds and then disappear, revealing the second, but you may expire it early by calling
```
this.props.expireAlert()
```

`hardDeleteAlert` allows you to immediately delete any message in your alerts queue. Say you want to remove the second alert in the queue before it appears on screen. You can delete it immediately by
```
this.props.hardDeleteAlert('You are not authorized to do this action.')
```

[Back to Contents](https://github.com/vineyard-bloom/bloom-starter#contents)

### Forms
All form functionality is done through the [bloom-forms](https://github.com/vineyard-bloom/bloom-forms) package.
You can find all set up, usage, etc. docs there.

[Back to Contents](https://github.com/vineyard-bloom/bloom-starter#contents)

### Modals
There is always a modal rendered to the screen, but it appears/disappears depending on if it's given any content to display. All modal methods are available in the redux store via `openModal` and `closeModal`.  Without `modalContents`, the modal is hidden. Every modal renders the same `x` button to close.

`openModal` takes three parameters, the `event` that triggered it opening, `modalContents`, which should be a self-contained component holding any modal headers, body, forms, etc., and the ID of the button or anchor tag that triggered the modal. This third parameter is necessary for accessibility.

To use, grab `openModal` and `closeModal` with mapDispatchToProps.
```
const mapDispatchToProps = (dispatch) => {
  return {
    ...
    closeModal: () => {
      dispatch(closeModal())
    },
    openModal: (e, modalContents, triggerId) => {
      dispatch(openModal(e, modalContents, triggerId))
    }
    ...
  }
}
```
And trigger it like so:
```
this.props.openModal(e, <div>I am an example modal.</div>, 'example-button-trigger')
```
or
```
this.props.closeModal()
```

** All focusable elements inside the modal MUST have ids. There are several diffing event handlers that trap tab focus for accessibility, and it uses ids of those elements **

You cannot have more than one modal open at a time.

You don't need to pass closeModal to the existing 'x' button.

[Back to Contents](https://github.com/vineyard-bloom/bloom-starter#contents)

### Tables
Required Props:
- `headers`:
   an array of objects that look like:
  ```
  {
    displayValue: string (optional),
    title: string,
    sortable: boolean,
    sortValue: string
  }
  ```
  This populates your header row and allows for sorting of the table based on that row. `sortValue` is passed into the `changeActiveSort` function. `displayValue` is only used if you want to sort that row by one field, but present another, like if you wanted to sort by `'created'` key, but you wanted to display `'formattedDate'` key.
- `query`:
  an object that initializes pagination, sorting, and sets up whether to use client or server-side querying. It looks like:
  ```
  {
    useServer: boolean,
    pagination: {
      limit: number,
      offset: number
    },
    sort: {
      activeField: string, (must match one of your header's `sortValue`s)
      reverse: boolean (for ascending/descending sort of the same field)
    }
  }
  ```

`<Table />` supports both server-side and client-side querying for sorting, filtering, and pagination. To use server-side querying, make sure your `query.useServer` is set to `true` and you pass in `requestData` (see optional below) as a prop.

Optional, but helpful props are:
- `data`:
  An array of objects representing your table data. Object keys should all match your headers' `sortValue`s. (Why is this optional? Because sometimes there is no data to show.)
- `linkFields`:
  An object that turns data cells into links. The keys must match header `sortValue`s. For example:
```
{ 'id': '/product/:id', 'name': '/organization/:name' }
```
  would make any names and ids link to '/organization/<NAME>' and '/product/<ID>' respectively.
- `requestData`:
  A function needed to trigger server-side querying. It will receive a an object like your `query` prop. 

** A note on Table css: By default, the table will flip the headers and data vertically with an x-axis scroll when viewed on mobile and smaller screens. **

[Back to Contents](https://github.com/vineyard-bloom/bloom-starter#contents)

### Tooltips
Tooltip is hidden by default and opens on click. It can be used like:
```
<Tooltip contents='Tooltip contents' header='Example header' direction='left' />
```
Where `direction` is the side of the trigger button that the tooltip renders on.
