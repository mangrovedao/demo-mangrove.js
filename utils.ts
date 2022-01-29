const { OfferLogic } = require('@mangrovedao/mangrove.js');

const checkAndSetAllowanceIfNeeded = async (market) => {
  const baseAllowance = await market.base.allowance();
  const quoteAllowance = await market.quote.allowance();
  console.group('Allowances');
  console.log(`${market.base.name}: ${baseAllowance.toFixed(2)}`);
  console.log(`${market.quote.name}: ${quoteAllowance.toFixed(2)}`);

  if(baseAllowance == 0 || quoteAllowance == 0) {
    console.log('Approve Mangrove contract to use base & quote tokens...');
    await market.base.approveMangrove();
    await market.quote.approveMangrove();
    await sleep(5);
  }
  console.groupEnd();
};

const postAskOffer = async (lp, volume, price) => {
  const provision = await lp.computeAskProvision();
  console.group('Post ask offer...');
  if(provision > 0) {
    console.log(`Fund with required provision (${provision}) ...`);
    await lp.fundMangrove(provision);
  }

  console.log('Posting offer...');
  const result = await lp.newAsk({volume: volume, price: price});
  console.log('Ask result:');
  console.log(result);
  console.groupEnd();
  return result;
};

const postBidOffer = async (lp, volume, price) => {
  const provision = await lp.computeBidProvision();
  console.group('Post bid offer...');
  if(provision > 0) {
    console.log(`Fund with required provision (${provision}) ...`);
    await lp.fundMangrove(provision);
  }

  console.log('Posting offer...');
  const result = await lp.newBid({volume: volume, price: price});
  console.log('Bid result:');
  console.log(result);
  return result;
};

const marketbuy = async (market, volume, price) => {
  console.group('Market order');
  console.log(`Trying to buy ${volume} ${market.base.name} @ ${price}`);
  const result = await market.buy({volume: volume, price: price});
  console.log(result);
  console.groupEnd();
  return result;
};

const marketsell = async (market, volume, price) => {
  console.group('Market order');
  console.log(`Trying to sell ${volume} ${market.base.name} @ ${price}`);
  const result = await market.sell({volume: volume, price: price});
  console.log(result);
  console.groupEnd();
  return result;
};

const createSimpleMaker = async (mgv) => {
  let mkr_address;
  console.group('Deploy SimpleMaker contract...');
  if(!process.env.MAKER_ADDRESS) {
    mkr_address = await OfferLogic.deploy(mgv, "SimpleMaker");
    console.warn('Set the MAKER_ADDRESS of your .env file with the value below:');
    console.warn(`SimpleMaker address: ${mkr_address}`);
    await sleep(3);
  } else {
    mkr_address = process.env.MAKER_ADDRESS;
    console.log(`Use already deployed SimpleMaker: ${mkr_address}`);
  }
  console.groupEnd();
  return new OfferLogic(mgv, mkr_address);
};

const getBalances = async (address, mgv, base, quote) => {
  console.group(`Balances of ${address}`);
  const balance_base = await base.contract.balanceOf(address);
  const balance_quote = await quote.contract.balanceOf(address);
  console.log(`${base.name}: ${mgv.fromUnits(balance_base, base.name)}`);
  console.log(`${quote.name}: ${mgv.fromUnits(balance_quote, quote.name)}`);
  console.groupEnd();
};

const sleep = async (delay_sec) => {
  console.log(`😪 😪 for ${delay_sec} seconds...`);
  new Promise(f => setTimeout(f, delay_sec * 1000));
};

export {
  checkAndSetAllowanceIfNeeded,
  postAskOffer,
  postBidOffer,
  marketbuy,
  marketsell,
  createSimpleMaker,
  getBalances
};
