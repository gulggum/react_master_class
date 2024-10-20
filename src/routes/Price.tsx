import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinPrices } from "../api";

const PriceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.listColor};
  padding: 10px 20px;
  border-radius: 15px;
  text-transform: uppercase;
  margin-top: 20px;
  &span {
    padding: 20px;
    background-color: tomato;
  }
`;

interface IPrice {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IPrice>(["price", coinId], () =>
    fetchCoinPrices(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <div>
          <PriceInfo>
            <span>Open</span>
            <span>$ {Number(data?.open).toLocaleString()}</span>
          </PriceInfo>
          <PriceInfo>
            <span>Close</span>
            <span>$ {Number(data?.close).toLocaleString()}</span>
          </PriceInfo>
          <PriceInfo>
            <span>High</span>
            <span>$ {Number(data?.high).toLocaleString()}</span>
          </PriceInfo>
          <PriceInfo>
            <span>Low</span>
            <span>$ {Number(data?.low).toLocaleString()}</span>
          </PriceInfo>
        </div>
      )}
    </div>
  );
}

export default Price;
