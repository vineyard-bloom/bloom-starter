export const AuthenticatedUser = {
  avatar: 'images/jared-small.jpg',
  username: 'Jared',
  password: 'test',
  id: 'd81738e8-213b-4bf5-9ec9-26d98944728b',
  walletAddress: '0xde0B295669a9FD93d5F28D9Ec8540f4cb697BAe',
  account: {
    cash: 120.0,
    debts: -30.0,
    lent: 300.0,
    offered: 14.2,
    status: 'Good'
  },
  borrowingHistory: [
    {
      type: 'Repayment',
      dateTime: 1480482720000,
      eth_val: 50.24,
      usd_val: '',
      btc_val: '',
      interestRate: 0.12551,
    },
    {
      type: 'Repayment',
      dateTime: 1476241580000,
      eth_val: 124.6,
      usd_val: '',
      btc_val: '',
      interestRate: 0.12551,
    },
    {
      id: '82H02823F',
      type: 'Loan',
      dateTime: 1471886040000,
      eth_val: 408.07,
      usd_val: '',
      btc_val: '',
      interestRate: 0.12551,
      repaid: 174.84
    },
    {
      type: 'Repayment',
      dateTime: 1471285040000,
      eth_val: 14.6,
      usd_val: '',
      btc_val: '',
      interestRate: 0.04742,
    },
    {
      id: '662F1B229',
      type: 'Loan',
      dateTime: 1471286040000,
      eth_val: 116.44,
      usd_val: '',
      btc_val: '',
      interestRate: 0.04742,
      repaid: 14.6
    }
  ],
  notifications: [
    { message: 'Email Address Updated', details: '' },
    { message: 'Auto-payment received', details: '0.239 ETH' },
    { message: 'Complete Your Account', details: '' }
  ],
  lendingHistory: [
    {
      loanId: '19BUF927G2',
      dateTime: 1480482720000,
      amount_eth: 28.262,
      repaid_eth: 3.047, 
      effectiveRate: 0.06059
    },
    {
      loanId: '028O8GF1QK',
      dateTime: 1477969200000,
      amount_eth: 100,
      repaid_eth: 19.221, 
      effectiveRate: 0.08434
    },
    {
      loanId: 'G1OX5SWL61',
      dateTime: 1476281580000,
      amount_eth: 31.229,
      repaid_eth: 22.729, 
      effectiveRate: 0.05923
    },
    {
      loanId: '2DG28V265F',
      dateTime: 1471886040000,
      amount_eth: 95.001,
      repaid_eth: 95.001, 
      effectiveRate: 0.12037
    }
  ],
  lendingInfo: {
    lifetimeInterest: 38.225,
    defaulted: 0
  }
}