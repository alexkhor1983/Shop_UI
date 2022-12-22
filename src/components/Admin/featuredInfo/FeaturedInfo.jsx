import React, {useEffect, useState} from "react"
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import {getSalesSummary} from "../../api/axios";
import {toast} from "react-toastify";
import use from "use";

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
      setCurrentMonthSales(res[currentMonthIndex].sales);
      setCurrentMonthRevenue(res[currentMonthIndex].sales * rateBeenCharges);
      setLastMonthSales(res[lastMonthIndex].sales);
      setLastMonthRevenue(res[lastMonthIndex].sales * rateBeenCharges);

      setSalesCompareWithLastSales(currentMonthSales - lastMonthSales)
      setRevenueCompareWithLastRevenue(currentMonthRevenue - lastMonthRevenue)
    }).catch((err) => {
      const notify = () => toast.error(err.message);
      notify()
      return
    })
  },[salesCompareWithLastSales,revenueCompareWithLastRevenue])
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
            {salesCompareWithLastSales} {(salesCompareWithLastSales >= 0 ) ? <ArrowUpward  className="featuredIcon positive"/> : <ArrowDownward  className="featuredIcon negative"/>}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
