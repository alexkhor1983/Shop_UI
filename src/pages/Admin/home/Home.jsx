import React, {useEffect, useState} from 'react'
import Chart from "../../../components/Admin/chart/Chart";
import FeaturedInfo from "../../../components/Admin/featuredInfo/FeaturedInfo";
import "./home.css";
import { productData } from "../../../dummyData";
import WidgetLg from "../../../components/Admin/widgetLg/WidgetLg";
import Topbar from "../../../components/Admin/topbar/Topbar";
import Sidebar from "../../../components/Admin/sidebar/Sidebar";
import {getSalesSummary} from "../../../components/api/axios";
import {toast} from "react-toastify";

export default function Home() {
    const [data,setData] = useState([]);
    useEffect(()=>{
        getSalesSummary().then(res=>{
            setData(res)
        }).catch((err)=>{
            const notify = () => toast.error(err.message);
            notify()
            return
        })
    },[])
  return (
      <div>
      <Topbar/>
        <div className="AdminContainer">
            <Sidebar />
                <div className="home">
                    <FeaturedInfo />
                      <Chart data={data} title="Sales Per Month" grid dataKey="sales"/>
                      <div className="homeWidgets">

                        <WidgetLg/>
                      </div>
                    </div>
                <div/>
       </div>
      </div>
  );
}
