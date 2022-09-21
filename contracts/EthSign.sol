pragma solidity =0.8.17;

import './SECP256K1.sol';

contract EthSign {
    function recoverPersonalSignAddress(
        bytes32 message,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public pure returns (address) {
        bytes memory publicKey = recoverPersonalSignPublicKey(message, v, r, s);
        return address(uint160(uint256(keccak256(publicKey))));
    }

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
