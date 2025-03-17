import * as dotenv from 'dotenv'
import { generateExtractableKeyPairSigner } from 'gill'
import {
  saveKeypairSignerToEnvFile,
  loadKeypairFromEnvironment
} from 'gill/node'

const KEY_PAIR_VARIABLE = 'KEY_PAIR'

dotenv.config({
  path: ['.env.local', 'env']
})

let wallet

if (process.env[KEY_PAIR_VARIABLE]) {
  const signer = await loadKeypairFromEnvironment(KEY_PAIR_VARIABLE)
  wallet = signer.privateKey
} else {
  try {
    // extractable and less secure keypair
    const extractableSigner = await generateExtractableKeyPairSigner()
    await saveKeypairSignerToEnvFile(extractableSigner, KEY_PAIR_VARIABLE, '.env.local')
    const signer = extractableSigner.keyPair
    wallet = signer.privateKey
  } catch (e) {
    console.error('Generate Extract KeyPair error', e)
  }
}

export default {
  wallet
}
