require('dotenv-flow').config();
const { checkAndSetAllowanceIfNeeded, postAskOffer, postBidOffer, createSimpleMaker, sleep } = require('./utils');
const { Mangrove, LiquidityProvider } = require('@mangrovedao/mangrove.js');

const main = async () => {
  const mgv = await Mangrove.connect({
    provider: process.env.ETHEREUM_NODE_URL,
    privateKey: process.env.ETHEREUM_PRIVATE_KEY
  });

  try {
    const market = await mgv.market({base:"WETH",quote:"DAI"});
    console.log(`Mangrove address: ${mgv.getAddress("Mangrove")}`);

    await checkAndSetAllowanceIfNeeded(market);

    // Create EOA Liquidity Provider
    // const lp = await mgv.liquidityProvider(market);

    // Create on-chain Simple Maker ...
    let maker = await createSimpleMaker(mgv);
    console.log('Create associated Liquidity Provider...');
    const lp = new LiquidityProvider({mgv: mgv, logic: maker, market: market});

    // ... and post ask or bid offers
    await postAskOffer(lp, '0.1', '4304');
    // await postBidOffer(maker, '0.005', '4200');

    await mgv.disconnect();
  } catch(e) {
    await mgv.disconnect();
    console.error(e);
  };
};

main().catch(console.error);
