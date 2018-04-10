import React from 'react'
import config from 'config/config.json'
import { WebServiceStub } from 'stubs/web-service-stub'
import { WebService } from 'services/web-service'

export const AppContext = React.createContext({
  WebService: config.app.useWebServiceStub
    ? new WebServiceStub()
    : new WebService()
})

export function getCurrentContext() {
  return AppContext._currentValue
}

export function withContext(props) {
  return Component => (
    <AppContext.Consumer>
      {context => <Component context={context} {...props} />}
    </AppContext.Consumer>
  )
}
