import React, {useEffect} from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Button from '@mui/material/Button';
import "./TransactionSeller.css";
import {viewProductForSale, viewTransactionOfSeller} from "../../../../../components/api/axios";
import {toast} from "react-toastify";
import Navbar from "../../../../../components/User/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const TransactionSeller = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState([])

  useEffect(async () => {
    await viewTransactionOfSeller().then((res) => {
      console.log(res)
      setData(res);
    }).catch((err) => {
      console.log(err.message)
      const notify = () => toast.error(err.message);
      notify()
      return
    })
  },[])

  return (
      <div>
        <Navbar/>
        <div className="AdminContainer">
          <Sidebar />

          <div className="productList">
        <DataGrid
            columns={[
              { field: "id", headerName: "ID", width: 90 },
              {
                field: "product",
                headerName: "Product",
                width: 380,
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
                field: "quantity",
                headerName: "Quantity",
                width: 160
              },
              {
                field: "specification",
                headerName: "Specification",
                width: 180
              },
              {
                field: "amount",
                headerName: "Amount(RM)",
                width: 180
              },
            ]}
            rows={data}
        />
          </div>
        </div>
      </div>
  );
}

export default TransactionSeller;