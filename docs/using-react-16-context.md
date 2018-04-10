# Using React 16 Context

[React Context Docs](https://reactjs.org/docs/context.html)

### Context is a useful API where sharing state across multiple levels is simplified. It may replace Redux in many cases. Our implementation follows:

The AppContainer wraps all of your components in a Provider that passes in your appContext.

The appContext is defined in components/app/app-context.
It's passed to the Provider in components/app/app-container (line 93).

There are two helper methods available to you to pass in the entire context object. You can import them from the appContext file.

- `getCurrentContext()` returns the current context state.
    * It can be used like: `getCurrentContext().WebService.getUser()`

- `withContext()` wraps your component in a context Consumer and provides it with a `context` prop.
    * It can be used like:
```
    const Component = () => { ... }
    OR
    class Component extends React.Component { ... }

    AND

    export default props => withContext(props)(Component)
```
    * This works with other wrappers, such as Redux's `connect()`. As an example:
```
    export default props => withContext(props)(connect(mapStateToProps)(Component))
```
