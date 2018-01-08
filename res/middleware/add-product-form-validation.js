module.exports = (req, res, next) => {
  let message = '';
  let errors = {};
  let formValidity = true;
  const requestData = req.body;

  if (!requestData || typeof requestData.productName !== 'string') {
    errors.productName = 'This isn\'t a valid name for a product.';
    formValidity = false;
  } else if (requestData.productName.trim().length === 0) {
    errors.productName = 'This field cannot be empty.';
    formValidity = false;
  }

  if (!requestData || typeof requestData.productLink !== 'string') {
    errors.productLink = 'This isn\'t a valid permalink for the product.';
    formValidity = false;
  } else if (requestData.productLink.trim().length === 0) {
    errors.productLink = 'This field cannot be empty.';
    formValidity = false;
  }

  if (!requestData || typeof requestData.productDescription !== 'string') {
    errors.productDescription = 'This isn\'t a valid description for the product.';
    formValidity = false;
  }

  if (!requestData || typeof requestData.productThumbnail !== 'string') {
    errors.productThumbnail = 'This isn\'t a valid link for a thumbnail.';
    formValidity = false;
  }

  if (!requestData || typeof requestData.sku !== 'string') {
    errors.sku = 'This isn\'t a valid Stock Keeping Unit string.';
    formValidity = false;
  }

  if (!requestData || typeof requestData.productPrice !== 'string') {
    errors.productPrice = 'This isn\'t a valid price for the product.';
    formValidity = false;
  }

  if (!requestData || typeof requestData.salePrice !== 'string') {
    errors.salePrice = 'This isn\'t a valid sale price for the product.';
    formValidity = false;
  }

  if (!requestData || typeof requestData.upSellLink !== 'string') {
    errors.upSellLink = 'This isn\'t a valid up-sell link.';
    formValidity = false;
  }

  if (!requestData || typeof requestData.crossSellLink !== 'string') {
    errors.crossSellLink = 'This isn\'t a valid cross-sell link.';
    formValidity = false;
  }

  if (formValidity === false)
    message = 'Something went wrong.';

  req.body = {
    ...req.body,
    message: message,
    errors: errors,
    success: formValidity,
  };
  return next();
};
