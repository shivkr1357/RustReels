const { JsonRpc } = require("eosjs");
const config = require("../config");
const fetch = require("node-fetch"); // node only; not needed in browsers

const rpc = new JsonRpc(config.blockchain.httpProviderApi, { fetch });

// Grab EOS block with id
const getPublicSeed = async () => {
  return new Promise(async (resolve, reject) => {
    const attemptGetBlock = async () => {
      try {
        const info = await rpc.get_info();
        const blockNumber = info.last_irreversible_block_num;
        const block = await rpc.get_block(blockNumber);

        if (block && block.id) {
          return resolve(block.id);
        }
      } catch (err) {
        console.error('Failed to get block:', err.message);
        // Wait 5 seconds before retrying
        console.log('Waiting 5 seconds before retrying...');
        await new Promise(res => setTimeout(res, 5000));
        // Try again
        return attemptGetBlock();
      }
    };

    // Start the first attempt
    attemptGetBlock();
  });
};

module.exports = { getPublicSeed };