const hre = require("hardhat")
const { items } = require("../src/items.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts
  const [deployer] = await ethers.getSigners()

  // Deploy Dappazon
  const Yazon = await hre.ethers.getContractFactory("Yazon")
  const yazon = await Yazon.deploy()
  await yazon.deployed()

  console.log(`Deployed Dappazon Contract at: ${yazon.address}\n`)

  // Listing items...
  for (let i = 0; i < items.length; i++) {
    const transaction = await yazon.connect(deployer).list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock,
    )

    await transaction.wait()

    console.log(`Listed item ${items[i].id}: ${items[i].name}`)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});