import React, { Component } from 'react';
import './Navbar.css';
import NavbarList from '../NavbarList/NavbarLits';
import NavbarImg from './img/store.png';
import NavbarDropdown from '../NavbarDropdown/NavbarDropdown';
import NavCart from '../NavCart/NavCart';

class Navbar extends Component {
    render() {
        return (
            <div className="nav">
                <NavbarList />
                <div className='nav-img__container'>
                    <img className="nav-img" src={NavbarImg} />
                </div>
                <NavbarDropdown />
                <div className='nav-cart'><NavCart /></div>
            </div >
        );
    }
}

export default Navbar;
