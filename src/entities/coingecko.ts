export type ICoinGeckoDays = '1' | '7' | '30' | '90' | '180' | '365' | 'all';

export type ICoinGeckoChart = {
    market_caps: number[][];
    prices: number[][];
    volumes: number[][];
}

export type ICoinGeckoCoin = {
    "id": "tether",
    "symbol": "usdt",
    "name": "Tether",
    "block_time_in_minutes": null,
    "image": {
        "thumb": "https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707",
        "small": "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707",
        "large": "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707"
    },
    "market_data": {
        "current_price": {
            [key in string]: number;
        },
        "roi": null,
        "market_cap": {
            [key in string]: number;
        },
        "market_cap_rank": 3,
        "total_volume": {
            [key in string]: number;
        },
        "high_24h": {
            [key in string]: number;
        },
        "low_24h": {
            [key in string]: number;
        },
        "price_change_24h": -0.00005868489495,
        "price_change_percentage_24h": -0.00586,
        "price_change_percentage_7d": 0.10872,
        "price_change_percentage_14d": 0.04037,
        "price_change_percentage_30d": 0.04178,
        "price_change_percentage_60d": 0.00267,
        "price_change_percentage_200d": -0.50073,
        "price_change_percentage_1y": -0.17625,
        "market_cap_change_24h": -16092870.3289,
        "market_cap_change_percentage_24h": -0.02221,
        "price_change_24h_in_currency": {
            [key in string]: number;
        },
        "price_change_percentage_1h_in_currency": {
            [key in string]: number;
        },
        "price_change_percentage_24h_in_currency": {
            [key in string]: number;
        },
        "price_change_percentage_7d_in_currency": {
            [key in string]: number;
        },
        "price_change_percentage_14d_in_currency": {
            [key in string]: number;
        },
        "price_change_percentage_30d_in_currency": {
            [key in string]: number;
        },
        "price_change_percentage_60d_in_currency": {
            [key in string]: number;
        },
        "price_change_percentage_200d_in_currency": {
            [key in string]: number;
        },
        "price_change_percentage_1y_in_currency": {
            [key in string]: number;
        },
        "market_cap_change_24h_in_currency": {
            [key in string]: number;
        },
        "market_cap_change_percentage_24h_in_currency": {
            [key in string]: number;
        },
        "total_supply": string,
        "circulating_supply": string,
    },
    "last_updated": string | Date,
    "localization": {
        [key in string]: string;
    }
}