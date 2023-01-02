import React from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import Topbar from "../../../components/Admin/topbar/Topbar";
import Sidebar from "../../../components/Admin/sidebar/Sidebar";
import Button from '@mui/material/Button';
import "./productList.css";
import {
  deleteMultipleProductInfo,
  deleteProductInfo,
  getAllProductInfoIncludeDisabled
} from "../../../components/api/axios";
import {toast} from "react-toastify";
import {decreaseCartQuantity} from "../../../cartSlice";
import {useConfirm} from "material-ui-confirm";

export default function ProductList() {
  const confirm = useConfirm();
  useEffect(()=>{
    getAllProductInfoIncludeDisabled().then(res => {
      setData(res)
    }).catch(err => {
      console.log(err.message)
      const notify = () => toast.error(err.message);
      notify()
      return
    })
  },[])

  const [data, setData] = useState([]);

  const handleDelete = id => {
    confirm({description: `This will remove the product id : ${id}`}).then(()=>{
      deleteProductInfo(id).then(()=>{
        const notify = () => toast.success("Product deleted successfully");
        notify()
        setData(data.filter(item => item.id !== id));
        return
      }).catch(()=>{
        const notify = () => toast.error("Product deleted failed");
        notify()
        return
      })
    }).catch(()=>{
      console.log("deletion cancelled")
    })
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.productImg} alt="" />
            {params.row.productName}
          </div>
        );
      },
    },
    { field: "categoryName", headerName: "Category", width: 150 },
    {
      field: "productPrice",
      headerName: "Price(RM)",
      width: 140,
    },
    {
      field: "productDiscount",
      headerName: "Discount",
      width: 130,
    },
    {
      field: "enabled",
      headerName: "Enabled",
      width: 120,
    },
    {
      field: "seller",
      headerName: "Seller",
      width: 200,
      renderCell: (params) => {
        return (
            <div className="productListItem">
              <img className="productListImg" src={params.row.sellerProfile} alt="" />
              {params.row.sellerName}
            </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/editProduct/${params.row.id}`}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
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
        pageSize={10}
      />
    </div>
        </div>
      </div>
  );
}
