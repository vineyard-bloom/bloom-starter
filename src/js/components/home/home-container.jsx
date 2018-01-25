import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getUser } from 'redux-store/actions/userActions'
import { UserType } from 'types'

import ExamplesContainer from 'components/examples'
import SideBar from 'components/navigation/side-bar'

import 'styles/components/home'

class HomeContainer extends React.Component {
  static propTypes = {
    getUser: PropTypes.func,
    user: PropTypes.shape(UserType)
  };

  componentWillReceiveProps = async newProps => {
    if (newProps.getUser && !this.props.getUser) {
      try {
        await newProps.getUser()
      } catch (err) {
        console.log('get user error: ', err) // eslint-disable-line no-console
      }
    }
  };

  componentDidMount = async () => {
    if (this.props.getUser) {
      try {
        await this.props.getUser()
      } catch (err) {
        console.log('get user error: ', err) // eslint-disable-line no-console
      }
    }
  };

  render() {
    return (
      <div className='Home'>
        <SideBar user={this.props.user} />
        <div className='Home-content'>
          <h2>Main Content Here</h2>
          <p>
            Below is an overview of some basic elements used throughout the
            starterkit.
          </p>
          <ExamplesContainer />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser())
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
