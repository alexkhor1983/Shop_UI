import "./Report.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { transactionRows } from "../../../dummyData";
import { useState } from "react";
import Topbar from "../../../components/Admin/topbar/Topbar";
import Sidebar from "../../../components/Admin/sidebar/Sidebar";

export default function Report() {
  useState(()=>{
  console.log("#######");
  },[])
  const [data, setData] = useState(transactionRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
            <div className="userListUser">
              <img className="userListImg" src={params.row.avatar} alt="" />
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
              <img className="productListImg" src={params.row.img} alt="" />
              {params.row.productName}
            </div>
        );
      },
    },
    { field: "QuantityPurchase", headerName: "QuantityPurchase", width: 200 },
    { field: "TransactionAmount", headerName: "TransactionAmount", width: 200 }
  ];

  return (
      <div>
        <Topbar/>
        <div className="container">
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
