import React from "react";
import { routes } from "../routes/route";
import SidebarMap from "../Component/common/SidebarMap"
import { AttributeIcon, CategoryIcon, CouponIcon, CustomerIcon, OfferIcon, OrderIcon, ProductIcon, ReviewIcon, ShippingIcon } from "../Component/common/SidebarIcon";

const Sidebar = ({ active }) => {
  let quickLinks = [
    {
      id: "1",
      title: "DashBoard",
      key: "dashboard",
      path: routes.homePage,
      icon : <AttributeIcon />
    },
    {
      id: "2",
      title: "Rough",
      key: "rough",
      path: routes.rough,
      icon : <CategoryIcon />
    },
    {
      id: "3",
      title: "Office",
      key: "office",
      path: routes.office,
      icon : <ProductIcon  />
    },
    {
      id: "4",
      title: "Factory",
      key: "factory",
      path: routes.factory,
      icon : <OfferIcon />
    },
    {
      id: "5",
      title: "Order",
      key: "order",
      path: routes.order,
      icon : <ReviewIcon />
    },
  ]

  
  return (
    <div className="w-2/12 overflow-x-scroll fixed h-full shadow-md"  >
      <div className="mb-8">
        <SidebarMap
          data={quickLinks}
          active={active}
        />

      </div>
    </div>
  );
};

export default Sidebar;
