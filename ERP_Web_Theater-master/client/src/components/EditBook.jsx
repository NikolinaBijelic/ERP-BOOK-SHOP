import React, { useState, useEffect } from "react";
import { updateBook } from "../store/actions/Message";
import DataService from "../store/services/DataService";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from '@mui/lab/LoadingButton';
import { deleteBook, getBooksById} from "../store/actions/Message";

const EditBook = (props) => {
  
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
  const [currentBook, setCurrentBook] = useState(
    initialBookState
  );
  const [loadingUpdate,setLoadingUpdate]=useState(false);
  const[loadingDelete,setLoadingDelete]=useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [message, setMessage] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getBooks= (id) => {
    DataService.getByIdBook(id)
      .then((response) => {
        console.log('response',response);
        setCurrentBook(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { id } = useParams();
  useEffect(() => {
    getBooks(id);
  }, []);

  useEffect(() => {
    dispatch(getBooksById(id));
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };
  const updateContent = () => {
    setLoadingUpdate(true)
    dispatch(updateBook(currentBook.id, currentBook))
      .then(() => {
        navigate("/api/book");
        setLoadingUpdate(false)
      })
      .catch((err) => {
        console.log(err);
         setLoadingUpdate(false)
      });
  };

  const removeBook = () => {
    setLoadingDelete(true)
    dispatch(deleteBook(currentBook.id))
      .then(() => {
        navigate("/api/book");
        setLoadingDelete(false)
      })
      .catch((e) => {
        console.log(e);
        setLoadingDelete(false)
      });
  };
  

  console.log('currentBook',currentBook)
  return (
    <div>
      {currentBook ? (
        <div className="edit-form">
          <h4>{currentBook.Bookname}</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Naziv knjige</label>
              <input
                type="text"
                className="form-control"
                id="Bookname"
                name="Bookname"
                value={currentBook.Bookname}
                onChange={handleInputChange}
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
                value={currentBook.bookAuthorId}
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
                value={currentBook.bookPublisherId}
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
                value={currentBook.bookGenreId}
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
                value={currentBook.bookLanguageId}
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
                value={currentBook.orderItemId}
                onChange={handleInputChange}
                name="orderItemId"
              />
            </div>
          </form>
 
          <LoadingButton
           loading={loadingDelete}
           variant="outlined"
            onClick={removeBook}
          >
            Delete
          </LoadingButton>
          <LoadingButton
          loading={loadingUpdate}
          variant="outlined"
            onClick={updateContent}
          >
            Update
          </LoadingButton>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default EditBook;
