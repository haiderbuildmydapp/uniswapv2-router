import { create } from "ipfs-http-client";
import Papa from "papaparse";
import io from "socket.io-client";
import Moralis from "moralis";
import { APIPath, Ipfs } from "./constant";
import env from "../environment";

export class PackagesUtility {
  static ipfsClient = async (file) => {
    try {
      const client = await create(Ipfs.ADDRESS);
      const result = await client.add(file);
      const url = `${Ipfs.PATH}/${result.path}`;
      return url;
    } catch (error) {
      console.log(error, "ipfsError");
    }
  };

  static socketIO = () => {
    const ENDPOINT = env.BACKEND_BASE_URL;
    const socket = io(ENDPOINT);
    return socket;
  };

  static csvToJson = async (event, setJson) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      if (files) {
        await Papa.parse(files[0], {
          complete: (results) => {
            setJson(results.data);
          },
          header: true,
          skipEmptyLines: true,
        });
      }
    }
  };

  static moralisNfts = async (userAddress, contractAddress) => {
    let userCollection = new Array();
    Moralis.initialize(env.MORALIS_APP_ID);
    Moralis.serverURL = APIPath.moralisServer;
    const options = {
      chain: "goerli",
      address: userAddress,
    };
    const nfts = await Moralis.Web3.getNFTs(options);

    if (nfts.length != 0) {
      for (let i = 0; i < nfts.length; i++) {
        if (nfts[i].token_address == contractAddress.toLocaleLowerCase()) {
          userCollection.push(nfts[i]);
        }
      }
    }
    return userCollection;
  };
  catch(error) {
    console.log("receipt", error);
  }
}
