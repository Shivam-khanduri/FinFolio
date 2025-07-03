import React from 'react';
import Portfolio from '../components/Portfolio'; 

const symbolsToMerge = ['AAPL', 'GOOGL', 'TSLA', 'AMZN', 'NFLX'];

const PortfolioPage = () => {
  return (
    <div>
      <Portfolio mergeSymbols={symbolsToMerge} />
    </div>
  );
};

export default PortfolioPage;
