import {
  CREATE_GENRE,
  UPDATE_GENRE,
  DELETE_GENRE,
  GET_GENRES,
  GET_GENRES_BY_ID
} from "../actions/Types";

const initialState = [];

const GenreReducer = (genres = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_GENRES:
      return payload;
    case GET_GENRES_BY_ID:
      return genres.find((p)=>p.id===payload.id);
    case CREATE_GENRE:
      return [...genres, payload];
    case UPDATE_GENRE:
      return genres.map((genre) => {
        if (genre.id === payload.id) {
          return {
            ...genre,
            ...payload,
          };
        } else {
          return genre;
        }
      });
    case DELETE_GENRE:
      return genres.filter(({ id }) => id !== payload.id);
    default:
      return genres;
  }
};

export default GenreReducer;
