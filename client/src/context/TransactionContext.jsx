import React, {useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress} from '../utils/constants';

export const TransactionContext = React.createContext();

const {ethereum} = window;

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  
    return transactionsContract;
};

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    const [isLoading, setIsloading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}));
    }

    const getAllTransactions = async () => {
        try {
          if (ethereum) {
            const transactionsContract = createEthereumContract();
    
            const availableTransactions = await transactionsContract.getAllTransactions();
    
            const structuredTransactions = availableTransactions.map((transaction) => ({
              addressTo: transaction.receiver,
              addressFrom: transaction.sender,
              timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
              message: transaction.message,
              keyword: transaction.keyword,
              amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));
    
            console.log(structuredTransactions);
    
            setTransactions(structuredTransactions);
          } else {
            console.log("Ethereum is not present");
          }
        } catch (error) {
          console.log(error);
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Install Metamastk");

            const accounts = await ethereum.request({method: 'eth_accounts'});
            
            if(accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();

            } else {
                console.log('No accounts found');
            }
        } catch (error) {
            console.log(error);

            throw new Error("No eth object1.")
        }
    }

    const checkIfTransactionsExists = async () => {
        try {
          if (ethereum) {
            const transactionContract = createEthereumContract();
            console.log(transactionContract, 'проверка')
            
            const currentTransactionCount = await transactionContract.getTransactionCount(currentAccount);
    
            window.localStorage.setItem("transactionCount", currentTransactionCount);
          }
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object2.0");
        }
    };

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
            const transactionContract = createEthereumContract();
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

            setTransactionCount(transactionCount.toNumber());
        } catch (error) {
            console.log(error);
            throw new Error("No eth object3.")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExists();
    }, []);

    return (
        <TransactionContext.Provider value = {{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}