//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract UpgradableContract is Initializable {
    uint private _value;

    event valueChanged(uint256 value);

    function initialize(uint256 value) public initializer {
        _value = value;
        emit valueChanged(value);
    }

    function retrieve() public view returns(uint256) {
        return _value;
    }
}