type PartnerName = 'Actito' | 'Adnami' | 'Bizzkit' | 'Ibexa' | 'Qualifio' | 'Raptor' | 'Seenthis';
type PartnerConfig = {
    icon: string;
    link: string;
    shouldHide?: boolean;
};
export type PartnersConfig = Record<PartnerName, PartnerConfig>;
export declare const partnersDefaultConfig: PartnersConfig;
export {};
