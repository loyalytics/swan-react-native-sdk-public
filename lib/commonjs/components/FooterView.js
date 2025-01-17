"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
const {
  width: screenWidth,
  height: screenHeight
} = _reactNative.Dimensions.get('window');
const FooterNotification = ({
  designConfig,
  onClose,
  onButtonClick
}) => {
  const {
    commId = '',
    themeBackgroundColor = '#ffffff',
    crossButtonColor = '#000000',
    iconURL = null,
    descriptionColor = '#000000',
    description = 'Default description.',
    onClickAction,
    onClickActionType
  } = designConfig;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
    style: [styles.notification, {
      backgroundColor: themeBackgroundColor
    }],
    onPress: () => {
      onButtonClick({
        type: 'primary',
        event: 'clicked',
        action: onClickAction,
        actionType: onClickActionType,
        commId
      });
    },
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
      style: styles.content,
      children: [iconURL && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.iconContainer,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
          source: {
            uri: iconURL
          },
          style: styles.icon,
          resizeMode: "cover"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.description, {
          color: descriptionColor
        }],
        numberOfLines: 3,
        children: description
      })]
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
  notification: {
    position: 'absolute',
    bottom: screenHeight * 0.05,
    // Positioned 5% from the bottom of the screen
    left: screenWidth * 0.05,
    // Centered with 5% padding on each side
    width: screenWidth * 0.9,
    // 90% of screen width
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4
  },
  closeButton: {
    position: 'absolute',
    right: 4
  },
  closeIcon: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    width: 48,
    // Fixed size for icon
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  icon: {
    width: '100%',
    height: '100%'
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
    flex: 1,
    textAlign: 'left'
  }
});
var _default = exports.default = FooterNotification;
//# sourceMappingURL=FooterView.js.map