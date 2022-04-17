import React, { Component } from 'react'
import './NavCartItem.css'

export default class NavCartItem extends Component {

    renderCart() {
        const products = this.props.cart.products;
        return products.map((el, i) => {
            return <div className='cart-item' key={`el.id-${i}`}>
                <p><span>Name: </span>{el.name}</p>
                <p><span>Price: </span>{el.price.symbol}{el.price.amount}</p>
                <p><span>Count: </span><span className='cart-item__count'>x{el.productCount}</span></p>
                <ul>
                    {
                        el.attributes.length > 0 &&
                        el.attributes.map((attr, i) => {
                            if (attr.type === 'swatch') {
                                return <li key={`c-${i}`} className='swatch' style={{ backgroundColor: attr.value }}>Color</li>
                            } else {
                                return <li key={`c-${i}`}>{attr.value}</li>
                            }

                        })
                    }
                </ul>
                <p><span>Total Price: </span>{el.price.symbol}{el.productTotalPrice.toFixed(2)}</p>
            </div>
        })
    }

    render() {
        return (
            <div>
                {this.renderCart()}
            </div>
        )
    }
}
