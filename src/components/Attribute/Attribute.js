import React, { Component } from 'react';

import './Attribute.css';

class Attribute extends Component {
    addAttributeHandler(event) {
        const attributeValue = event.target.getAttribute('id');
        const attributeName = this.props.name;
        const attributeType = this.props.type;


        this.props.onClick({ name: attributeName, value: attributeValue, type: attributeType });
    }

    render() {
        return (
            <div className="product-body__details-attribute">
                <p>{this.props.name}:</p>
                <ul>
                    {this.props.sizes.map((size) => {
                        let li;
                        if (this.props.type === 'swatch')
                            li = (
                                <li
                                    onClick={this.addAttributeHandler.bind(
                                        this
                                    )}
                                    id={size.value}
                                    key={size.displayValue}
                                    className="swatch"
                                    style={{ backgroundColor: size.value }}
                                ></li>
                            );
                        else
                            li = (
                                <li
                                    onClick={this.addAttributeHandler.bind(
                                        this
                                    )}
                                    key={size.displayValue}
                                    id={size.value}
                                >
                                    {size.value}
                                </li>
                            );
                        return li;
                    })}
                </ul>
            </div>
        );
    }
}

export default Attribute;
