import React, {useEffect} from 'react'
import "./Transaction.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { transactionRows } from "../../../dummyData";
import { useState } from "react";
import Topbar from "../../../components/Admin/topbar/Topbar";
import Sidebar from "../../../components/Admin/sidebar/Sidebar";
import {getAllTransaction} from "../../../components/api/axios";
import {Exception} from "sass";
import {toast} from "react-toastify";

export default function AdminTransaction() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllTransaction().then(res =>{
      setData(res);
      console.log(res)
    }).catch(err=>{
      console.log(err)
      const notify = () => toast.error(err.message);
      notify()
    })
  }, []);


  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
            <div className="userListUser">
              <img className="userListImg" src={params.row.profilePicture} alt="" />
              {params.row.username}
            </div>
        );
      },
    },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
            <div className="productListItem">
              <img className="productListImg" src={params.row.productImage} alt="" />
              {params.row.productName}
            </div>
        );
      },
    },
    { field: "orderQuantity", headerName: "Quantity", width: 200 },
    { field: "amount", headerName: "Amount", width: 200 }
  ];

  return (
      <div>
        <Topbar/>
        <div className="AdminContainer">
          <Sidebar />
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
        </div>
      </div>
  );
}
