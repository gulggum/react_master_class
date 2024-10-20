const BASE_URL = "https://api.coinpaprika.com/v1";
const NiCO_URL = "https://ohlcv-api.nomadcoders.workers.dev?coinId=";

export async function fetchCoins() {
  return await (await fetch(`${BASE_URL}/coins`)).json();
}

export async function fetchCoinInfo(coinId: string) {
  return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
}

export async function fetchCoinTickers(coinId: string) {
  return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
}

export async function fethchCoinChart(coinId: string) {
  return await (await fetch(`${NiCO_URL}${coinId}`)).json();
}

export async function fetchCoinPrices(coinId: string) {
  const info = await (await fetch(`${NiCO_URL}${coinId}`)).json();
  return info[0];
}
