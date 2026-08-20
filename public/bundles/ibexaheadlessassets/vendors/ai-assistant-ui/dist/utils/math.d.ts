declare const SIZE_UNIT_ORDER: readonly ["B", "KB", "MB", "GB"];
export type SizeUnit = (typeof SIZE_UNIT_ORDER)[number];
export declare const convertSize: (size: number, toUnit: SizeUnit, fromUnit?: SizeUnit, decimalPlaces?: number) => number;
export {};
