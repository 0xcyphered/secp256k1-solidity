
# SECPK256K1 public key recovery
Library providing arithmetic operations over signed `secpk256k1` signed message due to recover the signer public key EC point in `Solidity`.
  

## Installation

  

```sh

$ yarn install

```

  

## Compile

  

```sh

$ yarn compile

```

  

ABI and bytecode will be in the following path

  

`artifacts/contracts/SECPK256K1.sol/SECPK256K1.json`

  

## Deploy

  

```sh

$ yarn deploy

```
  

## Contract Methods

  
  
### recover
recovers signer public key point value from the signed message and the signature.
`recover(uint256 digest, uint8 v, uint256 r, uint256 s)`
