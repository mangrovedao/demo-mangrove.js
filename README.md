# Quickstart

This repository will help you get up to speed with [mangrove.js](https://www.npmjs.com/package/@mangrovedao/mangrove.js). Mangrove is currently available on the Mumbai testnet.

How to use:

## Setup

Run `yarn install`.

## Configure

Fill in your private key and node url in `.env`, following the template of `.env.example`.

* You can use [Alchemy](https://www.alchemy.com/) to get a Mumbai node. 
* You can generate a private key with `node generate_key.js`. You can use the [Polygon faucet](https://faucet.polygon.technology/) to get some Mumbai MATIC tokens.

Only use the generated keys for testing purposes.

## Run

Run `yarn ts-node markets.ts` to display all the offers on WETH/DAI, WETH/USDC and DAI/USDC pairs.

Run `yarn ts-node maker.ts` to create an offer on WETH/DAI market.

Run `yarn ts-node taker.ts` to execute a market order on WETH/DAI market.

# Using other mangrove.js versions

## Get latest version

To get the latest mangrove.js, use

```
yarn install @mangrovedao/mangrove.js@latest
```

## Use local development version

mangrove.js lives in the [Mangrove](https://github.com/mangrovedao/mangrove) monorepo. Once you cloned that repo, run `npm link` inside `packages/mangrove.js` (you may need sudo), then `npm link @mangrovedao/mangrove.js` in the root directory of this package (e.g. in `demo-mangrove.js`).

# TODO

- [ ] Allow using links to other files to get credentials
- [ ] Start in readonly if no credentials were given
- [ ] Allow connecting to hardware for signing
- [ ] Add link to testnet.mangrove.exchange faucets for other tokens.
