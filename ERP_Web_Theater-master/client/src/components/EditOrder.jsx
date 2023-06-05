import React, { useState, useEffect } from "react";
import { updateOrder } from "../store/actions/Message";
import DataService from "../store/services/DataService";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from '@mui/lab/LoadingButton';
import { deleteOrder, getOrdersById} from "../store/actions/Message";

const EditOrder = (props) => {
  
    const initialOrderState = {
        id: null,
        date: ""
        //genreId: "",
      };
  const [currentOrder, setCurrentOrder] = useState(
    initialOrderState
  );
  const [loadingUpdate,setLoadingUpdate]=useState(false);
  const[loadingDelete,setLoadingDelete]=useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [message, setMessage] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getOrders= (id) => {
    DataService.getByIdOrder(id)
      .then((response) => {
        console.log('response',response);
        setCurrentOrder(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { id } = useParams();
  useEffect(() => {
    getOrders(id);
  }, []);

  useEffect(() => {
    dispatch(getOrdersById(id));
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { date, value } = event.target;
    setCurrentOrder({ ...currentOrder, [date]: value });
  };
  const updateContent = () => {
    setLoadingUpdate(true)
    dispatch(updateOrder(currentOrder.id, currentOrder))
      .then((response) => {
        console.log(response);
        setMessage("The Order was updated successfully!");
        navigate("/api/order");
        setLoadingUpdate(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeOrder = () => {
    setLoadingDelete(true)
    dispatch(deleteOrder(currentOrder.id))
      .then(() => {
        navigate("/api/order");
        setLoadingDelete(false)
      })
      .catch((e) => {
        console.log(e);
      });
  };
  

  console.log('currentOrder',currentOrder)
  return (
    <div>
      {currentOrder ? (
        <div className="edit-form">
          <h4>{currentOrder.Ordername}</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Porudzbina</label>
              <input
                type="text"
                className="form-control"
                id="Ordername"
                name="Ordername"
                value={currentOrder.Ordername}
                onChange={handleInputChange}
              />
            </div>           
          </form>
 
          <LoadingButton
           loading={loadingDelete}
           variant="outlined"
            onClick={removeOrder}
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

export default EditOrder;
