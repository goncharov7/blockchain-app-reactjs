# Web 3.0 Project
## https://blockchain-app-reactjs.pages.dev/
![Screenshot_1](https://user-images.githubusercontent.com/92748828/227339001-c27c79e7-e1b7-4f86-973e-b1e77e5804df.png)

This project allows any user to register on the website using their MetaMask wallet and perform transactions to any address in the same network as the user. Using smart contract deployed on Alchemy, each transaction is saved in the local storage and displayed at the bottom of the website with information on the time of sending, the amount of coins, and a comment/gif. By clicking on each transaction at the bottom of the website, the user will be redirected to Etherscan, where they can track all confirmations. The application uses the Goerli test network, but the network can be changed in the hardhat.config.js file.
## Features
+ User registration using MetaMask wallet
+ Transaction history with time of sending, amount of coins, and comments/gif
+ Integration with Etherscan for transaction confirmation tracking
+ Support for the Goerli test network
## Technologies Used
+ React
+ React hooks
+ Vite
+ Tailwind.css
+ Solidity
+ Hardhat
+ Alchemy 3.0
## Installation
```
1. git clone https://github.com/goncharov7/blockchain-app-reactjs.git
2. cd blockchain-app-reactjs/client/
3. npm install
4. npm run dev
```
> Note: You must have MetaMask installed and configured with the Goerli test network to use this application.
## How to Use
1. Connect your MetaMask wallet to the Goerli test network.
2. Register on the website using your MetaMask wallet.
3. Send transactions to any address in the same network as you.
4. Check the transaction history at the bottom of the website, and click on any transaction to track confirmations on Etherscan.
