import React from 'react';
import { connect } from 'react-redux';

import { closeModal, updateForm } from 'redux-store/actions';
import { humanFormatEth } from 'helpers';

import Button from 'presentation/inputs/button';
import CurrencyInput from 'presentation/inputs/currency-input';
import Form from 'containers/form';

import 'styles/components/dw-form';

// this is a hybrid component but only deals with its own state (not app-level), so it stays presentation
class WithdrawEthForm extends React.Component {
  state = {
    stage: 0
  };

  goBackStage = () => {
    this.setState({
      stage: this.state.stage - 1
    });
  };

  goNextStage = () => {
    this.setState({
      stage: this.state.stage + 1
    });
  };

  render() {
    let formData = this.props.formData || { amount: { value: null } };

    return (
      <div className='dw-form'>
        <h3>Withdraw ETH</h3>

        { this.state.stage == 0 ?
          <div className='dw-stage'>
            <form id='withdraw-eth-form' className='form'>
              <h4>Enter Amount to Withdraw:</h4>
              <CurrencyInput currency='ETH' name='amount' id='amount' label='Total Ethereum' value={ formData.amount.value || parseFloat(0) } onChange={ this.props.updateForm } />
            </form>

            <div className='dw-address'>
              <h4>ETH Address for Withdraw:</h4>
              <div id='wallet-address'>{ this.props.user.walletAddress }</div>
              <a href='#'>
                request change of your withdraw address
              </a>
            </div>

            <Button id='continue' onClick={ formData.amount.value ? this.goNextStage : this.props.closeModal }
              className='btn-alt btn--full-width dw-button'
              text={ formData.amount.value ? 'Continue' : 'Cancel' } />
          </div>
          :
          <div>
            <a href='#' onClick={ this.goBackStage } className='dw-back'>
              Back
            </a>
            <div className='dw-summary'>
              <div>Are you sure you would like to withdraw:</div>
              <div>{ humanFormatEth(formData.amount.value || parseFloat(0), 5) }</div>

              <div className='dw-address'>
                <div>to this address:</div>
                <div id='wallet-address'>{ this.props.user.walletAddress }</div>
                <a href='#'>
                  request change of your withdraw address
                </a>
              </div>

              <Button id='submit-withdraw' onClick={ this.props.submitForm }
                className='btn-alt btn--full-width dw-button' text='Confirm and Withdraw' />
            </div>
          </div>
        }

      </div>
    );
  }
}

export default WithdrawEthForm;
