import React, {useEffect, useState} from 'react'
import Chart from "../../../components/Admin/chart/Chart";
import FeaturedInfo from "../../../components/Admin/featuredInfo/FeaturedInfo";
import "./Report.css";
import WidgetLg from "../../../components/Admin/widgetLg/WidgetLg";
import Topbar from "../../../components/Admin/topbar/Topbar";
import Sidebar from "../../../components/Admin/sidebar/Sidebar";
import {getSalesSummary} from "../../../components/api/axios";
import {toast} from "react-toastify";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import Button from "@mui/material/Button";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

export default function Report() {
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

  const printDocument = () => {
      html2canvas(document.getElementById('divToPrint')).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
              orientation: "landscape",
              unit: "in",
            format:[8,17]});
          pdf.addImage(imgData, 'PNG', 0, 0);
          pdf.save("report.pdf");
      });
  }

  return (
      <div>
        <Topbar/>
          <Button size="large" variant="outlined" onClick={printDocument} startIcon={<LocalPrintshopOutlinedIcon />}>Download PDF</Button>
        <div className="AdminContainer">
          <Sidebar />
          <div className="home">
            <div id="divToPrint" >
            <FeaturedInfo />
            <Chart data={data} title="Sales Per Month" grid dataKey="sales"/>
            <div className="homeWidgets">
            </div>
          </div>
          <div/>
        </div>
        </div>
      </div>
  );
}
