import { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useLocation,
  useParams,
  Link,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import "../api";

const Container = styled.div`
  padding: 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const Title = styled.h1`
  font-size: 30px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  font-size: 30px;
  text-align: center;
  display: block;
  padding: 20px;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgColor};
  padding: 10px 20px;
  border-radius: 15px;
  text-transform: uppercase;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    margin-bottom: 10px;
    font-size: 13px;
  }
  span:last-child {
    font-size: 20px;
  }
`;

const Description = styled.p`
  padding: 20px 0px;
  line-height: 20px;
`;

const Tab = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
const TapText = styled.span<{ isActive: boolean }>`
  background-color: ${(props) => props.theme.bgColor};
  width: 49%;
  border-radius: 15px;
  text-align: center;
  a {
    display: block;
    padding: 10px;
  }
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: object;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: object;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
  total_supply: number;
  max_supply: number;
  quotes: {
    USD: {
      ath_date: number;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  const chartMatch = useRouteMatch("/:coinId/chart");
  const priceMatch = useRouteMatch("/:coinId/price");

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, []);

  console.log(info);
  console.log(priceInfo);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
      <Overview>
        <OverviewItem>
          <span>rank:</span>
          <span>{info?.rank}</span>
        </OverviewItem>
        <OverviewItem>
          <span>symbol:</span>
          <span>${info?.symbol}</span>
        </OverviewItem>
        <OverviewItem>
          <span>open source:</span>
          <span>{info?.open_source}</span>
        </OverviewItem>
      </Overview>
      <Description>{info?.description}</Description>

      <Overview>
        <OverviewItem>
          <span>total suply:</span>
          <span>{priceInfo?.total_supply.toLocaleString()}</span>
        </OverviewItem>

        <OverviewItem>
          <span>max supply:</span>
          <span>{priceInfo?.max_supply.toLocaleString()}</span>
        </OverviewItem>
      </Overview>
      <Tab>
        <TapText isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`}>Chart</Link>
        </TapText>
        <TapText isActive={priceMatch !== null}>
          <Link to={`/${coinId}/Price`}>Price</Link>
        </TapText>
      </Tab>

      <Switch>
        <Route path={`/:coinId/chart`}>
          <Chart />
        </Route>
        <Route path={`/:coinId/price`}>
          <Price />
        </Route>
      </Switch>
    </Container>
  );
}

export default Coin;
