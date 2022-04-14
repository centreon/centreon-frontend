import '@testing-library/jest-dom/extend-expect';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const mockedMatchMedia = () => ({
  addListener: () => {},
  matches: false,
  removeListener: () => {},
});

window.matchMedia = window.matchMedia || mockedMatchMedia;

document.createRange = () => ({
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
  setEnd: () => {},
  setStart: () => {},
});

global.IntersectionObserver = class IntersectionObserver {
  observe() {
    this.a = '';

    return null;
  }

  disconnect() {
    this.a = '';

    return null;
  }
};

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  keySeparator: false,
  lng: 'en',
  nsSeparator: false,
  resources: {},
});
