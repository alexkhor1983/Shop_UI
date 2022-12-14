import React from "react"
import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/admin/user" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/admin/product" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/admin/transaction" className="link">
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            </Link>
            <Link to="/admin/summaryReport" className="link">
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              SummaryReport
            </li>
            </Link>

            <Link to="/admin/hotSalesReport" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Hot Sales Report
              </li>
            </Link>

            <Link to="/admin/customerConsumeReport" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Customer Consume Report
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
