"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
/* eslint-disable react-native/no-inline-styles */

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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.notification, {
      backgroundColor: 'steelblue' // You can replace this with a dynamic value if needed
    }],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.backgroundContainer,
      children: backgroundImageURL && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
        source: {
          uri: backgroundImageURL
        },
        style: styles.backgroundImage,
        resizeMode: "stretch"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.foreground,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        onPress: onClose,
        style: styles.closeButton,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [styles.closeIcon, {
            color: crossButtonColor
          }],
          children: "\xD7"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.buttonContainer,
        children: [primaryButtonSwitch && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
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
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: {
              color: primaryButtonFontColor
            },
            children: primaryButtonText
          })
        }), secondaryButtonSwitch && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
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
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
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
const styles = _reactNative.StyleSheet.create({
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
var _default = exports.default = FullScreenView;
//# sourceMappingURL=FullScreenView.js.map