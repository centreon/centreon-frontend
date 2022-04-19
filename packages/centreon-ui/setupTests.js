import '@testing-library/jest-dom/extend-expect';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

registerRequireContextHook();

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

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  keySeparator: false,
  lng: 'en',
  nsSeparator: false,
  resources: {},
});
