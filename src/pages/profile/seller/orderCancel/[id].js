import React from "react";
import SidebarSeller from "../../../../components/sidebarSeller";
import NavbarLogin from "../../../../components/navbarLogin";


function OrderCancel() {
  return (
    <>
    <NavbarLogin/>
   <div style={{ display: "flex" }}>
    <SidebarSeller/>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "1245px",
          height: "900px",
          backgroundColor: "#F5F5F5",
        }}
      >
        <div
          className="card"
          style={{ width: 850, height: 636, backgroundColor: "white" }}
        >
               <div style={{padding:30}}>
            <h5 className="font-weight-bold">My profile store</h5>
            <div style={{width:800,border:"1px solid"}}></div>
            </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default OrderCancel;
