module.exports = (req, res, next) => {
  const errors = {};
  let message = '';
  let formValidity = true;
  const requestData = req.body;

  if (!requestData || typeof requestData.searchTerm !== 'string' ||
      requestData.searchTerm.trim().length === 0 ||
      requestData.searchTerm.trim().length > 64) {
    formValidity = false;
    errors.searchTerm = 'Doesn\'t exist or too long.';
  }

  if (!formValidity)
    message = 'Please check the errors and try again.';

  req.body = {
    ...req.body,
    errors,
    message,
    success: formValidity,
  };
  return next();
};