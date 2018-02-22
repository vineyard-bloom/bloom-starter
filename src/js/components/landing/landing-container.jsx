import React from 'react'
import config from 'config/config.json'

import Landing from './presentation/landing'

/* eslint-disable- no-console */
class LandingContainer extends React.Component {
  state = {
    content: {}
  };

  initializeButter = () => {
    if (config.butter && config.butter.key) {
      this.butter = new Butter(config.butter.key)
    } else {
      console.log(
        '%c You must have an API key to connect to ButterCMS. Check your config.json file.',
        'color: red'
      )
    }
    return Promise.resolve({ butter: this.butter })
  };

  getButterData = butter => {
    if (!butter) {
      console.log(
        '%c ButterCMS not properly initialized. Check landing-container.jsx',
        'color: red'
      )
    } else {
      // butter.content.retrieve(['thing_1', 'thing_2'])
      // butter.page.retrive('landing')
      //   .then(res => { ... })
    }
  };

  componentDidMount() {
    this.initializeButter().then(({ butter }) => this.getButterData(butter))
  }

  render() {
    const { content } = this.state
    return <Landing content={content} />
  }
}

export default LandingContainer
