import React from 'react'
import Chart from "../../../components/Admin/chart/Chart";
import FeaturedInfo from "../../../components/Admin/featuredInfo/FeaturedInfo";
import "./home.css";
import { productData } from "../../../dummyData";
import WidgetLg from "../../../components/Admin/widgetLg/WidgetLg";
import Topbar from "../../../components/Admin/topbar/Topbar";
import Sidebar from "../../../components/Admin/sidebar/Sidebar";

export default function Home() {
  return (
      <div>
      <Topbar/>
        <div className="container">
            <Sidebar />
                <div className="home">
                    <FeaturedInfo />
                      <Chart data={productData} title="Sales Per Month" grid dataKey="Sales"/>
                      <div className="homeWidgets">

                        <WidgetLg/>
                      </div>
                    </div>
                <div/>
       </div>
      </div>
  );
}
