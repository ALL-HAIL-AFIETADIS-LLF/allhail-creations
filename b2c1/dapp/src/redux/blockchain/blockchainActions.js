// constants 
import Web3 from "web3";
import TheKingsNFT_B2C1 from "../../contracts/TheKingsNFT_B2C1.json";
// log
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        // const NetworkData = await TheKingsNFT_B2C1.networks[networkId];
        // if (NetworkData) {
          if (networkId == 137) {
          const TheKingsNFT_B2C1Obj = new web3.eth.Contract(
            TheKingsNFT_B2C1.abi,
            // NetworkData.address
            "0xc06fd77c1aec4dccefc2fe6b3649ec454585fb15"
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: TheKingsNFT_B2C1Obj,
              web3: web3,
            })
          );
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("#selitekk... Change network to Polygon (Matic)."));
        }
      } catch (err) {
        dispatch(connectFailed("#selitekk... Something went wrong."));
      }
    } else {
      dispatch(connectFailed("#selitekk... Install your wallet."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
