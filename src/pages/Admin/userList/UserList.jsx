import React, {useEffect} from 'react'
import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import Topbar from "../../../components/Admin/topbar/Topbar";
import Sidebar from "../../../components/Admin/sidebar/Sidebar";
import Button from '@mui/material/Button';
import {useConfirm} from "material-ui-confirm";
import {deleteUser, getAllUser} from "../../../components/api/axios";
import {toast} from "react-toastify";

export default function UserList() {
  const [data, setData] = useState([]);
  const confirm = useConfirm();

  useEffect(() => {
    getAllUser().then( res => {
      setData(res)
    }).catch(err=>{
      console.log(err)
      const notify = () => toast.error(err.message);
      notify()
      return
    })
  }, []);


  const handleDelete = (id) => {
    confirm({description: `This will remove the user : ${id} , are you sure ? `}).then(()=>{
      deleteUser(id).then(()=>{
        setData(data.filter((item) => item.id !== id));
      }).catch((err)=>{
        console.log(err)
        const notify = () => toast.error(err.message);
        notify()
        return
      }).catch(()=>{
        console.log("delete cancelled")
      })
    })

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
            <img className="userListImg" src={params.row.profileImg} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "userEmail", headerName: "Email", width: 200 },
    {
      field: "userPhone",
      headerName: "User Phone",
      width: 120,
    },
    {
      field: "enabled",
      headerName: "enabled status",
      width: 160,
    },
    {
      field: "activated",
      headerName: "activated",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/editProfile/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.username)}
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
    <div className="userList">

      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
        </div>
      </div>

  );
}
