// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();

      dispatch(
        fetchDataSuccess({
          totalSupply,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("#selitekk... Could not load data from contract."));
    }
  };
};

// export const fetchData = (account) => {
//   return async (dispatch) => {
//     dispatch(fetchDataRequest());
//     try {
//       let name = await store
//         .getState()
//         .blockchain.smartContract.methods.name()
//         .call();

//       dispatch(
//         fetchDataSuccess({
//           name,
//         })
//       );
//     } catch (err) {
//       console.log(err);
//       dispatch(fetchDataFailed("#selitekk... Could not load data from contract."));
//     }
//   };
// };
