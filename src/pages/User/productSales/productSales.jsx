import React, {useEffect} from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../../dummyData";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Button from '@mui/material/Button';
import "./productSales.css";
import {deleteMultipleProductInfo, deleteProductInfo, viewProductForSale} from "../../../components/api/axios";
import {toast} from "react-toastify";
import Navbar from "../../../components/User/navbar/Navbar";
import {useConfirm} from "material-ui-confirm";

const ProductSales = () => {
    const Navigate = useNavigate();
    const [data, setData] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    const confirm = useConfirm();

    useEffect(() => {
        viewProductForSale().then((res) => {
            const newData = res;
            setData(newData);
            console.log(newData);
        }).catch((err) => {
            console.log(err.message)
            const notify = () => toast.error(err.message);
            notify()
            return
        })
    },[])

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

    const handleMultiSelectedDelete = () => {
        if(selectionModel.length > 0) {
            confirm({description: `This will remove the product id : ${selectionModel}`}).then(()=>{
                console.log(selectionModel)
                deleteMultipleProductInfo(selectionModel).then(() => {
                    const notify = () => toast.success("Product deleted successfully");
                    notify()
                    setData(data.filter(item => selectionModel.indexOf(item.id) === -1));
                    return
                }).catch( err => {
                    console.log(err.message);
                    const notify = () => toast.error("Product deleted failed");
                    notify()
                    return
                })
            }).catch(()=>{
                console.log("deletion cancelled")
            })
        }else{
            const notify = () => toast.info("No row selected");
            notify()
            return
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
        { field: "category", headerName: "Category", width: 200 },
        {
            field: "status",
            headerName: "Status",
            width: 120,
        },
        {
            field: "price",
            headerName: "Price(RM)",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/myProduct/editProduct/${params.row.id}`}>
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
            <Navbar/>
            <div className="AdminContainer">
                <Sidebar />

                <div className="productList">
                    <Button onClick={() => Navigate("/myProduct/addProduct") } variant="outlined" startIcon={<DeleteOutline />}>
                        Add Product
                    </Button><br/><br/>
                    <Button onClick={() => handleMultiSelectedDelete()} variant="outlined" startIcon={<DeleteOutline />}>
                        Delete Selected Product
                    </Button>

                    <DataGrid
                        rows={data}
                        disableSelectionOnClick
                        columns={columns}
                        pageSize={10}
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

export default ProductSales;