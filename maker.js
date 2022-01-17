
const { Mangrove, Maker } = require('@mangrovedao/mangrove.js');

const main = async () => {
  const mgv = await Mangrove.connect({
    provider: process.env.ETHEREUM_NODE_URL,
    privateKey: process.env.ETHEREUM_PRIVATE_KEY
  });

  try {
    const market = await mgv.market({base:"WETH",quote:"DAI"});

    // Get Mangrove addresses
    console.log(`Mangrove address: ${mgv.getAddress("Mangrove")}`);

    // Check allowances
    const base = await market.base;
    const quote = await market.quote;
    console.log(`${base.name} allowance: ${(await base.allowance()).toFixed(2)}`);
    console.log(`${quote.name} allowance: ${(await quote.allowance()).toFixed(2)}`);
    // Set max allowances
    await market.base.approveMangrove();
    await market.quote.approveMangrove();

    let mkr_address;
    if(!process.env.MAKER_ADDRESS) {
      console.log('Deploy SimpleMaker contract...');
      mkr_address = await Maker.deploy(mgv, "SimpleMaker");
      console.warn('Set the MAKER_ADDRESS of your .env file with the value below:');
      console.warn(`SimpleMaker address: ${mkr_address}`);
    } else {
      mkr_address = process.env.MAKER_ADDRESS;
    }

    console.log('Create Maker API...');
    const maker = await mgv.MakerConnect({base: "WETH", quote: "DAI", address: mkr_address});

    // console.log('Trying to approve Mangrove contract...');
    // const resWETH = await maker.approveMangrove('WETH', 1000);
    // const resDAI  = await maker.approveMangrove('DAI', 1000);
    // console.log(resWETH);
    // console.log(resDAI);

    console.log('Compute provisions...');
    const bidProvision = await maker.computeBidProvision();
    const askProvision = await maker.computeAskProvision();
    console.log(bidProvision);
    console.log(askProvision);

    console.log('Fund with required provision...');
    await maker.fundMangrove(bidProvision);

    console.log('Post an ask offer...');
    const resultAsk = await maker.newAsk({ volume: '0.2', price: '4301'});
    console.log('Ask result:');
    console.log(resultAsk);

    console.log('Posting a bid offer...');
    const resultBid = await maker.newBid({volume: '0.005', price: '4200'});
    console.log('Bid result:');
    console.log(resultBid);

    await mgv.disconnect();
  } catch(e) {
    await mgv.disconnect();
    console.error(e);
  };
};

main().catch(console.error);

