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
This starter pack makes form state management, validation, and and error handling much easier to get up and running.

#### Set Up
- Every form needs two files: a container and a presentation component (with all the inputs inside it)
- The container should render the presentation component wrapped inside of the generic Form.jsx container. This wrapper handles all your state, updating redux, errors, etc.
- Example:
A login form might look like this: (simplified -- make sure all your inputs have required props, etc.)
```
const LoginForm = (props) => {
  return (
    <form id='login-form'>
      <TextInput name='username' value={ formData.username } />
      <TextInput name='password' isPassword={ true } value={ formData.password.value } onBlur={ props.checkField } />
      <Button text='submit' onClick={ props.submitForm } />
    </form>
  )
}
```
And its container would look like this:
```
class LoginFormContainer extends React.Component {
  render() {
    let fieldNames = ['username', 'password']
  
    return (
      <Form id='login-form' fieldNames={ fieldNames } submitRoute='/login'>
        <LoginForm />
      </Form>
    )
  }
}
```
- Note that the IDs match ('login-form'), and the fieldNames match the names of the TextInputs.

#### Updating Form State
By default, inputs' values are updated via the `updateForm` method. It receives the event coming from changing that input and sets that field's value for you. You can stick it right on an input like:
```
<TextInput onChange={this.props.updateForm} />
```

You can also manually update a field. Say you have a button that changes the value of a text input. You would want to manually pass in which values and which fields are needed. You can do this through `manualFieldUpdate`, which accepts three parameters: the formId, the fieldValue, and the fieldName. To use:
```
const { formData, formId, manualFieldUpdate } = this.props

...

<Button onClick={ () => this.props.manualFieldUpdate(formId, 'Choice #1 - Blah', 'choice') }>
  Choice #1
</Button>
<TextInput name='choice' value={ formData.choice.value } />

...
```

#### Validation
All the existing inputs have support for a `validateAs` string and an `onBlur` (when that field loses focus) function prop, which should call `props.checkField`. You can add more types of validaton to the validator file in util/.

- Example:
You have a field that you want to validate as one of 3 pets. You're calling this 'isAPet'. You add a case to the validator dict:
```
    ...
    'file': fileError,
    'isAPet': petError,
    ...
```
and also create a function that returns an error if it isn't one of the 3 pets.
```
function petError(testData, fieldName) {
  return testData === 'dog' || testData === 'cat' || testData === 'bird'
    ? 'Not a known pet type.'
    : null
}
```

To use this set up, an example field would look like:
```
<TextInput name='pet' validateAs='isAPet' onBlur={ props.checkField } onChange={ props.updateForm }
  value={ formData.pet.value } error={ formData.pet.error } />
```

You don't need to change anything inside Form.jsx.

#### Forms with Switch Inside
To make forms with Routes inside, you will need to make the Switch its own Container inside another form container and pass in the props with a spread operator.

For example:
Outermost container:
```
class RegistrationFormContainer extends React.Component {
  render() {
    return (
      <Form id='registration-form' fieldNames={ fieldNames } submitRoute='/user/register'>
        <RegistrationFormSwitch />
      </Form>
    )
  }
}
```
Switch container:
```
class RegistrationFormSwitch extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/step1' render={ () => <StepOne { ...this.props } /> } />
        <Route path='/step2' render={ () => <StepTwo { ...this.props } /> } />
      </Switch>
    )
  }
}
```
Now StepOne and StepTwo will both be able to receive their needed Form props, such as `updateForm` and `addFormError`.
