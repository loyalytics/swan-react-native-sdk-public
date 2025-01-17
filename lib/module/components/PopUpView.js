"use strict";

/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PopUpView = ({
  designConfig,
  onClose,
  onButtonClick
}) => {
  const {
    commId = '',
    themeBackgroundColor = '#f5f5f5',
    crossButtonColor = '#000',
    imageURL,
    title = 'Title',
    titleColor = '#333',
    description = 'Description',
    descriptionColor = '#666',
    primaryButtonSwitch = true,
    primaryButtonColor = '#007BFF',
    primaryButtonFontColor = '#FFF',
    primaryButtonText = 'Primary Action',
    primaryButtonAction = '',
    primaryButtonActionType = '',
    secondaryButtonSwitch = true,
    secondaryButtonColor = '#6C757D',
    secondaryButtonFontColor = '#FFF',
    secondaryButtonText = 'Secondary Action',
    secondaryButtonAction = '',
    secondaryButtonActionType = ''
  } = designConfig;
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.notification, {
      backgroundColor: themeBackgroundColor
    }],
    children: [/*#__PURE__*/_jsx(Text, {
      style: [styles.close, {
        color: crossButtonColor
      }],
      onPress: onClose,
      children: "\xD7"
    }), imageURL && /*#__PURE__*/_jsx(View, {
      style: styles.imageContainer,
      children: /*#__PURE__*/_jsx(Image, {
        source: {
          uri: imageURL
        },
        style: styles.image,
        alt: "phone"
      })
    }), /*#__PURE__*/_jsx(Text, {
      style: [styles.title, {
        color: titleColor
      }],
      children: title || 'Title'
    }), /*#__PURE__*/_jsx(Text, {
      style: [styles.description, {
        color: descriptionColor
      }],
      children: description || 'Description'
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.buttonContainer,
      children: [primaryButtonSwitch && /*#__PURE__*/_jsx(TouchableOpacity, {
        style: [styles.button, styles.primaryButton, {
          backgroundColor: primaryButtonColor,
          width: primaryButtonSwitch ? '45%' : '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }],
        onPress: () => {
          onButtonClick({
            type: 'primary',
            event: 'clicked',
            action: primaryButtonAction,
            actionType: primaryButtonActionType,
            commId
          });
        },
        children: /*#__PURE__*/_jsx(Text, {
          style: {
            color: primaryButtonFontColor
          },
          children: primaryButtonText
        })
      }), secondaryButtonSwitch && /*#__PURE__*/_jsx(TouchableOpacity, {
        style: [styles.button, styles.secondaryButton, {
          backgroundColor: secondaryButtonColor,
          width: primaryButtonSwitch ? '45%' : '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }],
        onPress: () => {
          onButtonClick({
            type: 'secondary',
            event: 'clicked',
            action: secondaryButtonAction,
            actionType: secondaryButtonActionType,
            commId
          });
        },
        children: /*#__PURE__*/_jsx(Text, {
          style: {
            color: secondaryButtonFontColor
          },
          children: secondaryButtonText
        })
      })]
    })]
  });
};
const styles = StyleSheet.create({
  notification: {
    borderRadius: 2,
    overflow: 'hidden',
    padding: 16,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: 260,
    top: 210,
    left: 42.5
  },
  close: {
    position: 'absolute',
    right: 4,
    top: 3,
    fontSize: 18,
    fontWeight: 'bold'
  },
  imageContainer: {
    marginBottom: 8,
    width: '100%',
    height: 100
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  title: {
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
    width: 210,
    overflow: 'hidden',
    fontFamily: 'inherit'
  },
  description: {
    marginTop: 4,
    fontSize: 13,
    width: 210,
    textAlign: 'center',
    overflow: 'hidden',
    fontFamily: 'inherit',
    display: 'flex'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12
  },
  button: {
    borderWidth: 0,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    overflow: 'hidden',
    fontFamily: 'inherit'
  },
  primaryButton: {
    backgroundColor: 'transparent'
  },
  secondaryButton: {
    backgroundColor: 'transparent'
  }
});
export default PopUpView;
//# sourceMappingURL=PopUpView.js.map