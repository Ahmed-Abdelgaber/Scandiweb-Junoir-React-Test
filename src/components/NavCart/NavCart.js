import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavCartItem from '../NavCartItem/NavCartItem';
import CartIcon from './img/shopping-cart (2).png'


import './NavCart.css'
function mapStateToProps(state) {
    return {
        products: state.cart,
    };
}

class NavCart extends Component {

    constructor() {
        super();
        this.state = {
            showNavCart: false
        }
    }

    cartToggleHandler() {
        this.setState((currState) => {
            return { showNavCart: !currState.showNavCart }
        })
    }


    render() {
        return (
            <Fragment>
                <img className='cart-img' src={CartIcon} onClick={this.cartToggleHandler.bind(this)} />
                <div className={`cart ${this.state.showNavCart ? 'cart-show' : 'cart-hidden'}`}>
                    <div className='cart-body'>
                        <p className='cart-body__header'><span>My Cart: </span><span>{this.props.products.totalNumber}</span></p>
                        <NavCartItem cart={this.props.products} />
                        <p className='cart-body__header'><span>Total: </span><span>{this.props.products.totalAmount.toFixed(2)}</span></p>
                        <Link to={'/cart'} onClick={this.cartToggleHandler.bind(this)}>Go To Cart</Link>
                    </div>
                </div>
            </Fragment>

        );
    }
}

export default connect(
    mapStateToProps,
)(NavCart);