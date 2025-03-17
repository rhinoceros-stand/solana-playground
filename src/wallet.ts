import * as dotenv from 'dotenv'
import * as bip39 from 'bip39'
import bs58 from 'bs58'
import { Keypair } from '@solana/web3.js'

const KEY_PAIR_VARIABLE = 'KEY_PAIR'

dotenv.config({
  path: ['.env.local', 'env']
})

let wallet: Keypair
let mnemonic

if (process.env[KEY_PAIR_VARIABLE]) {
  mnemonic = process.env[KEY_PAIR_VARIABLE]
} else {
  mnemonic = bip39.generateMnemonic()
}

const seed = bip39.mnemonicToSeedSync(mnemonic)
wallet = Keypair.fromSeed(seed.slice(0, 32))

export {
  wallet
}
