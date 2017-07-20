import React from 'react';

import Button from 'presentation/inputs/button';
import LendingProgress from 'presentation/lending/lending-progress';
import LendingStatuses from 'presentation/lending/lending-statuses';
import Table from 'presentation/layout/table';

import 'styles/components/lending';

const Lending = (props) => {
  return (
    <div className='lending'>
      <LendingProgress lifetimeInterest={ props.lendingInfo.lifetimeInterest } defaultedLoans={ props.lendingInfo.defaulted } />

      <LendingStatuses account={ props.account } changeCashOfferRatio={ props.changeCashOfferRatio } />

      <div className='lending__table'>
        <div className='lending__header-row'>
          <h3 className='lending__header'>Lending History</h3>
          <Button className='btn-alt' text='Download CSV' onClick={ () => { return; } } />
        </div>
        <Table data={ props.lendingHistory } headers={ props.headers } />
      </div>
    </div>
  )
};

export default Lending;
