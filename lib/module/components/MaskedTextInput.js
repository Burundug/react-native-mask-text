function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useState, forwardRef } from 'react';
import { TextInput } from 'react-native';
import { mask, unMask } from '../utils/mask';
export const MaskedTextInputComponent = (_ref, ref) => {
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

  const getMaskedValue = value => mask(value, pattern, type, options, autoCapitalize);

  const getUnMaskedValue = value => unMask(value, type);

  const defaultValueCustom = defaultValue || '';
  const defaultValueCurrency = defaultValue || '0';
  const initialRawValue = value;
  const initialMaskedValue = getMaskedValue(type === 'currency' ? defaultValueCurrency : defaultValueCustom);
  const initialUnMaskedValue = getUnMaskedValue(type === 'currency' ? defaultValueCurrency : defaultValueCustom);
  const [maskedValue, setMaskedValue] = useState(initialMaskedValue);
  const [unMaskedValue, setUnmaskedValue] = useState(initialUnMaskedValue);
  const [rawValue, setRawValue] = useState(initialRawValue);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const actualValue = pattern || type === "currency" ? maskedValue : rawValue;

  function onChange(value) {
    let newUnMaskedValue = unMask(value, type);

    if (newUnMaskedValue === '7' || newUnMaskedValue === '8') {
      newUnMaskedValue = '7';
    } else if (newUnMaskedValue.length === 1) {
      newUnMaskedValue = '79';
    }

    const newMaskedValue = mask(newUnMaskedValue, pattern, type, options);
    setMaskedValue(newMaskedValue);
    setUnmaskedValue(newUnMaskedValue);
    setRawValue(value);
  }

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    onChangeText(maskedValue, unMaskedValue);
  }, [maskedValue, unMaskedValue]);
  useEffect(() => {
    if (value) {
      setMaskedValue(getMaskedValue(value));
      setUnmaskedValue(getUnMaskedValue(value));
    } else {
      setMaskedValue(initialMaskedValue);
      setUnmaskedValue(initialUnMaskedValue);
    }
  }, [value]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TextInput, _extends({
    onChangeText: value => onChange(value),
    ref: ref,
    maxLength: pattern.length || undefined,
    autoCapitalize: autoCapitalize
  }, rest, {
    value: actualValue,
    style: styleSheet
  })), inputAccessoryView);
};
export const MaskedTextInput = /*#__PURE__*/forwardRef(MaskedTextInputComponent);
//# sourceMappingURL=MaskedTextInput.js.map