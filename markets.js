
const { Mangrove } = require('@mangrovedao/mangrove.js');

const main = async () => {
  const mgv = await Mangrove.connect({ provider: process.env.ETHEREUM_NODE_URL });

  try {
    const markets = {
      'WETH:DAI': await mgv.market({base:"WETH",quote:"DAI"}),
      'WETH:USDC': await mgv.market({base:"WETH",quote:"USDC"}),
      'DAI:USDC': await mgv.market({base:"DAI",quote:"USDC"})
    };

    console.group('Markets order books');
    for(const [pair, market] of Object.entries(markets)) {
      console.log(`requestBook for ${pair} market:`);
      console.log(await market.requestBook());
    }
    console.groupEnd();

    console.group('Listen to market events...');
    for(const [pair, market] of Object.entries(markets)) {
      market.subscribe((event) => {
        console.log(`${pair} market event:`);
        console.log(event);
      });
      console.log(`Subscribed to ${pair} market...`);
    }
    console.log('');
  } catch(e) {
    console.error(e);
    await mgv.disconnect();
  };
};

main().catch(console.error);

