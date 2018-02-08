import sha3 from 'crypto-js/sha3'
import moment from 'moment'

const isChecksumAddress = address => {
  // Check each case
  address = address.replace('0x', '')
  var addressHash = sha3(address.toLowerCase())
  for (var i = 0; i < 40; i++) {
    // the nth letter should be uppercase if the nth digit of casemap is 1
    if (
      (parseInt(addressHash[i], 16) > 7 &&
        address[i].toUpperCase() !== address[i]) ||
      (parseInt(addressHash[i], 16) <= 7 &&
        address[i].toLowerCase() !== address[i])
    ) {
      return false
    }
  }
  return true
}

export function isValidETHAddress(address) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // check if it has the basic requirements of an address
    return false
  } else if (
    /^(0x)?[0-9a-f]{40}$/.test(address) ||
    /^(0x)?[0-9A-F]{40}$/.test(address)
  ) {
    // If it's all small caps or all all caps, return true
    return true
  } else {
    // Otherwise check each case
    return isChecksumAddress(address)
  }
}

export function numberWithCommas(x) {
  if (x.toString().indexOf('.') > -1) {
    const before = x.toString().split('.')[0]
    const after = x.toString().split('.')[1]
    return `${before
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${after}`
  } else {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

export function padNum(num, length = 2) {
  let end = num.toString()
  while (end.length < length) {
    end = `0${end}`
  }
  return end
}

export function humanFormatEth(num, decimalPlaces = 1) {
  return num === 0 || parseFloat(num)
    ? `${parseFloat(num).toFixed(decimalPlaces)}\u00A0ETH`
    : num
}

export function humanFormatDateTime(unixNum) {
  let date = moment(unixNum)
  return date.isValid() ? date.format('MM/DD/YY @ h:mma') : unixNum
}

export function humanFormatDate(unixNum, isLong) {
  let date = moment(unixNum)
  return isLong ? date.format('MMM D, YYYY') : date.format('MM/DD/YYYY')
}

export function convertWeiToEth(bigNum) {
  // bigNum must be a bignumber.js object, not an integer
  return bigNum.dividedBy(Math.pow(10, 18))
}

export function convertEthToWei(bigNum) {
  return bigNum.times(Math.pow(10, 18))
}
