// https://eth-goerli.g.alchemy.com/v2/O4NA5QAwuRw0SYtqYWF_iQ2LiLZ0LLyQ

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/O4NA5QAwuRw0SYtqYWF_iQ2LiLZ0LLyQ',
      accounts: [ 'dc9f60608f32ab0767dc9bf104d303db7fb5c8738588b3186225fa8143000210' ]
    }
  }
}