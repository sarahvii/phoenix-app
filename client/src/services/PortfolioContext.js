import { createContext, useState } from 'react';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
    const [portfolioData, setPortfolioData] = useState(null);
    const [shouldRefresh, setShouldRefresh] = useState(false); // added

    return (
        <PortfolioContext.Provider value={{ portfolioData, setPortfolioData, shouldRefresh, setShouldRefresh }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export default PortfolioContext;
