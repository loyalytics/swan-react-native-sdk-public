"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Install with `npm install react-native-vector-icons`
const {
  width
} = _reactNative.Dimensions.get('window'); // Screen dimensions for responsive layout

const HeaderView = ({
  designConfig = {},
  onClose,
  onButtonClick
}) => {
  const {
    commId = '',
    themeBackgroundColor = '#f5f5f5',
    crossButtonColor = '#000',
    backgroundImageURL,
    iconURL,
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

  // Render Buttons
  const renderButton = (type, text, bgColor, fontColor, action, actionType, extraStyle) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
    style: [styles.button, {
      backgroundColor: bgColor
    }, extraStyle],
    onPress: () => {
      onButtonClick({
        type,
        event: 'clicked',
        action,
        actionType,
        commId
      });
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: [styles.buttonText, {
        color: fontColor
      }],
      numberOfLines: 1,
      children: text
    })
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.notification, {
      backgroundColor: themeBackgroundColor
    }],
    children: [backgroundImageURL && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
      source: {
        uri: backgroundImageURL
      },
      style: styles.background,
      resizeMode: "cover"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.foreground,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.content,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          style: styles.close,
          onPress: onClose,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MaterialIcons.default, {
            name: "close",
            size: 20,
            color: crossButtonColor
          })
        }), iconURL && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.iconContainer,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
            source: {
              uri: iconURL
            },
            style: styles.icon,
            resizeMode: "cover"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.textContainer,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.title, {
              color: titleColor
            }],
            numberOfLines: 1,
            children: title
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.description, {
              color: descriptionColor
            }],
            numberOfLines: 3,
            children: description
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.buttonContainer,
        children: [primaryButtonSwitch && renderButton('primary', primaryButtonText, primaryButtonColor, primaryButtonFontColor, primaryButtonAction, primaryButtonActionType, {
          marginRight: secondaryButtonSwitch ? 5 : 0
        }), secondaryButtonSwitch && renderButton('secondary', secondaryButtonText, secondaryButtonColor, secondaryButtonFontColor, secondaryButtonAction, secondaryButtonActionType, {})]
      })]
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
  notification: {
    overflow: 'hidden',
    position: 'absolute',
    flexDirection: 'column',
    width: width * 0.85,
    top: 50,
    left: width * 0.075,
    elevation: 5,
    // Shadow for Android
    shadowColor: '#000',
    // Shadow for iOS
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  background: {
    position: 'absolute',
    top: 0,
    zIndex: 0,
    width: '100%',
    height: 150
  },
  foreground: {
    zIndex: 1
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden'
  },
  icon: {
    width: '100%',
    height: '100%'
  },
  textContainer: {
    marginLeft: 10,
    flex: 1
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    overflow: 'hidden'
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
    overflow: 'hidden',
    marginTop: 3
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 10,
    marginBottom: 10
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500'
  }
});
var _default = exports.default = HeaderView;
//# sourceMappingURL=HeaderView.js.map