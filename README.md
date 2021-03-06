# Quickstart

This repository will help you get up to speed with [mangrove.js](https://www.npmjs.com/package/@giry/mangrove.js). Mangrove is currently available on the Mumbai testnet.

How to use:

## Setup
Run `npm install`.

## Configure
Fill in your private key and node url in `.env`, following the template of `.env.example`.

* You can use [Alchemy](https://www.alchemy.com/) to get a Mumbai node. 
* You can generate a private key with `node generate_key.js`. You can use the [Polygon faucet](https://faucet.polygon.technology/) to get some Mumbai MATIC tokens.

Only use the generated keys for testing purposes.

## Run
Run `node index.js` to display all the offers on the WETH/DAI pair.

# Using other mangrove.js versions

## Get latest version
To get the latest mangrove.js, use
```
npm install @giry/mangrove.js@latest
```

## Use local development version
mangrove.js lives in the [Mangrove](https://github.com/giry-dev/mangrove) monorepo. Once you cloned that repo, run `npm link` inside `packages/mangrove.js` (you may need sudo), then `npm link @giry/mangrove.js` in the root directory of this package (e.g. in `demo-mangrove.js`).

# TODO
- [ ] Allow using links to other files to get credentials
- [ ] Start in readonly if no credentials were given
- [ ] Allow connecting to hardware for signing
- [ ] Add link to testnet.mangrove.exchange faucets for other tokens.
