import axios from 'axios'
import { IChronosCrypto } from 'entities/Core/crypto';
import { ICoinGeckoChart, ICoinGeckoCoin, ICoinGeckoDays } from 'entities/coingecko';

const API_BASE_URL = 'https://api.coingecko.com/api/v3/';

export const getChartData = async ({
    id,
    days,
    currency,
}:{
    id: string,
    days: ICoinGeckoDays,
    currency: string,
}) => {
    const response = await axios.get(`${API_BASE_URL}coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);

    return response.data;
}

export const getCoinList = async () => {
    const response = await axios.get(`${API_BASE_URL}coins`);

    return response.data;
}

export const getCoinDetails = async ({ id }: { id: string }) => {
    const response = await axios.get(`${API_BASE_URL}coins/${id}`);

    return response.data;
}

export const mapCoinGeckoToChronos = (cryptoCurrency: ICoinGeckoCoin, fiatCode:string = 'usd') => {
    const chronosCoin: IChronosCrypto = {
        name: cryptoCurrency.name,
        id: cryptoCurrency.id,
        code: cryptoCurrency.symbol,
        marketCapRank: cryptoCurrency.market_data.market_cap_rank,
        price: {
            value: cryptoCurrency.market_data.current_price[fiatCode],
            code: fiatCode,
        },
        metrics: {
            gainLossPercentage1D: cryptoCurrency.market_data.price_change_percentage_24h_in_currency[fiatCode],
            gainLossValue1D: cryptoCurrency.market_data.price_change_percentage_24h,
            gainLossPercentage7D: cryptoCurrency.market_data.price_change_percentage_7d,
            gainLossPercentage30D: cryptoCurrency.market_data.price_change_percentage_30d,
        },
        historicData: {
            _startDate: null,
        }
    }

    return chronosCoin
}

export const mapCoinGeckoChartToHistoricData = (chartData: ICoinGeckoChart, crypto?: IChronosCrypto): IChronosCrypto => {
    // @ts-ignore
    const result: IChronosCrypto = {
        ...crypto,
        historicData: {
            _startDate: new Date(chartData?.prices[0][0]),
            priceDataPoints: chartData?.prices?.length,
            marketCapDataPoints: chartData?.market_caps?.length,
            volumeDataPoints: chartData?.volumes?.length,
            prices: chartData?.prices,
            marketCaps: chartData?.market_caps,
            volumes: chartData?.volumes,
        }
    }

    return result;
}