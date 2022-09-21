
# SECPK256K1 public key recovery
Library providing arithmetic operations over signed `secpk256k1` signed message due to recover the signer public key EC point in `Solidity`.
  

## Installation

  

```sh

$ yarn add https://github.com/0xcyphered/secp256k1-solidity

```


## Contract Methods

  
  
### recover
recovers signer public key point value from the signed message and the signature.
`recover(uint256 digest, uint8 v, uint256 r, uint256 s)`


### Contract example

```solidity
//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "@0xcyphered/secp256k1-solidity/contracts/SECP256K1.sol";

contract Example {
    function recoverPersonalSignPublicKey(
        bytes32 message,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public pure returns (bytes memory) {
        string memory header = '\x19Ethereum Signed Message:\n32';
        bytes32 _message = keccak256(abi.encodePacked(header, message));
        (uint256 x, uint256 y) = SECP256K1.recover(uint256(_message), v - 27, uint256(r), uint256(s));
        return abi.encodePacked(x, y);
    }
}
```