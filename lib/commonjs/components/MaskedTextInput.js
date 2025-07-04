"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaskedTextInputComponent = exports.MaskedTextInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _mask = require("../utils/mask");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const MaskedTextInputComponent = (_ref, ref) => {
  let {
    mask: pattern = '',
    type = 'custom',
    options = {},
    defaultValue,
    onChangeText,
    value,
    inputAccessoryView,
    autoCapitalize = 'sentences',
    textBold,
    textItalic,
    textDecoration,
    style,
    ...rest
  } = _ref;
  const styleSheet = [{
    fontWeight: textBold && 'bold',
    fontStyle: textItalic && 'italic',
    textDecorationLine: textDecoration
  }, style];

  const getMaskedValue = value => (0, _mask.mask)(value, pattern, type, options, autoCapitalize);

  const getUnMaskedValue = value => (0, _mask.unMask)(value, type);

  const defaultValueCustom = defaultValue || '';
  const defaultValueCurrency = defaultValue || '0';
  const initialRawValue = value;
  const initialMaskedValue = getMaskedValue(type === 'currency' ? defaultValueCurrency : defaultValueCustom);
  const initialUnMaskedValue = getUnMaskedValue(type === 'currency' ? defaultValueCurrency : defaultValueCustom);
  const [maskedValue, setMaskedValue] = (0, _react.useState)(initialMaskedValue);
  const [unMaskedValue, setUnmaskedValue] = (0, _react.useState)(initialUnMaskedValue);
  const [rawValue, setRawValue] = (0, _react.useState)(initialRawValue);
  const [isInitialRender, setIsInitialRender] = (0, _react.useState)(true);
  const actualValue = pattern || type === "currency" ? maskedValue : rawValue;

  function onChange(value) {
    let newUnMaskedValue = (0, _mask.unMask)(value, type);

    if (newUnMaskedValue === '7' || newUnMaskedValue === '8') {
      newUnMaskedValue = '7';
    } else if (newUnMaskedValue.length === 1) {
      newUnMaskedValue = '79';
    }

    const newMaskedValue = (0, _mask.mask)(newUnMaskedValue, pattern, type, options);
    setMaskedValue(newMaskedValue);
    setUnmaskedValue(newUnMaskedValue);
    setRawValue(value);
  }

  (0, _react.useEffect)(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    onChangeText(maskedValue, unMaskedValue);
  }, [maskedValue, unMaskedValue]);
  (0, _react.useEffect)(() => {
    if (value) {
      setMaskedValue(getMaskedValue(value));
      setUnmaskedValue(getUnMaskedValue(value));
    } else {
      setMaskedValue(initialMaskedValue);
      setUnmaskedValue(initialUnMaskedValue);
    }
  }, [value]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, _extends({
    onChangeText: value => onChange(value),
    ref: ref,
    maxLength: pattern.length || undefined,
    autoCapitalize: autoCapitalize
  }, rest, {
    value: actualValue,
    style: styleSheet
  })), inputAccessoryView);
};

exports.MaskedTextInputComponent = MaskedTextInputComponent;
const MaskedTextInput = /*#__PURE__*/(0, _react.forwardRef)(MaskedTextInputComponent);
exports.MaskedTextInput = MaskedTextInput;
//# sourceMappingURL=MaskedTextInput.js.map