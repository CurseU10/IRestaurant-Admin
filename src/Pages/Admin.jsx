import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [servedState, setServedState] = useState([]);
  const [servedOrderID,setServedOrderID] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      const rid = window.localStorage.getItem('rid')
      const { data } = await axios.post(
        `https://2f3a-2405-201-3010-7be1-7c45-9302-ae72-e4b9.ngrok-free.app/menu/nonServed/${rid}`
      )
      setOrders(data)
      const savedState = JSON.parse(localStorage.getItem('servedState'))
      if (savedState) {
        setServedState(savedState)
      } else {
        setServedState(Array(data.length).fill(false))
      }
    }
    fetchOrders()
  }, [])

  const changeServedStatus = async (index) => {
    await axios.post(`https://2f3a-2405-201-3010-7be1-7c45-9302-ae72-e4b9.ngrok-free.app/menu/update/served/${index}`)
    window.location.reload();
   
  }


  return (
    <>
      <h1>Orders</h1>
      <Button
        onClick={() => navigate('/served')}
        variant={ 'primary' }
        className="btn-sm"
      >
        Served 
      </Button>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Created On</th>
            <th>Customer Name</th>
            <th>Items</th>
            <th>Total</th>
            <th>Table Number</th>
            <th>Served</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.oid}>
              <td>{order.oid}</td>
              <td>{order.createdon}</td>
              <td>{order.oname}</td>
              <td>{order.oitems}</td>
              <td>{order.oprice}</td>
              <td>{order.tableno}</td>
              <td>
                <Button
                  onClick={() => changeServedStatus(order.oid)}
                  variant={servedState ? "primary" : "light"}
                  className="btn-sm"
                >
                  YES
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Admin;
