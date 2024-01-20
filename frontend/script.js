const connectWalletMsg= document.querySelector('#connectWalletMessage');
const connectWalletBtn= document.querySelector('#connectWallet');
const votingStation= document.querySelector('#votingStation');
const time= document.querySelector('#time');
const timeerMsg= document.querySelector('#timerMessage');
const mainBoard= document.querySelector('#mainBoard');
const voteForm= document.querySelector('#voteForm');
const vote= document.querySelector('#vote');
const voteBtn= document.querySelector('#sendVote');
const showResultContainer= document.querySelector('#showResultContainer');
const showResult= document.querySelector('#showResult');
const result= document.querySelector('#result');
const admin= document.querySelector('#admin');
const startAnElection= document.querySelector('#startAnElection');
const candidates= document.querySelector('#candidates');
const electionDuration= document.querySelector('#electionDuration');


const addTheCandidate= document.querySelector('#addTheCandidate');
const candidate= document.querySelector('#candidate');

contractAddress="0xDd8215512f2245463929Fa7B1d5EEe6cD3a9b49f"
contractABI= [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "numOfVotes",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "checkElectionPeriod",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "electionTimer",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "resetAllVoterStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "retrieveVotes",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "numOfVotes",
              "type": "uint256"
            }
          ],
          "internalType": "struct Voting.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "_candidates",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "electionDuration",
          "type": "uint256"
        }
      ],
      "name": "startElection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "voteTo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "voterList",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "voterStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingEnd",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingStarted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]


  let contract;
  let signer;

  const provider= new ethers.providers.Web3Provider(window.ethereum, 11155111)

  provider.send('eth_requestAccounts',[]).then(()=>{
    provider.listAccounts().then((accounts)=>{
        signer=provider.getSigner(accounts[0]);
        contract= new ethers.Contract(contractAddress,contractABI,signer);
    });
  });



  const getAllCandidates= async function(){

    if(document.getElementById('candidateBoard')){
        document.getElementById('candidateBoard').parentNode.removeChild(document.getElementById('candidateBoard'));
       // document.getElementById('candidateBoard').remove;
    }

    let board=document.createElement('table');
    board.id="candidateBoard";

    mainBoard.appendChild(board);

    let tableHeader=document.createElement('tr');
    tableHeader.innerHTML=`<th>Candidate id</th>
                            <th> candidate name</th>`;

    board.appendChild(tableHeader);

    let candidates= await contract.retrieveVotes();

    for(let i=0; i<candidates.length; i++){

        let candidate=document.createElement('tr');
        candidate.innerHTML=`<td>${candidates[i][0]}</td>
                            <td>${candidates[i][1]}</td>`;

        board.appendChild(candidate);

    }


  }







  const getResult= async function(){

    result.style.display='flex';

    if(document.getElementById('resultBoard')){
        document.getElementById('resultBoard').parentNode.removeChild(document.getElementById('resultBoard'));

        
    }

    let resultBoard=document.createElement('table');
    resultBoard.id="resultBoard";

    result.appendChild(resultBoard);

    let tableHeader=document.createElement('tr');
    tableHeader.innerHTML=`<th>Candidate id</th>
                            <th> candidate name</th>
                            <th> Number of votes</th>`;

     resultBoard.appendChild(tableHeader);

    let candidates= await contract.retrieveVotes();

    for(let i=0; i<candidates.length; i++){

        let candidate=document.createElement('tr');
        candidate.innerHTML=`<td>${candidates[i][0]}</td>
                            <td>${candidates[i][1]}</td>
                            <td>${candidates[i][2]}</td>`;

        resultBoard.appendChild(candidate);

    }


  }



  const refreshPage=function(){


   setInterval(async()=>{

    let time= await contract.electionTimer();

    if(time>0){
        timeerMsg.innerHTML=`<span id="time">${time}</span> seconds left`;
        voteForm.style.display='flex';
        showResultContainer.style.display='none';
    }else{
        timeerMsg.textContent="Either there is no election ongoing or election has ended";
        voteForm.style.display='none';
        showResultContainer.style.display='block';

    }


   },1000);


   setInterval(async()=>{

    getAllCandidates();

   },10000);


  }



  const sendVote=async function(){

    await contract.voteTo(vote.value)
    vote.value="";

  }




  const startElection= async function(){

    if(!candidates.value){
        alert("Candidates name is empty");
    }

    if(!electionDuration){
        alert("Please give election duration");
    }

    const _candidates = candidates.value.split(',');
    const _electionDuration = electionDuration.value;

    await contract.startElection(_candidates, _electionDuration);

    refreshPage();
    
    candidates.value="";
    electionDuration.value="";

    voteForm.style.display="flex";
    showResultContainer.style.display="none";


  }


  const addCandidate=async function(){

    if(!candidate.value){
        alert("please enter a candidate");
    }

    await contract.addCandidate(candidate.value);
    refreshPage();
    
    candidate.value="";

  }




  const getAccount= async function(){
    console.log("ghf")

const ethAccounts= await provider.send('eth_requestAccounts',[]).then(()=>{
    provider.listAccounts().then((accounts)=>{
        signer=provider.getSigner(accounts[0]);
        contract= new ethers.Contract(contractAddress,contractABI,signer);
    });
  });


  connectWalletBtn.textContent=signer._address.slice(0,10)+"...";
  connectWalletMsg.textContent="you are connected";
  connectWalletBtn.disable=true;


  let owner=await contract.owner();
  if(owner==signer._address){
    admin.style.disable="flex";
    let time=await contract.electionTimer();

    if(time==0){
         contract.checkElectionPeriod();
    }
  }


  votingStation.style.display="block";

  refreshPage();
  getAllCandidates();



  }


  voteBtn.addEventListener('click',sendVote);
  showResult.addEventListener('click',getResult);
  startAnElection.addEventListener('click',startElection);
  addTheCandidate.addEventListener('click',addCandidate);
  connectWalletBtn.addEventListener('click',getAccount);





