
const { Mangrove } = require("@mangrovedao/mangrove.js");
const prompt = require("prompt-sync")();

const signerIndex = 2;

const main = async () => {
  const mgv = await Mangrove.connect({
    provider: process.env.ETHEREUM_NODE_URL,
    privateKey: process.env.ETHEREUM_PRIVATE_KEY
  });

  try {
    const market = await mgv.market({base:"WETH",quote:"DAI"});

    // Check allowances
    const base = await market.base;
    const quote = await market.quote;
    console.log(`${base.name} allowance: ${(await base.allowance()).toFixed(2)}`);
    console.log(`${quote.name} allowance: ${(await quote.allowance()).toFixed(2)}`);
    // Set max allowances
    await market.base.approveMangrove();
    await market.quote.approveMangrove();

    await getBalances("Balance before", base, quote);

    // Buying WETH
    const volume = "0.001";
    prompt(`Proceeds with buying ${volume} WETH?`);
    console.log(`Buying ${volume} WETH...`);

    const result = await market.buy({ volume: volume, price: "4300"});
    console.log("Buy result:");
    console.log(result);
    prompt("Continue?");

    await getBalances("Balance after", base, quote);

    await mgv.disconnect();
  } catch(e) {
    await mgv.disconnect();
    console.error(e);
  };
};

const getBalances = async (label, base, quote) => {
  console.group(label);
  const user = (await hre.ethers.getSigners())[signerIndex];
  console.log(`${base.name}: ${await base.contract.balanceOf(user.address)}`);
  console.log(`${quote.name}: ${await quote.contract.balanceOf(user.address)}`);
  console.groupEnd();
};

main().catch(console.error);

