import React from "react";
import { routes } from "../routes/route";
import { styled } from "styled-components";
import SidebarMap from "../Component/common/SidebarMap"
import { AttributeIcon, CategoryIcon, CouponIcon, CustomerIcon, OfferIcon, OrderIcon, ProductIcon, ReviewIcon, ShippingIcon } from "../Component/common/SidebarIcon";

const SidebarDiv = styled.div`
  position: fixed;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  height : 100vh;
`;

const Sidebar = ({ active }) => {
  let quickLinks = [
    {
      id: "1",
      title: "DashBoard",
      key: "dashboard",
      path: routes.homePage,
      icon : <AttributeIcon color={active === 'dashboard' ? 'green' : 'black'}/>
    },
    {
      id: "2",
      title: "Rough",
      key: "rough",
      path: routes.rough,
      icon : <CategoryIcon color={active === 'rough' ? 'green' : 'black'}/>
    },
    {
      id: "3",
      title: "Office",
      key: "office",
      path: routes.office,
      icon : <ProductIcon color={active === 'office' ? 'green' : 'black'} />
    },
    {
      id: "4",
      title: "Factory",
      key: "factory",
      path: routes.factory,
      icon : <OfferIcon color={active === 'factory' ? 'green' : 'black'}/>
    },
    {
      id: "5",
      title: "Order",
      key: "order",
      path: routes.order,
      icon : <ReviewIcon color={active === 'order' ? 'green' : 'black'}/>
    },
  ]

  
  return (
    <SidebarDiv className="w-2/12 overflow-x-scroll"  >
      <div className="pt-5 mb-8">
        <SidebarMap
          data={quickLinks}
          active={active}
        />

      </div>
    </SidebarDiv>
  );
};

export default Sidebar;
