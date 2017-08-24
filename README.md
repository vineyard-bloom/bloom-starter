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


#### Validation
All the existing inputs have support for a `validateAs` string and an `onBlur` function prop, which should call `props.checkField`. You can add more types of validaton to the validator file in util/.

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
