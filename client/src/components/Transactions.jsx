import { TransactionDescription } from "ethers/lib/utils";
import React, {useContext} from "react";

import {TransactionContext} from '../context/TransactionContext'

import dumpData from '../utils/dumpData';
import { shortAddress } from "../utils/shortAddress";
import useFetch from "../hooks/useFetch";

const TransactionCard = ({addressTo, addressFrom, timestamp, message, keyword, amount, url}) => {
    const gifUrl = useFetch({ keyword });

    return (
        <div className="bg-[#181918] m-4 flex flex-1
            2xl:min-w-[450px]
            2xl:max-w-[500px]
            2sm:min-w-[270px]
            2sm:max-w-[300px]
            min-w-full
            flex-col p-3 rounded-md hover:shadow-2xl"
            >
            <div className="flex flex-col items-center w-full mt-3">
                <div className="flex justify-start w-full mb-6 p-2">
                    <a href={`https://goerli.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">From: {shortAddress(addressFrom)}</p>
                    </a>
                    <a href={`https://goerli.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">To: {shortAddress(addressTo)}</p>
                    </a>
                    <p className="text-white text-base">Abount: {amount} ETH </p>
                    {message && (
                        <>
                            <br/>
                            <p className="text-white text-base">Message: {message}</p>
                        </>
                    )}
                </div>

                    <img 
                        src={gifUrl || url} 
                        alt="gif"
                        className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover" 
                    />
                    <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                        <p className="text-[#37c7da] font-bold">{timestamp}</p>
                    </div>
            </div>
        </div>
    )
}
const Transactions = () => {
    const {currentAccount} = useContext(TransactionContext);
    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2">Connect ur account to see latest changes</h3>
                )}

                <div className="flex flex-wrap justify-center items-center mt-10">
                    {dumpData.reverse().map((transaction, i) => (
                        <TransactionCard key={i} {...transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Transactions;