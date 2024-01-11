import { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'

const Served = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      const orderID = window.localStorage.getItem('rid')
      const { data } = await axios.post(
        `https://ae67-2409-40c4-138-5579-1d34-a0c8-fbb9-cfe5.ngrok-free.app/menu/served/${orderID}`
      )
      setOrders(data)
    }
    fetchOrders()
  }, [])

  return (
    <>
      <h1>Orders</h1>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Created On</th>
            <th>Customer Name</th>
            <th>Items</th>
            <th>Total</th>
            <th>Table Number</th>
          </tr>
        </thead>

        <tbody>
          {orders.length>0 && orders.map((order,index) => (
            <tr key={order.oid}>
              <td>{index+1}</td>
              <td>{order.createdon}</td>
              <td>{order.oname}</td>
              <td>{order.oitems}</td>
              <td>{order.oprice}</td>
              <td>{order.tableno}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Served