require('dotenv-flow').config();
const { Mangrove } = require("@mangrovedao/mangrove.js");
const { checkAndSetAllowanceIfNeeded, marketbuy, marketsell, getBalances } = require('./utils');
const { Wallet } = require('ethers');
// const prompt = require("prompt-sync")();

const main = async () => {
  const privateKey = process.env.ETHEREUM_PRIVATE_KEY;
  const mgv = await Mangrove.connect({
    provider: process.env.ETHEREUM_NODE_URL,
    privateKey: privateKey
  });

  try {
    const market = await mgv.market({base:"WETH",quote:"DAI"});
    const address = (new Wallet(privateKey)).address;

    await checkAndSetAllowanceIfNeeded(market);

    await getBalances(address, mgv, market.base, market.quote);

    await marketsell(market, '0.0001', '4244');
    // await marketbuy(market, "0.0001", "4300");

    await getBalances(address, mgv, market.base, market.quote);

    await mgv.disconnect();
  } catch(e) {
    await mgv.disconnect();
    console.error(e);
  };
};

main().catch(console.error);
