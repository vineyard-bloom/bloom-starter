import React from 'react';
import { connect } from 'react-redux';
import BigNumber from 'bignumber.js';

import { closeModal, updateTotals, updateAccountStatus } from 'redux-store/actions';

import Form from 'containers/form';
import WithdrawEthForm from 'presentation/forms/withdraw-eth-form';

class WithdrawEthFormContainer extends React.Component {

  afterSubmit = (res, data) => {
    let newUserAccount = {
      ...this.props.user.account,
      cash: (new BigNumber(this.props.user.account.cash).plus(new BigNumber(data.amount))).toString()
    };

    let newEngineState = {
      ...this.props.engineState,
      available: (new BigNumber(this.props.engineState.availableEth).minus(new BigNumber(data.amount))).toString(),
      pendingOut: (new BigNumber(this.props.engineState.pendingOut).plus(new BigNumber(data.amount))).toString()
    };

    this.props.updateTotals(newEngineState);

    this.props.updateAccountStatus(this.props.user.id, newUserAccount);
    this.props.closeModal();
  }

  render() {
    let fieldNames = ['amount'];

    return (
      <Form id='withdraw-eth-form' submitRoute='/transaction/withdraw' fieldNames={ fieldNames }
        afterSubmit={ this.afterSubmit }>
        <WithdrawEthForm user={ this.props.user } />
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    engineState: state.engineState || {},
    user: state.user || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      return dispatch(closeModal())
    },
    updateTotals: (data) => {
      return dispatch(updateTotals(data))
    },
    updateAccountStatus: (userId, accountInfo) => {
      return dispatch(updateAccountStatus(userId, accountInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawEthFormContainer);