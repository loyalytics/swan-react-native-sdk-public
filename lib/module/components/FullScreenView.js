"use strict";

/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const FullScreenView = ({
  designConfig,
  onClose,
  onButtonClick
}) => {
  const {
    commId = '',
    backgroundImageURL,
    crossButtonColor,
    primaryButtonColor,
    primaryButtonFontColor,
    primaryButtonSwitch,
    primaryButtonText,
    primaryButtonAction = '',
    primaryButtonActionType = '',
    secondaryButtonColor,
    secondaryButtonFontColor,
    secondaryButtonSwitch,
    secondaryButtonText,
    secondaryButtonAction = '',
    secondaryButtonActionType = ''
  } = designConfig;
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.notification, {
      backgroundColor: 'steelblue' // You can replace this with a dynamic value if needed
    }],
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.backgroundContainer,
      children: backgroundImageURL && /*#__PURE__*/_jsx(Image, {
        source: {
          uri: backgroundImageURL
        },
        style: styles.backgroundImage,
        resizeMode: "stretch"
      })
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.foreground,
      children: [/*#__PURE__*/_jsx(TouchableOpacity, {
        onPress: onClose,
        style: styles.closeButton,
        children: /*#__PURE__*/_jsx(Text, {
          style: [styles.closeIcon, {
            color: crossButtonColor
          }],
          children: "\xD7"
        })
      }), /*#__PURE__*/_jsxs(View, {
        style: styles.buttonContainer,
        children: [primaryButtonSwitch && /*#__PURE__*/_jsx(TouchableOpacity, {
          onPress: () => {
            onButtonClick({
              type: 'primary',
              event: 'clicked',
              action: primaryButtonAction,
              actionType: primaryButtonActionType,
              commId
            });
          },
          style: [styles.button, {
            backgroundColor: primaryButtonColor,
            marginRight: secondaryButtonSwitch ? 15 : 0
          }],
          children: /*#__PURE__*/_jsx(Text, {
            style: {
              color: primaryButtonFontColor
            },
            children: primaryButtonText
          })
        }), secondaryButtonSwitch && /*#__PURE__*/_jsx(TouchableOpacity, {
          onPress: () => {
            onButtonClick({
              type: 'secondary',
              event: 'clicked',
              action: secondaryButtonAction,
              actionType: secondaryButtonActionType,
              commId
            });
          },
          style: [styles.button, {
            backgroundColor: secondaryButtonColor
          }],
          children: /*#__PURE__*/_jsx(Text, {
            style: {
              color: secondaryButtonFontColor
            },
            children: secondaryButtonText
          })
        })]
      })]
    })]
  });
};
const styles = StyleSheet.create({
  notification: {
    borderRadius: 10,
    overflow: 'hidden',
    position: 'absolute',
    flexDirection: 'column',
    width: '90%',
    top: '5%',
    // Approx. 2.5% from the top
    height: '92%',
    backgroundColor: 'steelblue' // Can be customized if necessary
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 0,
    width: '100%',
    height: '100%'
  },
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
  placeholderImage: {
    height: 50,
    // Approx. 5rem
    width: 50,
    // Approx. 5rem
    transform: [{
      translateX: 130
    }, {
      translateY: 250
    }] // Approx. (13rem, 25rem)
  },
  foreground: {
    zIndex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  closeIcon: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '5%',
    // Approx. 89% from the top
    left: '5%',
    width: '90%',
    justifyContent: 'space-between'
  },
  button: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default FullScreenView;
//# sourceMappingURL=FullScreenView.js.map