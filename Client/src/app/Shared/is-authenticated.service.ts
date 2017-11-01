import { Injectable } from '@angular/core';

@Injectable()
export class IsAuthenticatedService {

  constructor() { }

  isUserAuthenticated () {
    if (window.sessionStorage.getItem('isAuthenticated')) {
      if (window.sessionStorage.getItem('isAuthenticated')  === 'true') {
        if (window.sessionStorage.getItem('userLevel')) {
          if (window.sessionStorage.getItem('userLevel') === '1') {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isAdminAuthenticated () {
    if (window.sessionStorage.getItem('isAuthenticated')) {
      if (window.sessionStorage.getItem('isAuthenticated')  === 'true') {
        if (window.sessionStorage.getItem('userLevel')) {
          if (window.sessionStorage.getItem('userLevel') === '0') {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  authenticateUser () {
    window.sessionStorage.setItem('isAuthenticated', 'true');
    window.sessionStorage.setItem('userLevel', '1');
  }

  authenticateAdmin () {
    window.sessionStorage.setItem('isAuthenticated', 'true');
    window.sessionStorage.setItem('userLevel', '0');
  }

  unAuthenticate () {
    window.sessionStorage.setItem('isAuthenticated', 'false');
    window.sessionStorage.setItem('userLevel', '-1');
  }

  ifAuthenticated () {
    if (window.sessionStorage.getItem('isAuthenticated')) {
      if (window.sessionStorage.getItem('isAuthenticated')  === 'true') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  clearStorage () {
    window.sessionStorage.clear();
  }

}