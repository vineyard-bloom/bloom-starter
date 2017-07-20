import React from  'react';

import Button from 'presentation/inputs/button';
import CurrencyInput from 'presentation/inputs/currency-input';

import 'styles/components/dw-form';

const BorrowForm = (props) => {
  let formData = props.formData || { amount: { value: null } };
  return (
    <form className='dw-form'>
      <h3>Borrow ETH</h3>
      <div className='u-padding-large'>
        <CurrencyInput currency='ETH' name='amount' id='amount' label='Total Ethereum' formErrors={ formData.amount.error || '' }
          value={ formData.amount.value || parseFloat(0) } onChange={ props.updateForm } onBlur={ props.checkErrors } />
        <Button text={ formData.amount.value ? 'Confirm and Borrow' : 'Cancel' } onClick={ formData.amount.value ? props.submitForm : props.closeModal }
          className='btn-alt btn--full-width dw-button' disabled={ !formData.amount.error } />
      </div>
    </form>
  )
}

export default BorrowForm;