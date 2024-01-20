create two folder frontend and hardhat
change directory to hardhat using cd hardhat command
initialize the project using npm init -y command
install hardhat using npm install --save-dev hardhat
install hardhat pluggin using npm install --save-dev @nomicfoundation/hardhat-toolbox
create hardhat project using npx hardhat init
select a javascript project
enter y to add readme

npm install dotenv

create file .env
assign RPC_URL,PRIVATE_KEY, API_KEY
configure hardhat config.js file


npx hardhat compile to compile the code

npx hardhat run scripts/deploy.js --network sepolia

npx hardhat verify --network sepolia 0x66864cDD2A4c15fE5314B6e2C9c51Bc309F1230c

