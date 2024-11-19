"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderPrivate = void 0;
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const cross_inpage_provider_core_1 = require("@chargerwallet/cross-inpage-provider-core");
const cross_inpage_provider_core_2 = require("@chargerwallet/cross-inpage-provider-core");
const { WALLET_INFO_LOACAL_KEY_V5 } = cross_inpage_provider_core_2.consts;
const PROVIDER_EVENTS = {
    'message_low_level': 'message_low_level',
};
const METHODS = {
    wallet_events_ext_switch_changed: 'wallet_events_ext_switch_changed',
    wallet_events_dapp_network_changed: 'wallet_events_dapp_network_changed'
};
class ProviderPrivate extends cross_inpage_provider_core_1.ProviderBase {
    constructor(props) {
        super(props);
        this.providerName = cross_inpage_provider_types_1.IInjectedProviderNames.$private;
        try {
            void this.getConnectWalletInfo();
        }
        catch (error) {
            console.error(error);
        }
        try {
            void this.sendSiteMetadataDomReady();
        }
        catch (error) {
            console.error(error);
        }
        this._registerEvents();
    }
    _registerEvents() {
        try {
            // platform check
            const walletInfoLocalStr = localStorage.getItem(WALLET_INFO_LOACAL_KEY_V5);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const walletInfoLocal = walletInfoLocalStr ? JSON.parse(walletInfoLocalStr) : null;
            this.on(PROVIDER_EVENTS.message_low_level, (payload) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const { method, params } = payload;
                if (method === METHODS.wallet_events_ext_switch_changed) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    if (!walletInfoLocal || (walletInfoLocal && walletInfoLocal.platformEnv.isExtension)) {
                        try {
                            localStorage.setItem(WALLET_INFO_LOACAL_KEY_V5, JSON.stringify(params));
                            this.notifyDefaultWalletChanged(params);
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                }
                else if (method === METHODS.wallet_events_dapp_network_changed) {
                    this.notifyNetworkChanged(params);
                }
            });
        }
        catch (e) {
            console.error(e);
        }
    }
    request(data) {
        return this.bridgeRequest(data);
    }
    notifyDefaultWalletChanged(params) {
        let isDefaultWallet = !!params.isDefaultWallet;
        if (isDefaultWallet) {
            const isExcludedWebsite = params.excludedDappList.some(i => i.startsWith(window.location.origin));
            isDefaultWallet = !isExcludedWebsite;
        }
        (0, cross_inpage_provider_core_1.switchDefaultWalletNotification)(isDefaultWallet);
    }
    notifyNetworkChanged(params) {
        if (!params.networkChangedText)
            return;
        (0, cross_inpage_provider_core_1.switchNetworkNotification)(params.networkChangedText);
    }
}
exports.ProviderPrivate = ProviderPrivate;
