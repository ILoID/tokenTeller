export type TokenInfo = {
    audit: {
        is_contract_renounced: boolean;
        codeVerified: boolean;
        date: string;
        lockTransactions: boolean;
        mint: boolean;
        provider: string;
        proxy: boolean;
        status: string;
        unlimitedFees: boolean;
        version: number;
    };
    decimals: number;
    info: {
        description: string;
        email: string;
        extraInfo: string;
        nftCollection: string;
        ventures: boolean;
    };
    links: {
        bitbucket: string;
        discord: string;
        facebook: string;
        github: string;
        instagram: string;
        linkedin: string;
        medium: string;
        reddit: string;
        telegram: string;
        tiktok: string;
        twitter: string;
        website: string;
        youtube: string;
    };
    logo: string;
    metrics: {
        maxSupply: number;
        totalSupply: number;
        holders: number;
        txCount: number;
        circulatingSupply: number;
    };
    name: string;
    symbol: string;
    totalSupply: string;
    creationBlock: number;
    reprPair: {
        id: {
            chain: string;
            exchange: string;
            pair: string;
            token: string;
            tokenRef: string;
        };
        price: number;
    };
    pairs: {
        address: string;
        exchange: string;
        dextScore: number;
        price: number;
        tokenRef: {
            address: string;
            name: string;
            symbol: string;
        };
    }[];
    chain: string;
    address: string;
};