"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
var _reactNativeBase = _interopRequireDefault(require("react-native-base64"));
var _reactNative = require("react-native");
var _reactNativeUuid = _interopRequireDefault(require("react-native-uuid"));
var _PopUpView = _interopRequireDefault(require("./components/PopUpView.js"));
var _HeaderView = _interopRequireDefault(require("./components/HeaderView.js"));
var _FooterView = _interopRequireDefault(require("./components/FooterView.js"));
var _FullScreenView = _interopRequireDefault(require("./components/FullScreenView.js"));
var _react = require("react");
var _reactNativeSqlite = _interopRequireDefault(require("react-native-sqlite-2"));
var _reactNativeDeviceInfo = _interopRequireDefault(require("react-native-device-info"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ECOM_EVENTS = Object.freeze({
  USER_LOGOUT: 'userLogout',
  USER_LOGIN: 'userLogin',
  FORGOT_PASSWORD: 'forgotPassword',
  SEARCH: 'search',
  PRODUCT_VIEWED: 'productViewed',
  PRODUCT_CLICKED: 'productClicked',
  PRODUCT_LIST_VIEWED: 'productListViewed',
  PRODUCT_ADDED_TO_ADD_TO_CART: 'productAddedToaddTocart',
  PRODUCT_REMOVED_FROM_ADD_TO_CART: 'productRemovedFromAddToCart',
  CLEAR_CART: 'clearCart',
  SELECT_CATEGORY: 'selectCategory',
  CATEGORY_VIEWED_PAGE: 'categoryViewedPage',
  PRODUCT_ADDED_TO_WISHLIST: 'productAddedToWishlist',
  PRODUCT_REMOVED_FROM_WISHLIST: 'productRemovedFromWishlist',
  PRODUCT_RATED_OR_REVIEWED: 'productRatedOrReviewed',
  CART_VIEWED: 'cartViewed',
  OFFER_AVAILED: 'offerAvailed',
  CHECKOUT_STARTED: 'checkoutStarted',
  CHECKOUT_COMPLETED: 'checkoutCompleted',
  CHECKOUT_CANCELED: 'checkoutCanceled',
  PAYMENT_INFO_ENTERED: 'paymentInfoEntered',
  ORDER_COMPLETED: 'orderCompleted',
  ORDER_REFUNDED: 'orderRefunded',
  ORDER_CANCELLED: 'orderCancelled',
  ORDER_EXPERIANCE_RATING: 'orderExperianceRating',
  PRODUCT_REVIEW: 'productReview',
  PURCHASED: 'purchased',
  APP_UPDATED: 'appUpdated',
  ACCOUNT_DELETION: 'accountDeletion',
  SHARE: 'share',
  SCREEN: 'screen',
  WISHLIST_PRODUCT_ADDED_TO_CART: 'wishlistProductAddedToCart',
  SHIPPED: 'shipped',
  PRODUCT_QUANTITY_SELECTED: 'productQuantitySelected'
});
class SwanSDK {
  appId = '';
  deviceId = '';
  // QA URLs
  webSDKUrl = 'https://qa-web-sdk.azurewebsites.net/api';
  ecomSDKUrl = 'https://e-commerce.azurefd.net/api';

  // Production URLs
  // private webSDKUrl: string = 'https://connect.swan.cx/events/sdk';
  // private ecomSDKUrl: string = 'https://click.swan.cx/api';

  ecomEventUrl = `${this.ecomSDKUrl}/trackEvent`;
  ecomDeviceUrl = `${this.ecomSDKUrl}/device`;
  notificationAckUrl = `${this.webSDKUrl}/post-in-app-notification-sdk-ack`;
  static modalInstances = [];
  currentScreenName = '';
  country = '';
  currency = '';
  businessUnit = '';
  deviceModel = '';
  deviceBrand = '';
  static styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      // Semi-transparent background
      justifyContent: 'center',
      // Vertically center
      alignItems: 'center' // Horizontally center
    },
    popUpModalContent: {
      flex: 1,
      width: '85%',
      marginTop: '15%',
      alignItems: 'center',
      justifyContent: 'center' // Center the popup content within the modal
    },
    headerModalContent: {
      flex: 1,
      width: '100%',
      marginTop: '5%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    footerModalContent: {
      flex: 1,
      width: '100%',
      marginTop: '5%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    fullScreenModalContent: {
      flex: 1,
      width: '100%',
      marginTop: '5%',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
  constructor(appId) {
    if (SwanSDK.instance) {
      return SwanSDK.instance; // Return the existing instance
    }
    this.appId = appId;
    this.deviceId = '';
    this.notificationToShow = null;
    this.currentScreenName = '';
    this.country = '';
    this.currency = '';
    this.businessUnit = '';
    this.deviceBrand = '';
    this.deviceModel = '';

    // Attempt to initialize database
    this.initializeDatabase();
    SwanSDK.instance = this;
  }
  static getInstance(appId) {
    if (!SwanSDK.instance) {
      SwanSDK.instance = new SwanSDK(appId); // Call the constructor to create the instance
    }
    return SwanSDK.instance;
  }
  buttonClickHandler = null;
  setButtonClickHandler(handler) {
    this.buttonClickHandler = handler;
  }
  notifyButtonClick(event) {
    this.buttonClickHandler?.(event);
    this.sendNotificationAck(event.commId, event.event);
  }
  notificationShowHandler = null;
  async setNotificationShowHandler(handler) {
    this.notificationShowHandler = handler;
    this.getNotificationComponent();
  }
  notifyNotificationShow(notification) {
    this.notificationShowHandler?.(notification);
  }
  async initializeDatabase() {
    try {
      this.db = _reactNativeSqlite.default.openDatabase('test.db', '1.0', '', 1);
      // Create tables after successful database open
      await this.createTable('Notifications');
      return this.db;
    } catch (error) {
      console.error('Detailed Database Initialization Error:', error);
    }
  }
  createTable(tableName) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject(new Error('Database not initialized'));
      }
      try {
        this.db.transaction(function (txn) {
          txn.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} (` + 'commId TEXT PRIMARY KEY, ' + 'content TEXT)', [], function () {
            resolve(); // Resolve the promise on successful table creation
          }, function (_, error) {
            console.error('Table creation error:', error);
            reject(error); // Reject the promise on SQL execution error
          });
        });
      } catch (error) {
        console.error('Table creation error:', error);
        reject(error); // Reject the promise on general error
      }
    });
  }

  // Ensure database is ready before operations
  async ensureDatabaseReady() {
    if (!this.db) {
      console.log('Database not initialized, attempting to initialize...');
      await this.initializeDatabase();
    }
    return this.db;
  }

  //Insert notification into the table
  async insertNotification(notification, tableName) {
    return new Promise(async (resolve, reject) => {
      const {
        commId,
        ...content
      } = notification; // Extract `commId` and content

      try {
        await this.ensureDatabaseReady();
        this.db.transaction(function (txn) {
          txn.executeSql(`INSERT OR REPLACE INTO ${tableName} (commId, content) VALUES (?, ?);`, [commId, JSON.stringify(content)], function () {
            resolve(); // Resolve the promise on successful insertion
          }, function (_, error) {
            console.error('Error executing SQL:', error);
            reject(error); // Reject the promise on SQL execution error
          });
        });
      } catch (error) {
        console.error('Error inserting notification:', error);
        reject(error); // Reject the promise on general error
      }
    });
  }

  //Fetch all notifications
  async selectAllFromTable(tableName) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.ensureDatabaseReady();
        let rows = [];
        this.db.transaction(function (txn) {
          txn.executeSql(`SELECT * FROM ${tableName};`, [], function (_, res) {
            for (let i = 0; i < res.rows.length; ++i) {
              rows.push(res.rows.item(i));
            }
            resolve(rows); // Resolve the promise with the collected rows
          }, function (_, error) {
            console.error('Error executing SQL:', error);
            reject(error); // Reject the promise on SQL execution error
          });
        });
      } catch (error) {
        console.error('Error fetching notifications:', error);
        reject(error); // Reject the promise on general error
      }
    });
  }

  //Delete notification by commId
  async deleteFromTableByValue(tableName, key, value) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.ensureDatabaseReady();
        this.db.transaction(function (txn) {
          txn.executeSql(`DELETE FROM ${tableName} WHERE ${key} = ?;`, [value], function () {
            resolve(); // Resolve the promise on successful deletion
          }, function (_, error) {
            console.error('Error executing SQL:', error);
            reject(error); // Reject the promise on SQL execution error
          });
        });
      } catch (error) {
        console.error('Error deleting record:', error);
        reject(error); // Reject the promise on general error
      }
    });
  }
  deleteAllFromTable(tableName) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.ensureDatabaseReady();
        this.db.transaction(function (txn) {
          txn.executeSql(`DELETE FROM ${tableName};`, [], function () {
            resolve(); // Resolve the promise on successful deletion
          }, function (_, error) {
            console.error('Error executing SQL:', error);
            reject(error); // Reject the promise on SQL execution error
          });
        });
      } catch (error) {
        console.error('Error deleting all records:', error);
        reject(error); // Reject the promise on general error
      }
    });
  }
  lzw64_encode(s) {
    if (!s) return s;
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    var d = new Map();
    var s = unescape(encodeURIComponent(s)).split('');
    var word = s[0];
    var num = 256;
    var key;
    var o = [];
    function out(word) {
      key = word.length > 1 ? d.get(word) : word.charCodeAt(0);
      o.push(b64[key & 0x3f]);
      o.push(b64[key >> 6 & 0x3f]);
      o.push(b64[key >> 12 & 0x3f]);
    }
    for (var i = 1; i < s.length; i++) {
      var c = s[i];
      if (d.has(word + c)) {
        word += c;
      } else {
        d.set(word + c, num++);
        out(word);
        word = c;
        if (num == (1 << 18) - 1) {
          d.clear();
          num = 256;
        }
      }
    }
    out(word);
    return o.join('');
  }
  setCurrentScreenName(screenName) {
    this.currentScreenName = screenName;
  }
  setCountry(country) {
    this.country = country;
  }
  setCurrency(currency) {
    this.currency = currency;
  }
  setBusinessUnit(businessUnit) {
    this.businessUnit = businessUnit;
  }
  static generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
  async sendToSwan(url, data, encode = false) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Swan-Device-Id': encode ? this.lzw64_encode(this.deviceId) : this.deviceId
        },
        body: encode ? this.lzw64_encode(JSON.stringify(data)) : JSON.stringify(data)
      });
      let responseData = null;
      try {
        responseData = await response.json();
      } catch (err) {}
      return responseData;
    } catch (error) {
      console.error('Error sending data to Swan:', error);
    }
  }

  // Function to get device ID
  async getDeviceId(pushNotificationToken) {
    try {
      // Check if the device ID is already present in memory
      if (this.deviceId) return this.deviceId;

      // Check if the device ID is already stored in AsyncStorage
      const encodedCredentials = await _asyncStorage.default.getItem('swanCredentials');
      if (encodedCredentials) {
        const decodedCredentials = JSON.parse(_reactNativeBase.default.decode(encodedCredentials));
        this.deviceId = decodedCredentials.deviceId;
        return this.deviceId;
      }

      // Otherwise, generate a new device ID and store it in AsyncStorage
      const deviceId = await this.linkDevice();
      if (!deviceId) return '';

      // Save the device ID in memory
      this.deviceId = deviceId;

      // Save the device ID in AsyncStorage
      const userDetails = {
        appId: this.appId,
        deviceActivatedAt: new Date().toISOString(),
        deviceId,
        pushNotificationToken
      };
      const encodedUserDetails = _reactNativeBase.default.encode(JSON.stringify(userDetails));
      await _asyncStorage.default.setItem('swanCredentials', encodedUserDetails);
      return deviceId;
    } catch (error) {
      console.log('Error in getDeviceId', error);
    }
  }

  // Helper function to register the device and get device ID
  async linkDevice() {
    try {
      const response = await this.sendToSwan(`${this.ecomDeviceUrl}/register?appId=${this.appId}`, {}, true);
      return response.deviceId || '';
    } catch (error) {
      console.error('Error registering device:', error);
      return '';
    }
  }
  async setPushNotificationPermission(permission) {
    try {
      // Check if the device ID is already stored in AsyncStorage
      const encodedCredentials = await _asyncStorage.default.getItem('swanCredentials');
      if (!encodedCredentials) {
        console.log('Credentials not found, retrying in 2 minutes...');
        setTimeout(() => this.setPushNotificationPermission(permission), 2 * 60 * 1000);
        return;
      }
      let decodedCredentials = JSON.parse(_reactNativeBase.default.decode(encodedCredentials));
      if (!decodedCredentials.pushPermission || decodedCredentials.pushPermission !== permission) {
        await this.sendToSwan(`${this.ecomDeviceUrl}/push-subscription?appId=${this.appId}`, {
          subscription: permission ? {
            pushNotificationToken: permission ? decodedCredentials.pushNotificationToken : '',
            subscribed: permission,
            lastLoginPlatform: _reactNative.Platform.OS
          } : null,
          status: permission ? 'updated' : 'revoked',
          subscribedAt: permission ? new Date().toISOString() : null,
          unSubscribedAt: !permission ? new Date().toISOString() : null,
          linkedAt: decodedCredentials.linkedAt || null,
          CDID: decodedCredentials.credentials || null,
          device: 'mobile'
        }, true);

        // Update the credentials with the new CDID
        decodedCredentials = {
          ...decodedCredentials,
          pushPermission: permission,
          subscribedAt: permission ? new Date().toISOString() : null,
          unSubscribedAt: !permission ? new Date().toISOString() : null
        };

        // Encode and store the updated credentials in AsyncStorage
        const encodedUserDetails = _reactNativeBase.default.encode(JSON.stringify(decodedCredentials));
        await _asyncStorage.default.setItem('swanCredentials', encodedUserDetails);
      }
    } catch (error) {
      console.log('Error in setPushNotificationPermission', error);
    }
  }
  async registerDevice(pushNotificationToken) {
    this.getDeviceId(pushNotificationToken);
  }
  async identify(cdid) {
    try {
      if (!cdid) return;

      // Retrieve existing credentials from AsyncStorage
      const encodedCredentials = await _asyncStorage.default.getItem('swanCredentials');
      if (!encodedCredentials) return;

      // Decode the credentials if they exist
      let decodedCredentials = JSON.parse(_reactNativeBase.default.decode(encodedCredentials || ''));

      // If the stored CDID matches the given CDID, no need to update
      if (decodedCredentials.credentials === cdid) return;

      // Send the CDID to the server
      const url = `${this.ecomDeviceUrl}/identify?appId=${this.appId}`;
      const data = {
        CDID: cdid,
        linkedAt: new Date().toISOString(),
        subscribedAt: decodedCredentials.subscribedAt || null,
        unSubscribedAt: decodedCredentials.unSubscribedAt || null,
        subscription: decodedCredentials.pushPermission ? {
          pushNotificationToken: decodedCredentials.pushNotificationToken,
          subscribed: decodedCredentials.pushPermission,
          lastLoginPlatform: _reactNative.Platform.OS
        } : null,
        status: decodedCredentials.pushPermission !== undefined ? decodedCredentials.pushPermission ? 'updated' : 'revoked' : null,
        device: 'mobile'
      };
      await this.sendToSwan(url, data, true);

      // Update the credentials with the new CDID
      decodedCredentials = {
        ...decodedCredentials,
        credentials: cdid,
        linkedAt: new Date().toISOString()
      };

      // Encode and store the updated credentials in AsyncStorage
      const encodedUserDetails = _reactNativeBase.default.encode(JSON.stringify(decodedCredentials));
      await _asyncStorage.default.setItem('swanCredentials', encodedUserDetails);
    } catch (error) {
      console.error('Error in identify function:', error);
    }
  }
  async unlinkDevice() {
    try {
      await this.deleteAllFromTable('Notifications');
      // Retrieve the stored credentials
      const encodedCredentials = await _asyncStorage.default.getItem('swanCredentials');
      if (!encodedCredentials) return;
      let decodedCredentials = JSON.parse(_reactNativeBase.default.decode(encodedCredentials));

      // Check if the credentials exist
      if (!decodedCredentials.credentials) {
        console.log('No valid credentials to unlink.');
        return;
      }

      // Build the unlink URL
      const url = `${this.ecomDeviceUrl}/unlink?appId=${this.appId}`;
      await this.sendToSwan(url, {
        unlinkedAt: new Date().toISOString()
      }, true);
      decodedCredentials = {
        ...decodedCredentials,
        credentials: null
      };

      // Encode and store the updated credentials in AsyncStorage
      const encodedUserDetails = _reactNativeBase.default.encode(JSON.stringify(decodedCredentials));
      await _asyncStorage.default.setItem('swanCredentials', encodedUserDetails);
      await _asyncStorage.default.removeItem('_swanSessionId');
    } catch (error) {
      console.error('Error in unlinkDevice function:', error);
    }
  }
  async getSessionId() {
    try {
      // Retrieve the session from AsyncStorage
      const sessionBase64 = await _asyncStorage.default.getItem('_swanSessionId');
      if (sessionBase64) {
        const sessionDoc = JSON.parse(_reactNativeBase.default.decode(sessionBase64));
        const lastActiveTime = new Date(sessionDoc.lastActiveTime).getTime();
        const currentDate = new Date();
        const currentTime = currentDate.getTime();
        const sessionDuration = 30 * 60 * 1000; // 30 minutes in milliseconds

        // Check if the session is still active
        if (currentTime - lastActiveTime < sessionDuration) {
          // Update last active time and save the session back
          sessionDoc.lastActiveTime = currentDate.toISOString();
          const updatedSessionDocBase64 = _reactNativeBase.default.encode(JSON.stringify(sessionDoc));
          await _asyncStorage.default.setItem('_swanSessionId', updatedSessionDocBase64);
          return sessionDoc.sessionId;
        }
      }

      // Create a new session if no valid session exists
      const newSessionDoc = {
        sessionId: _reactNativeUuid.default.v4(),
        // Use UUID for session ID
        lastActiveTime: new Date().toISOString()
      };
      const newSessionDocBase64 = _reactNativeBase.default.encode(JSON.stringify(newSessionDoc));
      await _asyncStorage.default.setItem('_swanSessionId', newSessionDocBase64);
      return newSessionDoc.sessionId;
    } catch (error) {
      console.error('Error in getSessionId:', error);
      return null; // Return null in case of error
    }
  }
  async trackEvent(eventName, eventData) {
    try {
      let cdid = '';

      // Retrieve 'swanCredentials' from AsyncStorage
      const encodedCredentials = await _asyncStorage.default.getItem('swanCredentials');
      if (!encodedCredentials) return;
      const decodedCredentials = JSON.parse(_reactNativeBase.default.decode(encodedCredentials)); // Decode and parse Base64
      cdid = decodedCredentials.credentials || null;

      // Construct the payload for the ecom event
      const payload = {
        userId: eventData.cdid || cdid,
        name: eventName,
        data: eventData
      };
      if (!this.deviceModel || !this.deviceBrand) {
        this.deviceModel = _reactNativeDeviceInfo.default.getModel();
        this.deviceBrand = _reactNativeDeviceInfo.default.getBrand();
      }

      // Adding additional sessionId to the payload
      payload.data.platform = 'mobile';
      payload.data.osModal = _reactNative.Platform.OS;
      payload.data.deviceModal = this.deviceModel;
      payload.data.deviceBrand = this.deviceBrand;
      payload.data.country = this.country;
      payload.data.currency = this.currency;
      payload.data.businessUnit = this.businessUnit;
      payload.data.deviceId = this.deviceId;
      payload.data.sessionId = await this.getSessionId();

      // Send the event to Swan
      const response = await this.sendToSwan(`${this.ecomEventUrl}?appId=${this.appId}`, payload, true);
      return response;
    } catch (error) {
      console.error('Error in trackEvent:', error);
    }
  }

  /**
   * @param { { success: boolean } } data
   */
  forgotPassword(data) {
    this.trackEvent(ECOM_EVENTS.FORGOT_PASSWORD, data);
  }
  /**
   * @param { { searchKeyword: string } } data
   */
  search(data) {
    this.trackEvent(ECOM_EVENTS.SEARCH, data);
  }
  /**
   * @param { { productId: string } } data
   */
  productViewed(data) {
    this.trackEvent(ECOM_EVENTS.PRODUCT_VIEWED, data);
  }
  /**
   * @param { { productId: string } } data
   */
  productClicked(data) {
    this.trackEvent(ECOM_EVENTS.PRODUCT_CLICKED, data);
  }
  /**
   * @param { { productListId: string } } data
   */
  productListViewed(data) {
    this.trackEvent(ECOM_EVENTS.PRODUCT_LIST_VIEWED, data);
  }
  /**
   * @param { { productId: string, quantity: string } } data
   */
  productAddedToAddTocart(data) {
    this.trackEvent(ECOM_EVENTS.PRODUCT_ADDED_TO_ADD_TO_CART, data);
  }
  /**
   * @param { { productId: string, quantity: string } } data
   */
  productRemovedFromAddToCart(data) {
    this.trackEvent(ECOM_EVENTS.PRODUCT_REMOVED_FROM_ADD_TO_CART, data);
  }
  clearCart() {
    this.trackEvent(ECOM_EVENTS.CLEAR_CART, {});
  }
  /**
   * @param { { categoryId: string } } data
   */
  selectCategory(data) {
    this.trackEvent(ECOM_EVENTS.SELECT_CATEGORY, data);
  }
  /**
   * @param { { categoryId: string } } data
   */
  categoryViewedPage(data) {
    this.trackEvent(ECOM_EVENTS.CATEGORY_VIEWED_PAGE, data);
  }
  /**
   * @param { { productId: string } } data
   */
  productAddedToWishlist(data) {
    this.trackEvent(ECOM_EVENTS.PRODUCT_ADDED_TO_WISHLIST, data);
  }
  /**
   * @param { { productId: string } } data
   */
  productRemovedFromWishlist(data) {
    this.trackEvent(ECOM_EVENTS.PRODUCT_REMOVED_FROM_WISHLIST, data);
  }
  /**
   * @param { { productId: string, rateValue: string, rateSubjectId: string } } data
   */
  productRatedOrReviewed(data) {
    this.trackEvent(ECOM_EVENTS.PRODUCT_RATED_OR_REVIEWED, data);
  }
  /**
   * @param { { productIds: string[] } } data
   */
  cartViewed(data) {
    this.trackEvent(ECOM_EVENTS.CART_VIEWED, data);
  }
  /**
   * @param { { couponCode: string, orderId: string, expiryDate: Date } } data
   */
  offerAvailed(data) {
    this.trackEvent(ECOM_EVENTS.OFFER_AVAILED, data);
  }
  /**
   * @param { { checkoutId: string, orderId: string, totalAmount: float, productIds: {productId: string, quantity: float, price: float}[] } } data
   */
  checkoutStarted(data) {
    this.trackEvent(ECOM_EVENTS.CHECKOUT_STARTED, data);
  }
  /**
   * @param { { checkoutId: string, orderId: string, totalAmount: float, productIds: {productId: string, quantity: float, price: float}[] } } data
   */
  checkoutCompleted(data) {
    this.trackEvent(ECOM_EVENTS.CHECKOUT_COMPLETED, data);
  }
  /**
   * @param { { checkoutId: string, orderId: string, productIds: {productId: string, quantity: float, price: float}[] } } data
   */
  checkoutCanceled(data) {
    this.trackEvent(ECOM_EVENTS.CHECKOUT_CANCELED, data);
  }
  /**
   * @param { { currency: string, value: string, productIds: string[], paymentType: string } } data
   */
  paymentInfoEntered(data) {
    this.trackEvent(ECOM_EVENTS.PAYMENT_INFO_ENTERED, data);
  }
  /**
   * @param { { orderId: string, totalAmount: float, productIds: {productId: string, quantity: float, price: float}[] } } data
   */
  orderCompleted(data) {
    this.trackEvent(ECOM_EVENTS.ORDER_COMPLETED, data);
  }
  /**
   * @param { { orderId: string, totalAmount: float, productIds: {productId: string, quantity: float, price: float}[] } } data
   */
  orderRefunded(data) {
    this.trackEvent(ECOM_EVENTS.ORDER_REFUNDED, data);
  }
  /**
   * @param { { orderId: string, totalAmount: float, productIds: {productId: string, quantity: float, price: float}[] } } data
   */
  orderCancelled(data) {
    this.trackEvent(ECOM_EVENTS.ORDER_CANCELLED, data);
  }
  /**
   * @param { { orderId: string, rateValue: float, rateSubjectId: string } } data
   */
  orderExperianceRating(data) {
    this.trackEvent(ECOM_EVENTS.ORDER_EXPERIANCE_RATING, data);
  }
  /**
   * @param { { productId: string, deliveryType: string, extraNote: string, rateValue: string, rateSubjectId: string } } data
   */
  productReview(data) {
    this.trackEvent(ECOM_EVENTS.PRODUCT_REVIEW, data);
  }
  /**
   * @param { { orderId: string, brandId: string, sku: string, purchaseDate: string, orderCreatedDate: string } } data
   */
  purchased(data) {
    this.trackEvent(ECOM_EVENTS.PURCHASED, data);
  }
  /**
   * @param { { appVersion: string, updateType: string, previousVersion: string, updateId: string } } data
   */
  appUpdated(data) {
    this.trackEvent(ECOM_EVENTS.APP_UPDATED, data);
  }
  /**
   * @param { { apiCode: string, success: boolean, comment: string } } data
   */
  accountDeletion(data) {
    this.trackEvent(ECOM_EVENTS.ACCOUNT_DELETION, data);
  }
  /**
   * @param { { productId: string } } data
   */
  share(data) {
    this.trackEvent(ECOM_EVENTS.SHARE, data);
  }
  /**
   * @param { { screenName: string } } data
   */
  screen(data) {
    this.trackEvent(ECOM_EVENTS.SCREEN, data);
  }
  /**
   * @param { { wishlistId: string, productId: string } } data
   */
  wishlistProductAddedToCart(data) {
    this.trackEvent(ECOM_EVENTS.WISHLIST_PRODUCT_ADDED_TO_CART, data);
  }
  /**
   * @param { { productId: string, orderId: string, price: float, postalCode: string } } data
   */
  shipped(data) {
    this.trackEvent(ECOM_EVENTS.SHIPPED, data);
  }
  /**
   * @param { { quantity: string, productId: string } } data
   */
  productQuantitySelected(data) {
    this.trackEvent(ECOM_EVENTS.PRODUCT_QUANTITY_SELECTED, data);
  }
  async login() {
    try {
      const encodedCredentials = await _asyncStorage.default.getItem('swanCredentials');
      if (!encodedCredentials) return;
      const decodedCredentials = JSON.parse(_reactNativeBase.default.decode(encodedCredentials)); // Decode and parse Base64
      this.trackEvent(ECOM_EVENTS.USER_LOGIN, {
        timeOfLogin: decodedCredentials.timeOfLogin
      });
    } catch (error) {
      console.log('Error in login', error);
    }
  }
  async logout() {
    try {
      const encodedCredentials = await _asyncStorage.default.getItem('swanCredentials');
      if (!encodedCredentials) return;
      const decodedCredentials = JSON.parse(_reactNativeBase.default.decode(encodedCredentials)); // Decode and parse Base64
      this.trackEvent(ECOM_EVENTS.USER_LOGOUT, {
        timeOfLogin: decodedCredentials.timeOfLogin
      });
    } catch (error) {
      console.log('Error in logout', error);
    }
  }
  async sendNotificationAck(commId, event) {
    try {
      // const encodedCredentials = await AsyncStorage.getItem('swanCredentials');
      // if (!encodedCredentials || !this.deviceId) return;
      // const decodedCredentials = JSON.parse(Base64.decode(encodedCredentials)); // Decode and parse Base64

      const decodedCredentials = {
        credentials: 'CING-00000018-476767'
      };
      const payload = {
        commId,
        CDID: decodedCredentials.credentials || null,
        event,
        deviceId: this.deviceId || null
      };
      await this.sendToSwan(this.notificationAckUrl, payload);
    } catch (error) {
      console.log('Error in sendNotificationAck', error);
    }
  }

  // Method to show popup and manage modal instances
  showPopUp({
    designConfig
  }) {
    designConfig = this.flattenDesignConfig(this.notificationToShow);
    this.notificationToShow = null;

    // Generate unique ID for this modal
    const modalId = SwanSDK.generateId();

    // Create modal component with visibility management
    const ModalWrapper = () => {
      const [isVisible, setIsVisible] = (0, _react.useState)(true);
      const handleClose = () => {
        // Find the modal in the instances array and mark as invisible
        const index = SwanSDK.modalInstances.findIndex(m => m.id === modalId);
        if (index !== -1 && SwanSDK.modalInstances[index]) {
          SwanSDK.modalInstances[index].visible = false;
        }

        // Update local state to hide the modal
        setIsVisible(false);
      };
      const handleButtonClick = event => {
        this.notifyButtonClick(event);
        // Find the modal in the instances array and mark as invisible
        const index = SwanSDK.modalInstances.findIndex(m => m.id === modalId);
        if (index !== -1 && SwanSDK.modalInstances[index]) {
          SwanSDK.modalInstances[index].visible = false;
        }

        // Update local state to hide the modal
        setIsVisible(false);
      };
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Modal, {
        animationType: "fade",
        transparent: true,
        visible: isVisible,
        onRequestClose: handleClose,
        hardwareAccelerated: true,
        statusBarTranslucent: true,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: SwanSDK.styles.modalBackground,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: SwanSDK.styles.popUpModalContent,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PopUpView.default, {
              designConfig: designConfig,
              onClose: handleClose,
              onButtonClick: handleButtonClick
            })
          })
        })
      });
    };

    // Create modal instance object
    const modalInstance = {
      id: modalId,
      component: /*#__PURE__*/(0, _jsxRuntime.jsx)(ModalWrapper, {}, modalId),
      visible: true
    };

    // Add to modal instances array
    SwanSDK.modalInstances.push(modalInstance);

    // Return the modal component
    return modalInstance.component;
  }
  async processNotification(notificationList) {
    if (!notificationList || notificationList.length < 1) return null;
    this.notificationToShow = notificationList.filter(e => e.displayIn.toLowerCase() === 'all' || e.displayIn.toLowerCase() === this.currentScreenName.toLowerCase())[0];
    if (!this.notificationToShow) {
      return null;
    }
    notificationList.splice(notificationList.indexOf(this.notificationToShow), 1);
    const {
      subType,
      displayIn,
      expiresAt,
      displayLimit,
      displayUnlimited
    } = this.notificationToShow;
    if (displayIn && displayIn.toLowerCase() != 'all' && displayIn.toLowerCase() !== this.currentScreenName.toLowerCase()) {
      return null;
    }
    await this.deleteFromTableByValue('Notifications', 'commId', this.notificationToShow.commId);
    if (!displayUnlimited && displayLimit < 1) {
      this.processNotification(notificationList);
      return null;
    }
    if (expiresAt && new Date(new Date(expiresAt).setHours(0, 0, 0, 0)) < new Date(new Date().setHours(0, 0, 0, 0))) {
      this.processNotification(notificationList);
      return null;
    }
    const newDisplayLimit = displayLimit - 1;
    if (displayUnlimited || newDisplayLimit > 0) {
      await this.insertNotification({
        ...this.notificationToShow,
        displayLimit: newDisplayLimit
      }, 'Notifications');
    }
    try {
      await _asyncStorage.default.setItem('lastNotificationFetchFromDbDate', new Date().toISOString());
    } catch (e) {
      console.log('error in setting lastNotificationFetchFromDbDate', e);
    }
    this.sendNotificationAck(this.notificationToShow.commId, 'showed');
    switch (subType) {
      case 'popup':
        return this.showPopUp({
          designConfig: this.notificationToShow
        });
      case 'header':
        return this.showHeader({
          designConfig: this.notificationToShow
        });
      case 'footer':
        return this.showFooter({
          designConfig: this.notificationToShow
        });
      case 'fullscreen':
        return this.showFullScreen({
          designConfig: this.notificationToShow
        });
    }
    return null;
  }
  showHeader({
    designConfig
  }) {
    designConfig = this.flattenDesignConfig(this.notificationToShow);
    this.notificationToShow = null;

    // Generate unique ID for this modal
    const modalId = SwanSDK.generateId();

    // Create modal component with visibility management
    const ModalWrapper = () => {
      const [isVisible, setIsVisible] = (0, _react.useState)(true);
      const handleClose = () => {
        // Find the modal in the instances array and mark as invisible
        const index = SwanSDK.modalInstances.findIndex(m => m.id === modalId);
        if (index !== -1 && SwanSDK.modalInstances[index]) {
          SwanSDK.modalInstances[index].visible = false;
        }

        // Update local state to hide the modal
        setIsVisible(false);
      };
      const handleButtonClick = event => {
        this.notifyButtonClick(event);
        // Find the modal in the instances array and mark as invisible
        const index = SwanSDK.modalInstances.findIndex(m => m.id === modalId);
        if (index !== -1 && SwanSDK.modalInstances[index]) {
          SwanSDK.modalInstances[index].visible = false;
        }

        // Update local state to hide the modal
        setIsVisible(false);
      };
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Modal, {
        animationType: "fade",
        transparent: true,
        visible: isVisible,
        onRequestClose: handleClose,
        hardwareAccelerated: true,
        statusBarTranslucent: true,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: SwanSDK.styles.modalBackground,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: SwanSDK.styles.headerModalContent,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderView.default, {
              designConfig: designConfig,
              onClose: handleClose,
              onButtonClick: handleButtonClick
            })
          })
        })
      });
    };

    // Create modal instance object
    const modalInstance = {
      id: modalId,
      component: /*#__PURE__*/(0, _jsxRuntime.jsx)(ModalWrapper, {}, modalId),
      visible: true
    };

    // Add to modal instances array
    SwanSDK.modalInstances.push(modalInstance);

    // Return the modal component
    return modalInstance.component;
  }
  showFooter({
    designConfig
  }) {
    designConfig = this.flattenDesignConfig(this.notificationToShow);
    this.notificationToShow = null;

    // Generate unique ID for this modal
    const modalId = SwanSDK.generateId();

    // Create modal component with visibility management
    const ModalWrapper = () => {
      const [isVisible, setIsVisible] = (0, _react.useState)(true);
      const handleClose = () => {
        // Find the modal in the instances array and mark as invisible
        const index = SwanSDK.modalInstances.findIndex(m => m.id === modalId);
        if (index !== -1 && SwanSDK.modalInstances[index]) {
          SwanSDK.modalInstances[index].visible = false;
        }

        // Update local state to hide the modal
        setIsVisible(false);
      };
      const handleButtonClick = event => {
        this.notifyButtonClick(event);
        // Find the modal in the instances array and mark as invisible
        const index = SwanSDK.modalInstances.findIndex(m => m.id === modalId);
        if (index !== -1 && SwanSDK.modalInstances[index]) {
          SwanSDK.modalInstances[index].visible = false;
        }

        // Update local state to hide the modal
        setIsVisible(false);
      };
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Modal, {
        animationType: "fade",
        transparent: true,
        visible: isVisible,
        onRequestClose: handleClose,
        hardwareAccelerated: true,
        statusBarTranslucent: true,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: SwanSDK.styles.modalBackground,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: SwanSDK.styles.footerModalContent,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FooterView.default, {
              designConfig: designConfig,
              onClose: handleClose,
              onButtonClick: handleButtonClick
            })
          })
        })
      });
    };

    // Create modal instance object
    const modalInstance = {
      id: modalId,
      component: /*#__PURE__*/(0, _jsxRuntime.jsx)(ModalWrapper, {}, modalId),
      visible: true
    };

    // Add to modal instances array
    SwanSDK.modalInstances.push(modalInstance);

    // Return the modal component
    return modalInstance.component;
  }
  showFullScreen({
    designConfig
  }) {
    designConfig = this.flattenDesignConfig(this.notificationToShow);
    this.notificationToShow = null;

    // Generate unique ID for this modal
    const modalId = SwanSDK.generateId();

    // Create modal component with visibility management
    const ModalWrapper = () => {
      const [isVisible, setIsVisible] = (0, _react.useState)(true);
      const handleClose = () => {
        // Find the modal in the instances array and mark as invisible
        const index = SwanSDK.modalInstances.findIndex(m => m.id === modalId);
        if (index !== -1 && SwanSDK.modalInstances[index]) {
          SwanSDK.modalInstances[index].visible = false;
        }

        // Update local state to hide the modal
        setIsVisible(false);
      };
      const handleButtonClick = event => {
        this.notifyButtonClick(event);
        // Find the modal in the instances array and mark as invisible
        const index = SwanSDK.modalInstances.findIndex(m => m.id === modalId);
        if (index !== -1 && SwanSDK.modalInstances[index]) {
          SwanSDK.modalInstances[index].visible = false;
        }

        // Update local state to hide the modal
        setIsVisible(false);
      };
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Modal, {
        animationType: "fade",
        transparent: true,
        visible: isVisible,
        onRequestClose: handleClose,
        hardwareAccelerated: true,
        statusBarTranslucent: true,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: SwanSDK.styles.modalBackground,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: SwanSDK.styles.footerModalContent,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FullScreenView.default, {
              designConfig: designConfig,
              onClose: handleClose,
              onButtonClick: handleButtonClick
            })
          })
        })
      });
    };

    // Create modal instance object
    const modalInstance = {
      id: modalId,
      component: /*#__PURE__*/(0, _jsxRuntime.jsx)(ModalWrapper, {}, modalId),
      visible: true
    };

    // Add to modal instances array
    SwanSDK.modalInstances.push(modalInstance);

    // Return the modal component
    return modalInstance.component;
  }
  async fetchNotificationFromAPI() {
    try {
      // Check if the device ID is already stored in AsyncStorage
      const encodedCredentials = await _asyncStorage.default.getItem('swanCredentials');
      let CDID = null;
      if (encodedCredentials) {
        const decodedCredentials = JSON.parse(_reactNativeBase.default.decode(encodedCredentials));
        CDID = decodedCredentials.credentials;
      }
      console.log('URL', `${this.webSDKUrl}/post-in-app-notification-to-sdk?appId=${this.appId}&CDID=${CDID}`);
      const response = await fetch(`${this.webSDKUrl}/post-in-app-notification-to-sdk?appId=${this.appId}&CDID=${CDID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Swan-Device-Id': this.deviceId
        }
      });
      let responseData = null;
      try {
        responseData = await response.json();
        console.log('IN APP NOTIFICATION', responseData);
        await _asyncStorage.default.setItem('lastNotificationFetchFromApiDate', new Date().toISOString());
      } catch (err) {}
      if (responseData && responseData.notifications && responseData.notifications.length > 0) {
        responseData.notifications.forEach(async notification => {
          await this.insertNotification(notification, 'Notifications');
          this.sendNotificationAck(notification.commId, 'delivered');
        });
      }
      return responseData;
    } catch (error) {
      console.error('Error fetching data from Swan:', error);
    }
  }
  async fetchNotificationFromDB() {
    try {
      const rows = await this.selectAllFromTable('Notifications');
      if (!rows || rows.length < 1) return [];
      const notificationList = [];
      for (let i = 0; i < rows.length; i++) {
        const content = JSON.parse(rows[i].content);
        notificationList.push({
          ...content.design,
          ...content,
          commId: rows[i].commId,
          design: null
        });
      }
      return notificationList;
    } catch (error) {
      console.error('Error fetching data from DB:', error);
      return [];
    }
  }
  flattenDesignConfig(designConfig) {
    const {
      colors = {},
      buttons = [],
      ...restConfig
    } = designConfig;
    const primaryButton = buttons.find(button => button.type === 'primary') || {};
    const secondaryButton = buttons.find(button => button.type === 'secondary') || {};
    return {
      themeBackgroundColor: colors.themeBackground || '#f5f5f5',
      crossButtonColor: colors.crossButton || '#000',
      imageURL: restConfig.imageUrl || undefined,
      iconURL: restConfig.iconURL || undefined,
      title: restConfig.title || 'Title',
      titleColor: colors.title || '#333',
      onClickAction: restConfig.onClickAction || '',
      onClickActionType: restConfig.onClickActionType || '',
      description: restConfig.description || 'Description',
      descriptionColor: colors.description || '#666',
      primaryButtonSwitch: primaryButton.primaryButtonSwitch !== undefined ? primaryButton.primaryButtonSwitch : false,
      primaryButtonColor: colors.primaryButtonBackground || '#007BFF',
      primaryButtonFontColor: colors.primaryButtonFont || '#FFF',
      primaryButtonText: primaryButton.label || 'Primary Action',
      primaryButtonAction: primaryButton.action || '',
      primaryButtonActionType: primaryButton.actionType || '',
      secondaryButtonSwitch: secondaryButton.secondaryButtonSwitch !== undefined ? secondaryButton.secondaryButtonSwitch : false,
      secondaryButtonColor: colors.secondaryButtonBackground || '#6C757D',
      secondaryButtonFontColor: colors.secondaryButtonFont || '#FFF',
      secondaryButtonText: secondaryButton.label || 'Secondary Action',
      secondaryButtonAction: secondaryButton.action || '',
      secondaryButtonActionType: secondaryButton.actionType || '',
      backgroundImageURL: restConfig.backgroundImageUrl || undefined,
      commId: restConfig.commId || undefined
    };
  }
  async getNotificationComponent() {
    // const lastNotificationFetchFromApi = await AsyncStorage.getItem(
    //   'lastNotificationFetchFromApiDate'
    // );

    // if (
    //   !lastNotificationFetchFromApi ||
    //   (await this.isGreaterThanTimePeriod(lastNotificationFetchFromApi, 5))
    // ) {
    //   this.fetchNotificationFromAPI();
    // }

    this.fetchNotificationFromAPI();

    // const lastNotificationFetchFromDB = await AsyncStorage.getItem(
    //   'lastNotificationFetchFromDbDate'
    // );

    let notificationList = [];
    // if (
    //   !lastNotificationFetchFromDB ||
    //   (await this.isGreaterThanTimePeriod(lastNotificationFetchFromDB, 30))
    // ) {
    //   notificationList = await this.fetchNotificationFromDB();
    // }
    notificationList = await this.fetchNotificationFromDB();
    if (notificationList && notificationList.length > 0) {
      const notificationComponent = await this.processNotification(notificationList);
      this.notifyNotificationShow(notificationComponent);
      return notificationComponent;
    }
    return null;
  }

  // private async isGreaterThanTimePeriod(
  //   lastFetchTimeString: string,
  //   timePeriod: number
  // ) {
  //   const lastFetchTime: any = new Date(lastFetchTimeString);
  //   const currentTime: any = new Date();

  //   const timeDifference = currentTime - lastFetchTime;
  //   if (timeDifference > timePeriod * 60 * 1000) {
  //     console.log('More than 30 mins');
  //     return true;
  //   } else {
  //     console.log('Less than 30 mins');
  //     return false;
  //   }
  // }
}
exports.default = SwanSDK;
//# sourceMappingURL=index.js.map