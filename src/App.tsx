import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import { TimePicker } from 'components/TimePicker';
import { IInterval, intervals } from 'constants/timeIntervals';

import { getChartData, getCoinList, mapCoinGeckoChartToHistoricData, mapCoinGeckoToChronos } from 'services/coingecko';
import { ICoinGeckoChart, ICoinGeckoCoin } from 'entities/coingecko';
import { IChronosCrypto } from 'entities/Core/crypto';
import { formatCurrency } from 'utils/currencies';


function App() {
  // #region STATE
  const [interval, setInterval] = React.useState<IInterval>(intervals[0]);
  const [cryptoCurrencies, setCryptoCurrencies] = useState<IChronosCrypto[]>([])
  // #endregion

  //#region HELPERS
  const fetchHistoricData = (coinId: string) => {
    getChartData({
      id: coinId,
      // @ts-ignore
      days: intervals[intervals.length - 1].value,
      currency: 'usd',
    }).then((res: ICoinGeckoChart) => {
      const currentCrypto = cryptoCurrencies.find((c: IChronosCrypto) => c.id === coinId)
      const historicData = mapCoinGeckoChartToHistoricData(res, currentCrypto);
      console.log('SUCCESS:', historicData);
    }).catch(err => {
      console.log('ERROR', err)
    })
  }
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
  }, [interval])
  // #endregion

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div style={{ position: 'fixed', top: 0, left: 'calc(100vw / 2 - 9rem)' }}>
          <TimePicker
            onChange={(value:IInterval) => setInterval(value)}
            value={interval}
          />
        </div>

        {/* <div className="code-view"> */}
        {/* <pre><code>{JSON.stringify(cryptoCurrencies, null, 2)}</code></pre> */}
        <div className="coin-list-cointainer">
          {
            cryptoCurrencies?.map((coin: IChronosCrypto) => (
              <div
                onClick={() => fetchHistoricData(coin.id)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#222',
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
