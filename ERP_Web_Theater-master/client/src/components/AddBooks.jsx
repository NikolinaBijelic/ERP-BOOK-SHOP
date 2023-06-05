import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBook, getGenre } from "../store/actions/Message";
import LoadingButton from '@mui/lab/LoadingButton';

const AddBooks = () => {
 
  const [loading,setLoading]=useState(false);
  
  const initialBookState = {
    id: null,
    Bookname: "",
    bookAuthorId: null,
    bookPublisherId:null,
    bookGenreId:null,
    bookLanguageId:null,
    orderItemId:null
    //genreId: "",
  };
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getGenre());
  // }, [dispatch]);

  const navigate = useNavigate();
  const [book, setBook] = useState(initialBookState);
  const [submitted, setSubmitted] = useState(false);
  console.log(book);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const saveBook = () => {
    setLoading(true);
    const { Bookname,bookAuthorId,bookPublisherId, bookGenreId,bookLanguageId,orderItemId} = book;
    console.log('book',book)
    dispatch(createBook(
      Bookname,
      bookAuthorId,
      bookPublisherId,
      bookGenreId,
      bookLanguageId,
      orderItemId
      ))
      .then((data) => {
        setBook({
          id: data.id,
          Bookname: data.Bookname,
          bookAuthorId: data.bookAuthorId,
          bookPublisherId:data.bookPublisherId,
          bookGenreId:data.bookGenreId,
          bookLanguageId:data.bookLanguageId,
          orderItemId:data.orderItemId,
          //genreId: data.genres.content.id,
        });
        setSubmitted(true);
       
      })
      .then(() => {
        navigate(`/api/book`);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newBook = () => {
    setBook(initialBookState);
    setSubmitted(false);
  };
  return (
    <div>
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newBook}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="book">Naziv knjige</label>
              <input
                type="text"
                className="form-control"
                id="Bookname"
                required
                text="book name"
                value={book.Bookname}
                onChange={handleInputChange}
                name="Bookname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookAuthorId">Autor knjige</label>
              <input
                type="datetime"
                className="form-control"
                text="Autor"
                id="bookAuthorId"
                required
                value={book.bookAuthorId}
                onChange={handleInputChange}
                name="bookAuthorId"
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookPublisherId">Izdavac knjige</label>
              <input
                type="datetime"
                className="form-control"
                text="Publisher"
                id="bookPublisherId"
                required
                value={book.bookPublisherId}
                onChange={handleInputChange}
                name="bookPublisherId"
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookGenreId">Zanr knjige</label>
              <input
                type="datetime"
                className="form-control"
                text="book genre"
                id="bookGenreId"
                required
                value={book.bookGenreId}
                onChange={handleInputChange}
                name="bookGenreId"
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookLanguageId">Jezik</label>
              <input
                type="datetime"
                className="form-control"
                text="language book"
                id="bookLanguageId"
                required
                value={book.bookLanguageId}
                onChange={handleInputChange}
                name="bookLanguageId"
              />
            </div>
            <div className="form-group">
              <label htmlFor="orderItemId">Broj narudzbine</label>
              <input
                type="datetime"
                className="form-control"
                text="order book"
                id="orderItemId"
                required
                value={book.orderItemId}
                onChange={handleInputChange}
                name="orderItemId"
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
            <LoadingButton loading={loading} onClick={saveBook} variant="outlined">
              Submit
            </LoadingButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBooks;
