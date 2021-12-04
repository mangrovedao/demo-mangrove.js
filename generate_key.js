// Generates a new random private key and display the associated address
import ethers from "ethers";

const w = ethers.Wallet.createRandom();

console.log("Private key");
console.log(w.privateKey.slice(2));
console.log("\nAssociated address");
console.log(w.address);
console.log("\nDon't do anything sensitive with this private key");