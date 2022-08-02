import { combineReducers, createStore } from 'redux';
import { ValueType } from './values-reducer';
import { PortfolioType } from './portfolio-reducer';

export const values = [
  {
    id: 'bitcoin', rank: '1', changePercent24Hr: '3.1367184772434482', explorer: 'https://blockchain.info/',
    marketCapUsd: '452445368357.8622563021714334', maxSupply: '21000000.0000000000000000', name: 'Bitcoin',
    priceUsd: '23679.9797033025578357', supply: '19106662.0000000000000000', symbol: 'BTC',
    volumeUsd24Hr: '17521511686.5773940471774064', vwap24Hr: '23710.9068155355389843',
  },
  {
    id: 'ethereum', rank: '2', changePercent24Hr: '3.1367184772434482', explorer: 'https://blockchain.info/',
    marketCapUsd: '452445368357.8622563021714334', maxSupply: '21000000.0000000000000000', name: 'Ethereum',
    priceUsd: '23679.9797033025578357', supply: '19106662.0000000000000000', symbol: 'BTC',
    volumeUsd24Hr: '17521511686.5773940471774064', vwap24Hr: '23710.9068155355389843',
  },
];

export const portfolio: PortfolioType[] = [
  { id: 'bitcoin', name: 'Bitcoin', price: 2000, valueCount: 20 },
  { id: 'ethereum', name: 'Ethereum', price: 2000, valueCount: 20 },
];

const ValuesState: ValueType[] = [
  {
    'id': 'bitcoin',
    'rank': '1',
    'symbol': 'BTC',
    'name': 'Bitcoin',
    'supply': '19109256.0000000000000000',
    'maxSupply': '21000000.0000000000000000',
    'marketCapUsd': '439598186222.6843028478185096',
    'volumeUsd24Hr': '9622382958.4556673270153307',
    'priceUsd': '23004.4637123854692641',
    'changePercent24Hr': '-3.4084952567069450',
    'vwap24Hr': '23579.4890013699165648',
    'explorer': 'https://blockchain.info/',
  },
  {
    'id': 'ethereum',
    'rank': '2',
    'symbol': 'ETH',
    'name': 'Ethereum',
    'supply': '121784637.9365000000000000',
    'maxSupply': null,
    'marketCapUsd': '200976786498.8091803887365518',
    'volumeUsd24Hr': '6534517118.1570715975822179',
    'priceUsd': '1650.2638584318075930',
    'changePercent24Hr': '-3.8175749864566575',
    'vwap24Hr': '1696.1297775541851926',
    'explorer': 'https://etherscan.io/',
  },
  {
    'id': 'tether',
    'rank': '3',
    'symbol': 'USDT',
    'name': 'Tether',
    'supply': '66197977707.2567140000000000',
    'maxSupply': null,
    'marketCapUsd': '66250453592.6509238582810531',
    'volumeUsd24Hr': '20837775336.8158968284416711',
    'priceUsd': '1.0007927113064733',
    'changePercent24Hr': '0.1010078632835212',
    'vwap24Hr': '1.0003521044485800',
    'explorer': 'https://www.omniexplorer.info/asset/31',
  },
  {
    'id': 'usd-coin',
    'rank': '4',
    'symbol': 'USDC',
    'name': 'USD Coin',
    'supply': '54399430698.1528200000000000',
    'maxSupply': null,
    'marketCapUsd': '54492359288.5810234021565036',
    'volumeUsd24Hr': '1442267903.9112855456361948',
    'priceUsd': '1.0017082640247439',
    'changePercent24Hr': '0.1224038365462283',
    'vwap24Hr': '0.9993086427840540',
    'explorer': 'https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  {
    'id': 'binance-coin',
    'rank': '5',
    'symbol': 'BNB',
    'name': 'BNB',
    'supply': '166801148.0000000000000000',
    'maxSupply': '166801148.0000000000000000',
    'marketCapUsd': '47284799962.0041650982695676',
    'volumeUsd24Hr': '370241395.7990609671005731',
    'priceUsd': '283.4800631108615937',
    'changePercent24Hr': '-3.4432572668922072',
    'vwap24Hr': '288.5517843856753446',
    'explorer': 'https://etherscan.io/token/0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
  },
];

const PortfolioState: PortfolioType[] = [
  { id: 'bitcoin', name: 'Bitcoin', price: 2000, valueCount: 20 },
  { id: 'ethereum', name: 'Ethereum', price: 2000, valueCount: 20 },
];

const rootReducer = combineReducers({
  values: (state: ValueType[] = ValuesState): ValueType[] => {
    return state;
  },
  portfolio: (state: PortfolioType[] = PortfolioState): PortfolioType[] => {
    return state;
  },
});

export const testStore = createStore(rootReducer);
