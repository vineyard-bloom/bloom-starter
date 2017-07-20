import React from 'react';
import { connect } from 'react-redux';
import BigNumber from 'bignumber.js';

import { closeModal, updateAccountStatus, updateTotals } from 'redux-store/actions';

import Form from 'containers/form';
import BorrowForm from 'presentation/forms/borrow-form';

class BorrowFormContainer extends React.Component {

  afterSubmit = (res, data) => {
    if (data.amount.value > this.props.engineState.availableEth) {
      this.props.addFormError('borrow-form', 'amount', 'Not enough funds available');
    } else {
      let newUserAccount = {
        ...this.props.user.account,
        cash: (new BigNumber(this.props.user.account.cash).plus(new BigNumber(data.amount.value))).toString()
      };

      let newEngineState = {
        ...this.props.engineState,
        available: (new BigNumber(this.props.engineState.availableEth).minus(new BigNumber(data.amount.value))).toString(),
        pendingIn: (new BigNumber(this.props.engineState.pendingIn).plus(new BigNumber(data.amount.value))).toString()
      };

      this.props.updateTotals(newEngineState);

      this.props.updateAccountStatus(this.props.user.id, newUserAccount);

      // update borrowing history

      this.props.closeModal();
    }
  };

  validateAmount = (fieldName, fieldValue) => {
    if (fieldName === 'amount' && (!fieldValue || new BigNumber(fieldValue).greaterThan(new BigNumber(this.props.engineState.availableEth)))) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    let fieldNames = ['amount'];

    return (
      <Form id='borrow-form' submitRoute='/transaction/loan' fieldNames={ fieldNames }
        afterSubmit={ this.afterSubmit }>
        <BorrowForm />
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    engineState: state.engineState || {},
    user: state.user || {},
    forms: state.forms || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFormError: (formId = 'borrow-form', fieldName, errorMsg) => {
      dispatch(addFormError(formId, fieldName, errorMsg))
    },
    closeModal: () => {
      dispatch(closeModal())
    },
    updateTotals: (data) => {
      dispatch(updateTotals(data))
    },
    updateAccountStatus: (userId, accountInfo) => {
      dispatch(updateAccountStatus(userId, accountInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BorrowFormContainer);