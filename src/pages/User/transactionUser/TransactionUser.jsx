import React, {useEffect} from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Button from '@mui/material/Button';
import "./TransactionUser.css";
import {viewPaymentOfUser} from "../../../components/api/axios";
import {toast} from "react-toastify";
import Navbar from "../../../components/User/navbar/Navbar";
import Sidebar from "../productSales/components/sidebar/Sidebar";

const TransactionUser = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(async () => {
    await viewPaymentOfUser().then((res) => {
      console.log(res)
      setData(res);
    }).catch((err) => {
      console.log(err.message)
      const notify = () => toast.error(err.message);
      notify()
      return
    })
  },[data])

  return (
      <div>
          <Navbar/>
          <h1 className="headerOfPaymentHistory">Payment History</h1>
          <div className="AdminContainer">
              <Sidebar />

        <DataGrid
            columns={[
              { field: "id", headerName: "ID", width: 90 },
              {
                field: "product",
                headerName: "Product",
                width: 200,
                renderCell: (params) => {
                  return (
                      <div className="productListItem">
                        <img
                            className="productListImg"
                            src={params.row.productImg}
                            alt=""
                        />
                        {params.row.productName}
                      </div>
                  );
                }
              },
              {
                field: "user",
                headerName: "User",
                width: 200,
                renderCell: (params) => {
                  return (
                      <div className="productListItem">
                        <img
                            className="productListImg"
                            src={params.row.userProfile}
                            alt=""
                        />
                        {params.row.username}
                      </div>
                  );
                }
              },
              {
                field: "quantity",
                headerName: "Quantity",
                width: 140
              },
              {
                field: "amount",
                headerName: "Unit Price(RM)",
                width: 160
              },
              {
                field: "rating",
                headerName: "Rating",
                width: 120,
                renderCell: (params) => {
                  return (
                      <>
                        {params.row.rating === "false" ? <Link to={`/transaction/rating/${params.row.id}`}>
                          <button style={{}} className="orderUnrated">Rating</button>
                        </Link> : <button style={{"background-color": "#f44336"}}className="orderRated">Rated</button>}
                      </>
                  );
                },
              }
            ]}
            rows={data}
        />
      </div>
      </div>
  );
}

export default TransactionUser;
