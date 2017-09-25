# Bloom Starter

This is a starter kit for react/redux projects.

### Installation and Set Up
1. Install dependencies with `yarn install`
    * If you don't have yarn installed, follow the instructions here: https://yarnpkg.com/en/docs/install


2. For front-end debugging, you will need React and Redux Chrome dev tools. You can find them here:
    * [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
    * [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)


3. Boot up the server in the root directory with `yarn dev`. By default, it's served on port 8080.

## Build
1. `yarn build` to generate a production bundle. (needs optimization)


## Usage

### Modals
There is always a modal rendered to the screen, but it appears/disappears depending on if it's given any content to display. All modal methods are available in the redux store via `openModal` and `closeModal`.  Without `modalContents`, the modal is hidden, but every modal renders the same `x` button to close.

`openModal` takes two parameters, the `event` that triggered it opening, and `modalContents`, which should be a self-contained component containing any modal headers, body, forms, etc.

To use, grab `openModal` and `closeModal` with mapDispatchToProps.
```
const mapDispatchToProps = (dispatch) => {
  return {
    ...
    closeModal: () => {
      dispatch(closeModal())
    },
    openModal: (e, modalContents) => {
      dispatch(openModal(e, modalContents))
    }
    ...
  }
}
```
And trigger it like so:
```
this.props.openModal(e, <div>I am an example modal.</div>)
```
or
```
this.props.closeModal()
```

You cannot have more than one modal open at a time.

You don't need to pass closeModal to the existing 'x' button.

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

### Forms
All form functionality is done through the [bloom-forms](https://github.com/vineyard-bloom/bloom-forms) package.
You can find all set up, usage, etc. docs there.
