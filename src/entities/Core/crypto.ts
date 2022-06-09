export type IChronosCrypto = {
    name: string;
    id: string;
    code: string;
    marketCapRank: number;
    price: {
        value: any;
        code: any;
    },
    metrics?: {
        gainLossPercentage1D?: number;
        gainLossValue1D?: number;
        gainLossPercentage7D?: number;
        gainLossValue7D?: number;
        gainLossPercentage30D?: number;
        gainLossValue30D?: number;
        gainLossPercentage90D?: number;
        gainLossValue90D?: number;
        gainLossPercentage180D?: number;
        gainLossValue180D?: number;
        gainLossPercentage365?: number;
        gainLossValue365?: number;
    },
    historicData?: {
        _startDate: string | Date | null;
        prices?: any[];
        priceDataPoints?: number;
        marketCaps?: any[],
        marketCapDataPoints?: number;
        volumes?: any[],
        volumeDataPoints?: number;
    }
}