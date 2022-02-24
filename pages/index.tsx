import type { NextPage } from "next";
import Converter from "../src/Converter";
import ConnectWallet from "../src/ConnectWallet";
import {
    Web3ReactProvider,
    useWeb3React,
    UnsupportedChainIdError,
} from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
}

const Home: NextPage = () => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <div className='container mx-auto justify-center items-center min-h-screen flex flex-col'>
                <Converter />
                <ConnectWallet />
            </div>
        </Web3ReactProvider>
    );
};

export default Home;
