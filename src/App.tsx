import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import { TimePicker } from 'components/TimePicker';
import { IInterval, intervals } from 'constants/timeIntervals';

import { getChartData, getCoinList, mapCoinGeckoChartToHistoricData, mapCoinGeckoToChronos } from 'services/coingecko';
import { ICoinGeckoChart, ICoinGeckoCoin } from 'entities/coingecko';
import { IChronosCrypto } from 'entities/Core/crypto';
import { formatCurrency } from 'utils/currencies';
import { LineChart } from 'components/Charts';
import coins, { keys } from 'assets/crypto'


function App() {
  // #region STATE
  const [interval, setInterval] = React.useState<IInterval>(intervals[0]);
  const [cryptoCurrencies, setCryptoCurrencies] = useState<IChronosCrypto[]>([])
  const [activeKeys, setActiveKeys] = useState<string[]>([])
  const [activeAsset, setActiveAsset] = useState<string>('')
  const [historicGlobalData, setHistoricGlobalData] = useState<any>({})
  const [series, setSeries] = useState<any>({
    prices: {},
    totalVolume: {},
    marketCap: {}
  })
  // #endregion

  //#region HELPERS
  const fetchHistoricData = (coinId: string) => {
    getChartData({
      id: coinId,
      // @ts-ignore
      days: interval.value,
      currency: 'usd',
    }).then((res: ICoinGeckoChart) => {
      const currentCryptoIndex = cryptoCurrencies.findIndex((c: IChronosCrypto) => c.id === coinId)
      const currentCrypto = cryptoCurrencies.find((c: IChronosCrypto) => c.id === coinId)
      const historicData = mapCoinGeckoChartToHistoricData(res, currentCrypto);
      setSeries({
        // ...series,
        // [coinId]: {
          prices: generateSeries(res?.prices, coinId, 0),
          totalVolume: generateSeries(res?.volumes, coinId, 1),
          marketCap: generateSeries(res?.market_caps, coinId, 2)
        // }
      })
      setActiveAsset(coinId)
      console.log('SUCCESS:', historicData.historicData, historicData?.historicData?._startDate?.toLocaleString());
      setHistoricGlobalData(historicData.historicData)

      // @ts-ignore
      const newCryptos:IChronosCrypto = [
        ...cryptoCurrencies.slice(0, currentCryptoIndex),
        {
          ...currentCrypto,
          historicData
        },
        ...cryptoCurrencies.slice(currentCryptoIndex + 1)
      ]
      // @ts-ignore
      setCryptoCurrencies(newCryptos)
    }).catch(err => {
      console.log('ERROR', err)
    })
  }

  const generateSeries = (data: any, key: string, i: number) => ({
    data,
    name: key,
    type: 'area',
    // @ts-ignore
    // color: coins?.[key]?.color,
    color: '#00adee',
    fillColor: {
      linearGradient: [0, 0, 0, 300],
      stops: [
        // @ts-ignore
        // [0, coins?.[key]?.color],
        [0, '#00adee'],
        [1, 'rgba(0,0,0,0)']
      ]
    }
  })
  //#endregion

  // #region HOOKS
  useEffect(() => {
    getCoinList()
      .then((responseData: ICoinGeckoCoin[]) => {
        const mappedData = responseData.map((coin: ICoinGeckoCoin) => mapCoinGeckoToChronos(coin))
        setCryptoCurrencies(mappedData);
      })
      .catch((err: Error) => {
        console.log('error caught')
      })
  }, [])

  useEffect(() => {
    fetchHistoricData(activeAsset)
  }, [interval])

  useEffect(() => {
    console.log('series', series)
    console.log('historicGlobalData', historicGlobalData)
  }, [series, historicGlobalData])
  // #endregion

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div style={{ position: 'fixed', top: 0, width: '100vw', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div>
            {activeAsset}
          </div>
          <TimePicker
            onChange={(value:IInterval) => setInterval(value)}
            value={interval}
          />
          <div>
            (
            starts: {historicGlobalData?._startDate?.getFullYear()}
            )

          </div>
        </div>

        {/* <div className="code-view"> */}
        {/* <pre><code>{JSON.stringify(cryptoCurrencies, null, 2)}</code></pre> */}
        <div style={{ marginTop: '4rem'}}>
          <LineChart
            data={[]}
            period={{ days: interval.value, label: interval?.label }}
            series={series?.prices}
            title={`Prices: ${activeKeys.toString()}`}
            // onChangeRange={handleFetchChartData}
            onChangeRange={() => { }}
          />
        </div>
        <div className="coin-list-cointainer">
          {
            cryptoCurrencies?.map((coin: IChronosCrypto) => (
              <div
                onClick={() => fetchHistoricData(coin.id)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: activeAsset === coin?.id ? '#00adee44': '#ffffff11',
                  color: '#EEE',
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: '2px',
                  justifyContent: 'space-between'
                }
              }>
                <div>#{coin?.marketCapRank}. {coin?.name} ({coin?.code})</div>
                <div>{formatCurrency(coin?.price.value, coin?.price?.code?.toUpperCase())}</div>
              </div>
            ))}
        </div>
      </header>
    </div>
  );
}

export default App;
