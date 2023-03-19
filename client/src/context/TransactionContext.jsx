import React, {useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress} from '../utils/constants';

export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum); 
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    const [isLoading, setIsloading] = useState(false);
    const [transactionCount, seTtransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}));
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Install Metamastk");

            const accounts = await ethereum.request({method: 'eth_accounts'});
            
            if(accounts.length) {
                setCurrentAccount(accounts[0]);
    
                const {addressTo, amount, keyword, message} = formData;
            } else {
                console.log('No accounts found');
            }
        } catch (error) {
            console.log(error);

            throw new Error("No eth object1.")
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Install Metamastk");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'}); 

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No eth object2.")
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Install Metamastk");
            
            const {addressTo, amount, keyword, message} = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount._hex
                }]
            });

            console.log(transactionContract) 
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);


            setIsloading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setIsloading(false);

            const transactionCount = await transactionContract.getTransactionCount();

            seTtransactionCount(transactionCount.toNumber());
        } catch (error) {
            console.log(error);
            throw new Error("No eth object3.")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TransactionContext.Provider value = {{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}