//SPDX-License-Identifier:MIT
//Deployed Contract At 0xF112dE731f4Bb9C6EdB77A9E2A9cf8ec303c41b8
pragma solidity ^0.8.4;


import "@openzeppelin/contracts/access/Ownable.sol";

contract BuyMeACoffee is Ownable{
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    ); //event when a memmo created
    //memo struct
    struct Memo{
        address from;
        
        uint256 timestamp;
        string name;
        string message;

    }
    //list of all memos received from friends
    Memo[] memos;
    //address owner contract

    

    constructor(){
        

    }
    /**
    
    * @dev buy a coffee for contract owner
    * @param _name name of the coffee buyer
    * @param _message a nice message from the coffee
    */

    function buyACoffee(string memory _name, string memory _message) public payable{
        require(msg.value >0, "can't buy a coffee with 0 ether");
        

        //add memo to storage
        memos.push(
            Memo(
                msg.sender,
                block.timestamp,
                _name,
                _message
            )
        );
        //event
        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );

    }
    /**
     * 
     *  @dev send the entrie balance stored in this contract to the owner  
     
     */

    function getMemos() public view returns(Memo[] memory){
        
        return memos;
    }

    
     function withdraw(address _addr) external onlyOwner{
        uint256 balance = address(this).balance;
        payable(_addr).transfer(balance);
        
    }

    // function withdraw ()public{
    //     require(address(this).balance >0 , "Balance is 0");
    //     require(msg.sender == owner, "You aren't the owner");
    //     owner.transfer(address(this).balance);
    //     }





}