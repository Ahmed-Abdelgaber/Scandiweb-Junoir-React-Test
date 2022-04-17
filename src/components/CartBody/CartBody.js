import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import CartItem from '../CartItem.js/CartItem';

import './CartBody.css'

function mapStateToProps(state) {
    return {
        cart: state.cart
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateProductCount: (amount, id) =>
            dispatch(
                cartActions.updateProductCount({
                    amount,
                    id,
                })
            ),
        deleteProduct: (amount, id) =>
            dispatch(
                cartActions.deleteProduct({
                    amount,
                    id,
                })
            ),
    };
}

class CartBody extends Component {

    increaseProductCount(amount, id) {
        this.props.updateProductCount(amount, id)
    }

    decreaseProductCount(amount, id) {
        this.props.deleteProduct(amount, id)
    }

    render() {
        console.log(this.props)
        return (
            <Fragment>
                <h1 className='cart-body__header'>Cart</h1>
                <div>
                    {
                        this.props.cart.products.length > 0 &&
                        this.props.cart.products.map((product) => {
                            return <CartItem
                                product={product}
                                onIncrease={this.increaseProductCount.bind(this)}
                                onDecrease={this.decreaseProductCount.bind(this)} />
                        })
                    }
                </div>
            </Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartBody);