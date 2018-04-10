import React from 'react'

const WebServiceContext = React.createContext()

export function contextWrapper(ChildComponent, props) {
  return (
    <WebServiceContext.Consumer>
      {context => <ChildComponent {...props} context={context} />}
    </WebServiceContext.Consumer>
  )
}
