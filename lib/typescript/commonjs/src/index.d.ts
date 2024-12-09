export default class SwanSDK {
    private appId;
    private deviceId;
    private webSDKUrl;
    private ecomEventUrl;
    private ecomDeviceUrl;
    private notificationAckUrl;
    private static modalInstances;
    private db;
    private notificationToShow;
    private currentScreenName;
    private country;
    private currency;
    private businessUnit;
    private deviceModel;
    private deviceBrand;
    private static instance;
    private static styles;
    private constructor();
    protected static getInstance(appId: string): SwanSDK;
    protected buttonClickHandler: ((event: any) => void) | null;
    protected setButtonClickHandler(handler: (event: any) => void): void;
    protected notifyButtonClick(event: any): void;
    protected notificationShowHandler: ((notification: any) => void) | null;
    protected setNotificationShowHandler(handler: (event: any) => void): Promise<void>;
    protected notifyNotificationShow(notification: any): void;
    private initializeDatabase;
    private createTable;
    private ensureDatabaseReady;
    private insertNotification;
    private selectAllFromTable;
    private deleteFromTableByValue;
    private deleteAllFromTable;
    private lzw64_encode;
    protected setCurrentScreenName(screenName: string): void;
    protected setCountry(country: string): void;
    protected setCurrency(currency: string): void;
    protected setBusinessUnit(businessUnit: string): void;
    private static generateId;
    private sendToSwan;
    private getDeviceId;
    private linkDevice;
    protected setPushNotificationPermission(permission: boolean): Promise<void>;
    protected registerDevice(pushNotificationToken: string): Promise<void>;
    protected identify(cdid: string): Promise<void>;
    protected unlinkDevice(): Promise<void>;
    private getSessionId;
    private trackEvent;
    /**
     * @param { { success: boolean } } data
     */
    protected forgotPassword(data: any): void;
    /**
     * @param { { searchKeyword: string } } data
     */
    protected search(data: any): void;
    /**
     * @param { { productId: string } } data
     */
    protected productViewed(data: any): void;
    /**
     * @param { { productId: string } } data
     */
    protected productClicked(data: any): void;
    /**
     * @param { { productListId: string } } data
     */
    protected productListViewed(data: any): void;
    /**
     * @param { { productId: string, quantity: string } } data
     */
    protected productAddedToAddTocart(data: any): void;
    /**
     * @param { { productId: string, quantity: string } } data
     */
    protected productRemovedFromAddToCart(data: any): void;
    protected clearCart(): void;
    /**
     * @param { { categoryId: string } } data
     */
    protected selectCategory(data: any): void;
    /**
     * @param { { categoryId: string } } data
     */
    protected categoryViewedPage(data: any): void;
    /**
     * @param { { productId: string } } data
     */
    protected productAddedToWishlist(data: any): void;
    /**
     * @param { { productId: string } } data
     */
    protected productRemovedFromWishlist(data: any): void;
    /**
     * @param { { productId: string, rateValue: string, rateSubjectId: string } } data
     */
    protected productRatedOrReviewed(data: any): void;
    /**
     * @param { { productIds: string[] } } data
     */
    protected cartViewed(data: any): void;
    /**
     * @param { { couponCode: string, orderId: string, expiryDate: Date } } data
     */
    protected offerAvailed(data: any): void;
    /**
     * @param { { checkoutId: string, orderId: string, totalAmount: float, productIds: {productId: string, quantity: float, price: float}[] } } data
     */
    protected checkoutStarted(data: any): void;
    /**
     * @param { { checkoutId: string, orderId: string, totalAmount: float, productIds: {productId: string, quantity: float, price: float}[] } } data
     */
    protected checkoutCompleted(data: any): void;
    /**
     * @param { { checkoutId: string, orderId: string, productIds: {productId: string, quantity: float, price: float}[] } } data
     */
    protected checkoutCanceled(data: any): void;
    /**
     * @param { { currency: string, value: string, productIds: string[], paymentType: string } } data
     */
    protected paymentInfoEntered(data: any): void;
    /**
     * @param { { orderId: string, totalAmount: float, productIds: {productId: string, quantity: float, price: float}[] } } data
     */
    protected orderCompleted(data: any): void;
    /**
     * @param { { orderId: string, totalAmount: float, productIds: {productId: string, quantity: float, price: float}[] } } data
     */
    protected orderRefunded(data: any): void;
    /**
     * @param { { orderId: string, totalAmount: float, productIds: {productId: string, quantity: float, price: float}[] } } data
     */
    protected orderCancelled(data: any): void;
    /**
     * @param { { orderId: string, rateValue: float, rateSubjectId: string } } data
     */
    protected orderExperianceRating(data: any): void;
    /**
     * @param { { productId: string, deliveryType: string, extraNote: string, rateValue: string, rateSubjectId: string } } data
     */
    protected productReview(data: any): void;
    /**
     * @param { { orderId: string, brandId: string, sku: string, purchaseDate: string, orderCreatedDate: string } } data
     */
    protected purchased(data: any): void;
    /**
     * @param { { appVersion: string, updateType: string, previousVersion: string, updateId: string } } data
     */
    protected appUpdated(data: any): void;
    /**
     * @param { { apiCode: string, success: boolean, comment: string } } data
     */
    protected accountDeletion(data: any): void;
    /**
     * @param { { productId: string } } data
     */
    protected share(data: any): void;
    /**
     * @param { { screenName: string } } data
     */
    protected screen(data: any): void;
    /**
     * @param { { wishlistId: string, productId: string } } data
     */
    protected wishlistProductAddedToCart(data: any): void;
    /**
     * @param { { productId: string, orderId: string, price: float, postalCode: string } } data
     */
    protected shipped(data: any): void;
    /**
     * @param { { quantity: string, productId: string } } data
     */
    protected productQuantitySelected(data: any): void;
    protected login(): Promise<void>;
    protected logout(): Promise<void>;
    protected sendNotificationAck(commId: string, event: any): Promise<void>;
    protected showPopUp({ designConfig }: any): import("react/jsx-runtime").JSX.Element;
    private processNotification;
    protected showHeader({ designConfig }: any): import("react/jsx-runtime").JSX.Element;
    protected showFooter({ designConfig }: any): import("react/jsx-runtime").JSX.Element;
    protected showFullScreen({ designConfig }: any): import("react/jsx-runtime").JSX.Element;
    private fetchNotificationFromAPI;
    private fetchNotificationFromDB;
    private flattenDesignConfig;
    protected getNotificationComponent(): Promise<import("react/jsx-runtime").JSX.Element | null>;
    private isGreaterThanTimePeriod;
}
//# sourceMappingURL=index.d.ts.map