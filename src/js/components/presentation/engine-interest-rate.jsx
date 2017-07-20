import React from 'react';
import { connect } from 'react-redux';

const EngineInterestRate = (props) => {
  return (
    <div className={ props.className }>
      { parseFloat(props.rate * 100) }%
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    rate: state.engineState ? state.engineState.interestRate : parseFloat(0)
  }
}

export default connect(mapStateToProps)(EngineInterestRate);