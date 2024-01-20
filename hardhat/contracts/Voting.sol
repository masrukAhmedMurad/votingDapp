// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Voting{


//create candidate

struct Candidate{
    uint256 id;
    string name;
    uint256 numOfVotes;
}

//create candidatelist

Candidate[] public candidates;

//owners address

address public owner;

// all voters

mapping(address=>bool) public voters;

//list of voters who voted
address[] public voterList;

//election time
uint256 public votingStart;
uint256 public votingEnd;

//election status
bool public votingStarted;

//restrict action to only owner

modifier OnlyOwner(){
    require(owner==msg.sender,"You are not an authorized person");
    _;
}

modifier ElectionOngoing(){

require(votingStarted==true,"No voting is ongoing");
_;

}


//constructor
constructor(){
    owner = msg.sender;
}


//start election function

function startElection(
    string[] memory _candidates,
    uint256 electionDuration) public OnlyOwner{

        require(votingStarted==false,"An election is ongoing");
        delete candidates;
        resetAllVoterStatus();

        for(uint256 i = 0; i < _candidates.length; i++){
            candidates.push(
                Candidate({id:i, name:_candidates[i], numOfVotes:0})
                );
        }

        votingStarted = true;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (electionDuration * 1 minutes);

    }




//add candidtate function

function addCandidate(

    string memory _name

    )public OnlyOwner ElectionOngoing{

        candidates.push(
            Candidate({id: candidates.length, name: _name, numOfVotes:0})
            );


}



//get voter status function

function voterStatus(
    address _voter
    )public view ElectionOngoing returns(bool){

if(voters[_voter]){
    return false;
}else{
    return true;
}

}



//votoTo function

function voteTo(uint256 _id)public ElectionOngoing{

require(checkElectionPeriod(),"Election period has ended");
require(voterStatus(msg.sender),"You have voted Once");

candidates[_id].numOfVotes++;
voters[msg.sender] = true;
voterList.push(msg.sender);


}


//retrieve votes function

function retrieveVotes()public view returns(Candidate[] memory){
    return candidates;
}


//electiontimer function

function electionTimer()public view ElectionOngoing returns(uint){
    if(block.timestamp >= votingEnd){
        return 0;
    }else{
        return (votingEnd - block.timestamp);
    }
}



//checkElectionPeriod() function

function checkElectionPeriod() public returns(bool){
    if(electionTimer()>0){
        return true;
    }else{

        votingStarted = false;
        return false;
    }
}



//reset all voter status.

function resetAllVoterStatus()public OnlyOwner{

for(uint256 i = 0; i < voterList.length; i++){
    voters[voterList[i]] = false;
}

delete voterList;

}






}


