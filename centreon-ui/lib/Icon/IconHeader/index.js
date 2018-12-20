'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./icon-header.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconHeader = function IconHeader(_ref) {
  var iconType = _ref.iconType,
      iconName = _ref.iconName,
      style = _ref.style;

  return _react2.default.createElement(
    'span',
    { 'class': 'icons-wrap', style: style },
    _react2.default.createElement('span', { 'class': 'iconmoon icon-' + iconType }),
    _react2.default.createElement(
      'span',
      { 'class': 'icon__name' },
      iconName
    )
  );
};

exports.default = IconHeader;