import Lottery from "./abi/Lottery.json";
import web3 from "./web3";

export default new web3.eth.Contract(
  JSON.parse(Lottery.interface),
  "0xbcb9ed44487c4d83271097d88eacac6992edbb1b"
);
