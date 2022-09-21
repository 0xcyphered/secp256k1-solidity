const { expect } = require('chai')
const keccak256 = require('keccak256')
describe('SECP256k1 Ethereum', function () {
  let secp256k1
  let signature
  let msg
  let addr1
  let addr2
  let addrs

  beforeEach(async function () {
    ;[deployer, addr1, addr2, ...addrs] = await ethers.getSigners()

    const SECP256K1 = await ethers.getContractFactory('SECP256K1')
    secp256k1 = await SECP256K1.deploy()

    msg = `${Math.random()}`
    msgHash = await keccak256(msg)
    signature = await addr1.signMessage(msgHash)
  })

  describe('Recover', function () {
    it('verify by wallet', async function () {
      const signer = await ethers.utils.verifyMessage(msgHash, signature)
      expect(signer).to.equal(addr1.address)
    })

    it('verify by contract', async function () {
      const EthSign = await ethers.getContractFactory('EthSign', {
        libraries: {
          SECP256K1: secp256k1.address,
        },
      })
      const ethSign = await EthSign.deploy()

      var { v, r, s } = ethers.utils.splitSignature(signature)

      const signer = await ethSign.recoverPersonalSignAddress(msgHash, v, r, s)
      expect(signer.toLowerCase()).to.equal(addr1.address.toLowerCase())
    })
  })
})
