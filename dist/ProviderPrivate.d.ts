import { IInjectedProviderNamesStrings } from '@chargerwallet/cross-inpage-provider-types';
import { IInpageProviderConfig, ProviderBase } from '@chargerwallet/cross-inpage-provider-core';
export interface IChargerWalletWalletInfo {
    enableExtContentScriptReloadButton?: boolean;
    platform?: string;
    version?: string;
    buildNumber?: string;
    disableExt: boolean;
    isDefaultWallet?: boolean;
    excludedDappList: string[];
    isLegacy: boolean;
    platformEnv: {
        isRuntimeBrowser?: boolean;
        isRuntimeChrome?: boolean;
        isRuntimeFirefox?: boolean;
        isWeb?: boolean;
        isNative?: boolean;
        isNativeIOS?: boolean;
        isNativeAndroid?: boolean;
        isExtension?: boolean;
        isExtChrome?: boolean;
        isExtFirefox?: boolean;
        isDesktop?: boolean;
        isDesktopWin?: boolean;
        isDesktopLinux?: boolean;
        isDesktopMac?: boolean;
    };
}
declare class ProviderPrivate extends ProviderBase {
    constructor(props: IInpageProviderConfig);
    private _registerEvents;
    protected providerName: IInjectedProviderNamesStrings;
    request(data: unknown): Promise<unknown>;
    notifyDefaultWalletChanged(params: IChargerWalletWalletInfo): void;
    notifyNetworkChanged(params: {
        networkChangedText: string;
    }): void;
}
export { ProviderPrivate };
