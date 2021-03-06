import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Modal } from 'bloom-layout'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import config from 'config/config.json'
import { WebServiceStub } from 'stubs/web-service-stub'
import { WebService } from 'services/web-service'

import { AppContext } from './app-context'

import { getUser } from 'redux-store/actions/user-actions'
import { addAlert, expireAlert } from 'redux-store/actions/alert-actions'
import { closeModal, openModal } from 'redux-store/actions/modal-actions'
import {
  freezePage,
  setWindowSize
} from 'redux-store/actions/presentation-actions'

import Header from 'components/navigation/header'
import Footer from 'layout/footer'
import MainRouter from 'routes'

// App Container is where any global countdowns, and the checks for user logins, etc are initialized and tracked
class AppContainer extends React.Component {
  static propTypes = {
    alerts: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string.isRequired,
        style: PropTypes.string
      })
    ),
    expireAlert: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object
  }

  recursiveWindowSize = () => {
    const height = window.innerHeight
    const width = window.innerWidth
    if (
      this.props.presentation.width != width ||
      this.props.presentation.height != height
    ) {
      this.props.setWindowSize(height, width)
    }

    setTimeout(() => {
      this.recursiveWindowSize()
    }, 1000)
  }

  timeoutAlerts = alerts => {
    if (alerts[0]) {
      setTimeout(() => {
        this.props.expireAlert()
      }, 3000)
    }
  }

  componentWillReceiveProps = newProps => {
    if (newProps.alerts[0]) {
      this.timeoutAlerts(newProps.alerts)
    }

    if (
      newProps.user &&
      !newProps.user.id &&
      this.props.user &&
      this.props.user.id
    ) {
      this.props.history.push('/login')
    }
  }

  componentDidMount = () => {
    // init countdowns, event listeners
    // talk to WebService to get any important info
    // etc
    this.props.getUser()
    this.timeoutAlerts(this.props.alerts)
    this.recursiveWindowSize()
  }

  render() {
    const {
      addAlert,
      alerts,
      closeModal,
      modal,
      openModal,
      presentation,
      user
    } = this.props

    const AppWebService = config.app.useWebServiceStub
      ? new WebServiceStub()
      : new WebService()

    return (
      <AppContext.Provider value={{ WebService: AppWebService }}>
        <div
          className={`App-container ${
            (modal && modal.modalContents) || presentation.freezePage
              ? 'u-prevent-scroll'
              : ''
          }`}
          aria-live='polite'
        >
          <h1 className='u-sr-only'>Bloom Starter</h1>
          <a href='#main-content' className='u-sr-only'>
            Skip To Main Content
          </a>
          <Header openModal={openModal} user={user} addAlert={addAlert} />
          <MainRouter />
          <Footer />
          <Alert currentAlert={alerts[0]} hidden={!alerts[0]} />
          <Modal
            modalContents={modal && modal.modalContents}
            modalTriggerId={modal && modal.modalTriggerId}
            closeModal={closeModal}
          />
        </div>
      </AppContext.Provider>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAlert: (message, style) => dispatch(addAlert(message, style)),
    closeModal: () => dispatch(closeModal()),
    expireAlert: () => dispatch(expireAlert()),
    freezePage: isFrozen => dispatch(freezePage(isFrozen)),
    getUser: () => dispatch(getUser()),
    openModal: (e, modalContents, triggerId) => {
      return dispatch(openModal(e, modalContents, triggerId))
    },
    setWindowSize: (height, width) => dispatch(setWindowSize(height, width))
  }
}

const mapStateToProps = state => {
  return {
    alerts: state.alerts,
    modal: state.modal,
    presentation: state.presentation,
    user: state.user
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppContainer)
)
