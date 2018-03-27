import PropTypes from 'prop-types'

export const UserType = {
  account: PropTypes.shape(AccountType),
  id: PropTypes.string,
  notifications: PropTypes.array,
  password: PropTypes.string,
  username: PropTypes.string
}

export const AccountType = {
  status: PropTypes.string,
  total: PropTypes.string,
  walletAddress: PropTypes.string
}
