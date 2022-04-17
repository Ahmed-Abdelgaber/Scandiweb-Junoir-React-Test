import React, { Component } from 'react'

import './CartItem.css'

export default class CartItem extends Component {

    increaseHandler() {
        this.props.onIncrease(this.props.product.price.amount, this.props.product.id)
    }

    decreaseHandler() {
        this.props.onDecrease(this.props.product.price.amount, this.props.product.id)
    }

    render() {
        return (
            <div className='cart-item__body'>
                <div>
                    <p className='cart-item__body-title'>{this.props.product.name}</p>
                    <p className='cart-item__body-price'>{this.props.product.price.symbol}{this.props.product.price.amount}</p>
                    <ul>
                        {
                            this.props.product.attributes.length > 0 &&
                            this.props.product.attributes.map((attr, i) => {
                                if (attr.type === 'swatch') {
                                    return <li key={`c-${i}`} className='swatch' style={{ backgroundColor: attr.value }}>Color</li>
                                } else {
                                    return <li key={`c-${i}`}>{attr.value}</li>
                                }
                            })
                        }
                    </ul>
                    <button onClick={this.increaseHandler.bind(this)}>+</button>
                    <span>{this.props.product.productCount}</span>
                    <button onClick={this.decreaseHandler.bind(this)}>-</button>
                    <p className='cart-item__body-price'>Total: {this.props.product.price.symbol} {this.props.product.productTotalPrice.toFixed(2)}</p>
                </div>
                <div className='cart-item___img-container'>
                    <img src={this.props.product.img} />
                </div>
            </div>
        )
    }
}
