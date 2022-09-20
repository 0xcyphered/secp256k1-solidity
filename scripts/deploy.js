async function main() {
  const SECP256K1 = await ethers.getContractFactory('SECP256K1')
  const contract = await SECP256K1.deploy()
  console.log('lib:', contract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
