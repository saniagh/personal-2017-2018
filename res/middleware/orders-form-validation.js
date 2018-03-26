module.exports = (req, res, next) => {
  let message = '';
  let errors = {};
  let formValidity = true;
  const requestData = req.body;

  if (!requestData.firstName || typeof requestData.firstName !== 'string') {
    errors.firstName = 'This isn\'t a valid first name.';
    formValidity = false;
  } else if (requestData.firstName.trim().length === 0) {
    errors.firstName = 'This field cannot be empty.';
    formValidity = false;
  } else if (requestData.firstName.trim().length > 64) {
    errors.firstName = 'This name is too long.';
    formValidity = false;
  }

  if (!requestData.lastName || typeof requestData.lastName !== 'string') {
    errors.lastName = 'This isn\'t a valid last name.';
    formValidity = false;
  } else if (requestData.lastName.trim().length === 0) {
    errors.lastName = 'This field cannot be empty.';
    formValidity = false;
  } else if (requestData.lastName.trim().length > 64) {
    errors.lastName = 'This name is too long.';
    formValidity = false;
  }

  if (!requestData.email || typeof requestData.email !== 'string' ||
      requestData.email.trim().length === 0 ||
      requestData.email.trim().length > 254 ||
      requestData.email.trim().length < 3) {
    errors.email = 'The E-mail should have 3 to 254 characters.';
    formValidity = false;
  }

  if (requestData.phoneNumber && (requestData.phoneNumber.length > 20)) {
    errors.phoneNumber = 'This phone number is too long.';
    formValidity = false;
  }

  if (!requestData.country || typeof requestData.country !== 'string') {
    errors.country = 'This isn\'t a valid country name.';
    formValidity = false;
  } else if (requestData.country.trim().length === 0) {
    errors.country = 'This field cannot be empty.';
    formValidity = false;
  } else if (requestData.country.trim().length > 64) {
    errors.country = 'This name is too long.';
    formValidity = false;
  }

  if (!requestData.stateOrCounty ||
      typeof requestData.stateOrCounty !== 'string') {
    errors.stateOrCounty = 'This isn\'t a valid state or county name.';
    formValidity = false;
  } else if (requestData.stateOrCounty.trim().length === 0) {
    errors.stateOrCounty = 'This field cannot be empty.';
    formValidity = false;
  } else if (requestData.stateOrCounty.trim().length > 64) {
    errors.stateOrCounty = 'This name is too long.';
    formValidity = false;
  }

  if (!requestData.townOrCity || typeof requestData.townOrCity !== 'string') {
    errors.townOrCity = 'This isn\'t a valid town or city name.';
    formValidity = false;
  } else if (requestData.townOrCity.trim().length === 0) {
    errors.townOrCity = 'This field cannot be empty.';
    formValidity = false;
  } else if (requestData.townOrCity.trim().length > 64) {
    errors.townOrCity = 'This name is too long.';
    formValidity = false;
  }

  if (!requestData.postcodeOrZIP ||
      typeof requestData.postcodeOrZIP !== 'string') {
    errors.postcodeOrZIP = 'This isn\'t a valid postcode or ZIP.';
    formValidity = false;
  } else if (requestData.postcodeOrZIP.trim().length === 0) {
    errors.postcodeOrZIP = 'This field cannot be empty.';
    formValidity = false;
  } else if (requestData.postcodeOrZIP.trim().length > 16) {
    errors.postcodeOrZIP = 'This name is too long.';
    formValidity = false;
  }

  if (requestData.orderNotes && requestData.orderNotes.trim().length > 1000) {
    errors.orderNotes = 'This field is too long.';
    formValidity = false;
  }

  if (JSON.parse(requestData.orderedProducts).length === 0) {
    errors.orderedProducts = 'Please first add something to your shopping cart.';
    formValidity = false;
  } else if (JSON.parse(requestData.orderedProducts).length > 50) {
    errors.orderedProducts = 'Please limit to 50 stacks of goods per order.';
    formValidity = false;
  }

  if (formValidity === false)
    message = 'Please check the errors and try again.';

  req.body = {
    ...req.body,
    message: message,
    errors: errors,
    success: formValidity,
  };
  return next();
};