const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  // create the merkle tree for the whole nice list
  const merkleTree = new MerkleTree(niceList); 
  
  let name = "Greg Crypto Hall";
  let index = niceList.findIndex(n => n === name);
  let proof = merkleTree.getProof(index);
  console.log(`Sending the valid proof for existing name (${name}) ...`)
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    name
  });

  console.log({ gift });

  name = "Greg C. Hall";
  console.log(`Sending the valid proof name (${name}) ...`)
  const { data: noGiftForName } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    name
  });

  console.log({ noGiftForName });

  name = "Greg Crypto Hall";
  console.log(`Sending the ivalid proof for existing name (${name}) ...`)
  proof.pop();
  const { data: noGiftForProof } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    name
  });

  console.log({ noGiftForProof });
}

main();