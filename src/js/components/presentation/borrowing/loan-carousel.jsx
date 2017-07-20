import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import BigNumber from 'bignumber.js';

import { humanFormatEth } from 'helpers';

import Button from 'presentation/inputs/button';
import ButtonArrow from 'presentation/inputs/button-arrow';

import 'styles/components/carousel';
import 'styles/components/lending';
import 'styles/components/loan-box';

const LoanCarousel = (props) => {
  let { paidBack, id, interestRate } = props.currLoan;
  let ethValue = new BigNumber(props.currLoan['totalAmount'] || parseFloat(0));

  let repaid = new BigNumber(paidBack || parseFloat(0));
  interestRate = interestRate || parseFloat(0);

  let repaidPercent = repaid.dividedBy(ethValue).toString();
  let barStyles = {
    width: `${repaidPercent * 100}%` || '0px',
    color: (parseFloat(repaidPercent) < .2 ? '#696969' : '')
  };

  if (parseFloat(repaidPercent) < .2) {
    barStyles.padding = '10px 0';
  }

  return (
    <div className='carousel'>
      <ButtonArrow direction='left' onClick={ () => { props.switchLoan('prev'); } } />
      <CSSTransitionGroup
        transitionName="fold"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300} className='carousel-content'>
        { props.currLoan && id ?
          <div className='loan-box'>
            <div className='loan-box__repaid-bar'>
              <dl style={ barStyles } className='loan-box__repaid'>
                <span style={ { display: 'block', width: '100px', marginLeft: parseFloat(repaidPercent) <= .2 ? `calc(105% + ${repaidPercent * 100}%)` : '' } }>
                  <dt>Repaid:</dt>
                  <dd>{ humanFormatEth(repaid, 3) }</dd>
                </span>
              </dl>
              <dl style={ { width: `${ (ethValue.minus(repaid)).dividedBy(ethValue.times(100)).toString() }%` } }>
                <dt>Currently Owe:</dt>
                <dd>{ humanFormatEth(ethValue.minus(repaid).toString(), 3) }</dd>
              </dl>
            </div>
            <div className='box u-no-margin'>
              <dl className='lending-status__row'>
                <dt>Loan ID</dt>
                <dd>{ id }</dd>
              </dl>
              <dl className='lending-status__row'>
                <dt>Interest Rate on Loan</dt>
                <dd>{ (interestRate*100).toFixed(3) }%</dd>
              </dl>
              <Button text='Make Manual Repayment' onClick={ () => { console.log('no manual repayment modal'); } }
                className='btn-alt--purple' />
            </div>
          </div>
          :
          <div className='box'>
            <p className='u-text-center'>You have no loans to display</p>
            <p className='u-text-center'>Why don't you borrow some ETH?</p>
          </div>
        }
      </CSSTransitionGroup>
      <ButtonArrow direction='right' onClick={ () => { props.switchLoan('next'); } } />
    </div>
  );
}

LoanCarousel.propTypes = {
  currLoan: PropTypes.shape({
    'eth_val': PropTypes.number,
    id: PropTypes.string,
    interestRate: PropTypes.number,
    repaid: PropTypes.number
  }),
  switchLoan: PropTypes.func
};

export default LoanCarousel;