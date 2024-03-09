//contracts/NonAnom.sol
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NonAnom is ERC20 {

    mapping(address => bytes32) public userList;

    constructor(string memory _uid) ERC20("nonAnom", "NAT") {
        //mint 10000 tokens and assign all the coins to the person deplying the contract
        // 10000 * (10**decimals()) = 10000 * 10^18 as decimals() = 18
        _mint(msg.sender, 10000 * (10**decimals()));
        //add the deployer to the userList
        //get the unique id by getUid
        userList[msg.sender] = getUid(_uid);
    }

    //function to create uid of an user using the hash(sha256) of the uid by the user and its wallet id
    function getUid(string memory _uid) public view returns(bytes32) {
        return keccak256(abi.encodePacked(_uid, msg.sender));
    }

    //override the transfer function to make sure that uid must be there
    function transfer(address to, uint256 value) public override returns (bool) {
        //check if the sender is in userList
        require(userList[msg.sender] != bytes32(0), "sender not found please register");
        //check if reciever is in userList
        require(userList[to] != bytes32(0), "reciever not found please ask them to register");
        address owner = _msgSender();
        _transfer(owner, to, value);
        return true;
    }

    function registerUser(address _user, string memory _uid) public returns(bool) {
        //check if person calling is the person registering
        require(msg.sender == _user, "calling party not registering");
        //register the user
        userList[_user] = getUid(_uid);
        return true;
    }
}