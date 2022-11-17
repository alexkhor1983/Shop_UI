import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import Topbar from "../../../components/Admin/topbar/Topbar";
import Sidebar from "../../../components/Admin/sidebar/Sidebar";
import Button from '@mui/material/Button';

export default function ProductList() {
  const [data, setData] = useState(productRows);

  const handleDelete = id => {
    //TODO : Create axios request make the single delete achieve with sending ${id} parameter
    setData(data.filter(item => item.id !== id));
  };

  const handleMultiSelectedDelete = () => {
    if(selectionModel.length > 0) {
      setData(data.filter(item =>
        selectionModel.indexOf(item.id) === -1
      ));
    }else{
      //TODO : Toastify the no row selected message
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/Admin/product/${params.row.id}`}>
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
  const [selectionModel, setSelectionModel] = useState([]);

  return (
      <div>
        <Topbar/>
        <div className="container">
          <Sidebar />

    <div className="productList">
      <Button onClick={() => handleMultiSelectedDelete()} variant="outlined" startIcon={<DeleteOutline />}>
        Delete selected
      </Button>

      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
      />
    </div>
        </div>
      </div>
  );
}
