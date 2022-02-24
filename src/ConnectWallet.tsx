import React, { useState, useEffect } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";
import { useEagerConnect, useInactiveListener } from "./hooks";
import { injected } from "./connectors";
import { useModal, ModalView } from "./Modal";
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";

function getErrorMessage(error: Error) {
    if (error instanceof NoEthereumProviderError) {
        return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    } else if (error instanceof UnsupportedChainIdError) {
        return "You're connected to an unsupported network. Change the network to BNB Smart Chain - Testnet";
    } else if (error instanceof UserRejectedRequestErrorInjected) {
        return "Please authorize this website to access your Ethereum account.";
    } else {
        console.error(error);
        return "An unknown error occurred. Check the console for more details.";
    }
}

const ConnectWallet = () => {
    const {
        active,
        account,
        library,
        connector,
        deactivate,
        activate,
        error,
        chainId,
    } = useWeb3React();
    const [balance, setBalance] = useState(0);

    const connect = async () => {
        try {
            await activate(injected);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect((): any => {
        if (!!account && !!library) {
            let stale = false;

            library
                .getBalance(account)
                .then((balance: any) => {
                    if (!stale) {
                        setBalance(balance);
                    }
                })
                .catch(() => {
                    if (!stale) {
                        setBalance(0);
                    }
                });

            return () => {
                stale = true;
                setBalance(0);
            };
        }
    }, [account, library, chainId]);

    const { showModal, toggleModal } = useModal();

    return (
        <>
            <ModalView
                title='Wallet Details'
                showModal={showModal}
                toggleModal={toggleModal}
            >
                {error && (
                    <p className='my-2 text-red-500'>
                        {getErrorMessage(error)}
                    </p>
                )}

                {active && !error && (
                    <div>
                        <p>Account : {account}</p>
                        <p>Chain ID: {chainId}</p>
                        <p>Balance : {`Ξ${formatEther(balance)}`}</p>
                    </div>
                )}

                {active ? (
                    <button
                        onClick={deactivate}
                        className='px-6 py-4 w-full my-2 border shadow-md rounded-sm'
                    >
                        Disconnect
                    </button>
                ) : (
                    <button
                        onClick={connect}
                        className='px-6 py-4 w-full my-2 border shadow-md rounded-sm'
                    >
                        Connect
                    </button>
                )}
            </ModalView>
            <button
                onClick={toggleModal}
                className='px-6 py-4 border shadow-md rounded-sm'
            >
                Wallet Details
            </button>
        </>
    );
};

export default ConnectWallet;
