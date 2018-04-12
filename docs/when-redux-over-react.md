# When to use Redux over React's built-in state management

In general, state that only matters to a single component (or a component and its children) should be stored in React's native state system. Examples of this include:

- Showing / hiding content, dropdowns, tooltips, etc. on a page
- Holding on to an API-delivered json object that's only relevant to one component
- Tracking which section of a wizard is active

State that matters to the entire application, or state shared across multiple sections of your app in multiple components, should be managed by Redux. Examples of this include:

- Alerts that can be triggered from any section of your application
- User data stored on login and used throughout your app
- A countdown timer that triggers multiple element updates when it reaches 0

There are also times where it's simply easier to share state in Redux, such as the user-input data filled out in complex multi-step forms. [Bloom-forms](https://github.com/vineyard-bloom/bloom-forms) uses Redux to abstract out validation and state management in a reusable way that you can access anywhere -- this allows multi-step forms to read data from other sections more easily and allows more code reuse from one form to another.

### Futher Reading:
[You Might not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367) -- by Dan Abramov, the writer of Redux
[React State vs Redux State](https://spin.atomicobject.com/2017/06/07/react-state-vs-redux-state/)
