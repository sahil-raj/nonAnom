
# nonAnom

It is an ERC20 token which can be only transfered from one account to other only if the user have em registered which can only happen when the user provide thier phone no (can be anything unique), which is then hashed using sh256 and then stored onchain (again hashed using keccak256 with the account address).

When a person have to track any unsual activity from a list of suspects they can do so by using simple tools and match the user by generating the required hash, hence safeguarding the users privacy all the time. Its just like narrowing down the suspect so much so that you can see it if you have good data.


## Tech Stack

hardhat, solidity, ether.js, chai.js


## Frontend

frontend part of the [portfolio](https://github.com/sahil-raj/nonAnom-ui) 

