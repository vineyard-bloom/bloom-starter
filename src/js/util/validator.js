import language from 'language'

// pass in a dict of field / value pairs to the aggregator

export function validatorAggregator(testDataObject = {}) {
  let status = { isValid: true, warnings: {}}

  for (let field in testDataObject) {
    let thisField = testDataObject[field]
    if (thisField.validateAs) {
      status = validate(status, thisField.value, thisField.validateAs, thisField.name)
    }
  }

  return status
}

const dict = {
  'date': dateError,
  'email': emailError,
  'file': fileError,
  'name': nameError,
  'not-empty': notEmptyError,
  'number': numberError,
  'number-field': numberFieldError,
  'phone': phoneError,
  'zip': zipError
}

const validate = (prevStatus, testData, validateAs, fieldName) => {

  if (fieldName.indexOf('confirm') > -1) {
    // find its partner and test against it
    const partnerName = fieldName.replace('confirm', '')
    const partner = document.getElementById(partnerName[0].toLowerCase().concat(partnerName.slice(1)))
    if (partner.value != testData) {
      prevStatus.isValid = prevStatus.isValid && false
      prevStatus.warnings[fieldName] = language.errors['dont-match'].replace('<FIELD>', partnerName)
    } else {
      isValid = prevStatus.isValid && true
    }
  }

  let error = dict[validateAs](testData, fieldName)
  prevStatus.warnings[fieldName] = error

  // if (!error) {
  //   delete prevStatus.warnings[fieldName]
  // }

  return { ...prevStatus, isValid: prevStatus.isValid && !error }
}

function dateError(testData, fieldName) {
  // const dateRegex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/
  // return dateRegex.test(testData) ? null : language.errors['invalid-date']
  return new Date(testData) ? null : language.errors['invalid-date']
}

function emailError(testData, fieldName) {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(testData) ? null : language.errors['invalid-email']
}

function fileError(testData, fieldName) {
  return testData.files && testData.files[0] && (testData.files[0].size > 100000)
    ? language.errors['file-size']
    : null
}

function nameError(testData, fieldName) {
  return testData.length < 2
    ? language.errors['min-length'].replace('<FIELD>', fieldName).replace('<LIMIT>', '2')
    : null
}

function notEmptyError(testData, fieldName) {
  return !testData && (testData !== 0)
    ? language.errors['empty-field'].replace('<FIELD>', fieldName)
    : null
}

function numberError(testData, fieldName) {
  return !testData || !(/^[0-9]+$/.test(testData))
    ? language.errors['invalid-number']
    : null
}

function numberFieldError(testData, fieldName) {
  return !testData || !(/^[0-9]+$/.test(testData))
    ? language.errors['invalid-field'].replace('<FIELD>', fieldName)
    : null
}

function phoneError(testData, fieldName) {
  if (testData.length < 8) {
    return language.errors['min-length'].replace('<FIELD>', language.fieldLabels.phoneNumber).replace('<LIMIT>', '8')
  } else if (testData.length > 15) {
    return language.errors['max-length'].replace('<FIELD>', language.fieldLabels.phoneNumber).replace('<LIMIT>', '15')
  } else {
    return null
  }
}

function zipError(testData, fieldName) {
  const usZipRegex = /^\d{5}(?:[-\s]\d{4})?$/
  return usZipRegex.test(testData) ? null : language.errors['invalid-field'].replace('<FIELD>', language.fieldLabels.zip)
}
