import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGenre, getGenre } from "../store/actions/Message";
import LoadingButton from '@mui/lab/LoadingButton';

const AddGenres = () => {
 
  const [loading,setLoading]=useState(false);
  
  const initialGenreState = {
    id: null,
    genreName: "",
    
  };
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getGenre());
  // }, [dispatch]);

  const navigate = useNavigate();
  const [genre, setGenre] = useState(initialGenreState);
  const [submitted, setSubmitted] = useState(false);
  console.log(genre);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGenre({ ...genre, [name]: value });
  };

  const saveGenre = () => {
    setLoading(true);
    const { genreName} = genre;
    console.log('genre',genre)
    dispatch(createGenre(
      genreName,
    
      ))
      .then((data) => {
        setGenre({
          id: data.id,
          genreName: data.genreName,
          
        });
        setSubmitted(true);
        setLoading(false);
      })
      .then(() => {
        navigate(`/api/genre`);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };
  const newGenre = () => {
    setGenre(initialGenreState);
    setSubmitted(false);
  };
  return (
    <div>
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newGenre}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="genre">Naziv zanra</label>
              <input
                type="text"
                className="form-control"
                id="genreName"
                required
                text="genre name"
                value={genre.genreName}
                onChange={handleInputChange}
                name="genreName"
              />
            </div>
            
            
            {/*      <div className="form-group">
              <label for="genre">Zanr</label>
              <select id="genreId" name="genreId" onChange={handleInputChange}>
                {genres.content &&
                  genres.content.map((data) => (
                    <>
                      <option value="genreId">{data.id}</option>
                    </>
                  ))}
              </select>
            </div> */}
            <LoadingButton loading={loading} onClick={saveGenre} variant="outlined">
              Submit
            </LoadingButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddGenres;
