import React, { Fragment } from "react";
import Nav from "./Nav/Nav";

const Layout = (props) => {

    return (

        <div className='Layout'>
            <Nav />
            <main>{props.children}</main>
        </div >

    )

}

export default Layout