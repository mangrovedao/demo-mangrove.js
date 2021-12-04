import dotenv from "dotenv";
dotenv.config();

import {Mangrove} from '@giry/mangrove.js';

const mgv = await Mangrove.connect({
  provider: process.env.ETHEREUM_NODE_URL,
  privateKey: process.env.ETHEREUM_PRIVATE_KEY
});

const market = await mgv.market({base:"WETH",quote:"DAI"});

console.log(await market.requestBook());
