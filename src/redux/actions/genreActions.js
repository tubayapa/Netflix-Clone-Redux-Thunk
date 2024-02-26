import axios from "axios";
import { ActionTypes } from "../actionTypes";
import { options } from "../../constants";

// get genres data  and let reducer know

export const getGenres = () => (dispatch) => {
  // Notify the reducer about the loading status
  dispatch({ type: ActionTypes.GENRES_LOADING });

  // get genres from API
  axios
    .get("https://api.themoviedb.org/3/genre/movie/list", options)
    .then((res) => {
      dispatch({
        type: ActionTypes.GENRES_SUCCESS,
        payload: res.data.genres,
      });
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.GENRES_ERROR,
        payload: err.message,
      });
    });
};
