import React, { useState } from "react";

import nav from '../../assets/images/nav.svg'
import navX from '../../assets/images/nav-x.svg'
import { NavLink } from "react-router-dom";

const innerWidth = window.innerWidth

const Nav = () => {

    const [navState, setNav] = useState(false)

    const navHandler = () => {

        setNav(prevState => !prevState)

    }

    return (

        <div className='NavWrapp'>

            <div className='NavBtn' onClick={navHandler} style={{left: navState ? innerWidth > 430 ? '14%' : '0' : '0'}}>
                <img src={navState ? navX : nav} alt='NavBtn' />
            </div>

            <nav style={{visibility: navState ? 'visible' : 'hidden'}}>

                <NavLink onClick={navHandler} to='/'>Search</NavLink>
                <NavLink onClick={navHandler} to='/history'>History</NavLink>
                <NavLink onClick={navHandler} to='/statistics'>Statistics</NavLink>

            </nav>

        </div>

    )

}

export default Nav