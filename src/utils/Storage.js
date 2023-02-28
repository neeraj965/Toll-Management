export class Storage {
  static getValueFromLS(name) {
    return localStorage?.getItem(name);
  }

  static setValueToLS(name, value) {
    return localStorage.setItem(name, value);
  }

  static removeValueFromLS(name) {
    return localStorage?.removeItem(name);
  }
}
