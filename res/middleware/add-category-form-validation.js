module.exports = (req, res, next) => {
  let message = '';
  let errors = {};
  let formValidity = true;
  const requestData = req.body;

  if (!requestData || typeof requestData.categoryName !== 'string') {
    errors.categoryName = 'This isn\'t a a valid name for a category.';
    formValidity = false;
  } else if (requestData.categoryName.trim().length === 0) {
    errors.categoryName = 'This field cannot be empty.';
    formValidity = false;
  } else if (requestData.categoryName.trim().length > 64) {
    errors.categoryName = 'This name is too long.';
    formValidity = false;
  }

  if (!requestData || typeof requestData.categoryDescriptor !== 'string') {
    errors.categoryDescriptor = 'This isn\'t a valid descriptor.';
    formValidity = false;
  } else if (requestData.categoryDescriptor.trim().length === 0) {
    errors.categoryDescriptor = 'This field cannot be empty.';
    formValidity = false;
  } else if (requestData.categoryDescriptor.trim().length > 64) {
    errors.categoryDescriptor = 'This descriptor is too long.';
  }

  if (!requestData || typeof requestData.categoryParent !== 'string') {
    errors.categoryParent = 'This isn\'t a valid name for a parent.';
    formValidity = false;
  }

  if ((!requestData || typeof requestData.categoryDescription !== 'string') &&
      requestData.categoryDescription) {
    errors.categoryDescription = 'This isn\'t a valid description.';
    formValidity = false;
  } else if (requestData.categoryDescription.trim().length > 256) {
    errors.categoryDescription = 'This description is too long.';
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
