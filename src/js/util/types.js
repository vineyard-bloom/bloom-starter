import PropTypes from 'prop-types';

export const WebServiceType = {
  fetchExchangeRate: PropTypes.func,
  fetchGlobalTotals: PropTypes.func,
  fetchTwoFactorCode: PropTypes.func,
  get: PropTypes.func,
  getUser: PropTypes.func,
  login: PropTypes.func,
  post: PropTypes.func,
  register: PropTypes.func,
  updateUserPassword: PropTypes.func,
  validateTwoFactorToken: PropTypes.func
}

export const UserType = {
  account: PropTypes.shape({
      status: PropTypes.string,
      total: PropTypes.string
    }),
  id: PropTypes.string,
  username: PropTypes.string,
  notifications: PropTypes.array,
  walletAddress: PropTypes.string,
}

export const AccountType = {
  bitcoinAddress: PropTypes.string,
  created: PropTypes.string,
  ethereumDepositAddress: PropTypes.string,
  ethereumWithdrawalAddress: PropTypes.string,
  id: PropTypes.string,
  identityVerification: PropTypes.number,
  modified: PropTypes.string,
  status: PropTypes.object,
  salt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}