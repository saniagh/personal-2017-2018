export default class Auth {
  static getToken() {
    return localStorage.getItem('token');
  }

  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('products');
    localStorage.removeItem('cartLastModified');
  }

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  };
}
