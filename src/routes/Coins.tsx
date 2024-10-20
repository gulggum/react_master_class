import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

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
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
`;
const ToggleLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0px 30px 0px;
  span:first-child {
    font-size: 18px;
    display: block;
    margin-left: 12px;
  }
`;

const Toggle = styled.span`
  width: 36px;
  height: 20px;
  cursor: pointer;
  font-size: 20px;
  margin-left: 5px;
  display: block;
  margin-top: 3px;
`;

const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.listColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    display: block;
    display: flex;
    align-items: center;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Loader = styled.span`
  font-size: 30px;
  text-align: center;
  display: block;
  padding: 20px;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((current) => !current);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      <ToggleLine>
        <span>{isDark ? "Dark" : "Light"}</span>
        <Toggle onClick={toggleDarkAtom}>{isDark ? "🌙" : "☀️"}</Toggle>
      </ToggleLine>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
