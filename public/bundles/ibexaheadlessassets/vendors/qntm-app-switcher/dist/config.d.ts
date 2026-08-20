type PartnerName = 'Actito' | 'Cohesivo' | 'Ibexa' | 'Quable' | 'Qualifio' | 'Raptor';
type PartnerConfig = {
    icon: string;
    link: string;
    publicName?: string;
    shouldHide?: boolean;
};
export type PartnersConfig = Record<PartnerName, PartnerConfig>;
export declare const partnersDefaultConfig: PartnersConfig;
export {};
