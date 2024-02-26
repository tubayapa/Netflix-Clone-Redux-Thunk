import axios from "axios";
import { ActionTypes } from "../actionTypes";
import { options } from "../../constants";

export const getPopular = () => (dispatch) => {
  // Notify the reducer about the loading status
  dispatch({ type: ActionTypes.MOVIES_LOADING });

  // get popular movies from API
  axios
    .get("https://api.themoviedb.org/3/movie/popular", options)

    .then((res) =>
      //   // Notify the reducer about the success status
      dispatch({
        type: ActionTypes.MOVIES_SUCCESS,
        payload: res.data.results,
      })
    )

    .catch((err) =>
      // Notify the reducer about the error status
      dispatch({
        type: ActionTypes.MOVIES_ERROR,
        payload: err.message,
      })
    );
};
