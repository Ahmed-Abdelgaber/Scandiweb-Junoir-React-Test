import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

class Card extends Component {
    render() {
        const colors = this.props.attributes.filter((el) => {
            return el.type === 'swatch';
        });
        const cardJSX = (
            <div className="card-body">
                <div className="card-img">
                    <img src={this.props.img} />
                    {!this.props.inStock && (
                        <p className="not-exist">Out of stock</p>
                    )}
                </div>
                <p className="card-title">{this.props.title}</p>
                <p className="card-price">
                    {this.props.curr}
                    {this.props.price}
                </p>
                {colors.length > 0 &&
                    colors[0].items.map((el) => {
                        return (
                            <div
                                key={el.displayValue}
                                className="card-attribute"
                                style={{ backgroundColor: el.value }}
                            ></div>
                        );
                    })}
            </div>
        );
        return (
            <div className="card">
                {this.props.inStock && (
                    <Link to={`/product/${this.props.id.replaceAll(' ', '-')}`}>
                        {cardJSX}
                    </Link>
                )}
                {!this.props.inStock && cardJSX}
            </div>
        );
    }
}

export default Card;
