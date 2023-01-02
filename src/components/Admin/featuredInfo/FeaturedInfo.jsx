import React, {useEffect, useState} from "react"
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import {getSalesSummary} from "../../api/axios";
import {toast} from "react-toastify";

export default function FeaturedInfo() {

  let newDate = new Date()
  let currentMonthIndex = newDate.getMonth();
  let lastMonthIndex = newDate.getMonth() - 1;
  let rateBeenCharges = 0.03;

  const [currentMonthSales,setCurrentMonthSales] = useState(0);
  const [currentMonthRevenue,setCurrentMonthRevenue] = useState(0);

  const [lastMonthSales,setLastMonthSales] = useState(0);
  const [lastMonthRevenue,setLastMonthRevenue] = useState(0);

  const [salesCompareWithLastSales,setSalesCompareWithLastSales] = useState(0);
  const [revenueCompareWithLastRevenue,setRevenueCompareWithLastRevenue] = useState(0);

  useEffect(async () => {
    await getSalesSummary().then(res => {
      setCurrentMonthSales((res[currentMonthIndex].sales).toFixed(2));
      setCurrentMonthRevenue((res[currentMonthIndex].sales * rateBeenCharges).toFixed(2));
      setLastMonthSales((res[lastMonthIndex].sales).toFixed(2));
      setLastMonthRevenue((res[lastMonthIndex].sales * rateBeenCharges).toFixed(2));

      setSalesCompareWithLastSales((currentMonthSales - lastMonthSales).toFixed(2));
      setRevenueCompareWithLastRevenue((currentMonthRevenue - lastMonthRevenue).toFixed(2));
    }).catch((err) => {
      const notify = () => toast.error(err.message);
      notify()
      return
    })
  },[currentMonthRevenue])
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">RM {currentMonthRevenue}</span>
          <span className="featuredMoneyRate">
            RM {revenueCompareWithLastRevenue}{(revenueCompareWithLastRevenue >= 0 ) ? <ArrowUpward  className="featuredIcon positive"/> : <ArrowDownward  className="featuredIcon negative"/>}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">RM {currentMonthSales}</span>
          <span className="featuredMoneyRate">
           RM {salesCompareWithLastSales} {(salesCompareWithLastSales >= 0 ) ? <ArrowUpward  className="featuredIcon positive"/> : <ArrowDownward  className="featuredIcon negative"/>}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
