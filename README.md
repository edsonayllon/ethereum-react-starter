---
author: Edson Ayllon
category: starter project
tags: 
- react
- ethereum
status: complete
twitter: https://twitter.com/relativeread
---

## Starter 7-2019


# ethereum react starter

## 1. Description

A React, Ethereum boilerplate with React Hooks, React Context and a Truffle.js Ethereum instance.

![Screenshot](./Screenshot.jpg)

## 2. Getting Started

### 2.1 Install

Install dependencies for the React Client.

```
cd client
yarn || npm install
```

Compile the smart contract.

```
cd ethereum
truffle develop
> compile
```

### 2.2 Run

Run the client. In `./client`:

```
yarn start || npm run start
```

Run a local Etheruem node. Inside `./ethereum`

```
truffle develop
> migrate
```

Inside truffle, you should see a list of private keys, in addition to a localhost address. This should default to port 9546.

To interact with the smart contract, take that address, `http://localhost:9546`, and add it to Metamask via Networks as a custom RPC.

Within truffle, a contract address for the `SimpleStorage` contract should appear after running `migrate`. Enter that contract address as the contract address within `./client/src/App.js`.





