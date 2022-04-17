import React, { Component } from 'react';

import './Gallery.css';

export default class Gallery extends Component {
    changMainHandler(event) {
        const newMainImg = event.target.getAttribute('src');
        const oldMainImg = document
            .getElementById('main-img')
            .getAttribute('src');

        event.target.setAttribute('src', oldMainImg);
        document.getElementById('main-img').setAttribute('src', newMainImg);
    }

    render() {
        const mainImg = this.props.imgs[0];
        const galleryImgs = this.props.imgs.slice(1, 5);

        return (
            <div className="product-body__gallery">
                <div className="product-body__gallery-left">
                    {galleryImgs.map((img, i) => (
                        <img
                            key={'c' + i}
                            src={img}
                            onClick={this.changMainHandler.bind(this)}
                        />
                    ))}
                </div>
                <div className="product-body__gallery-right">
                    <img src={mainImg} id="main-img" />
                </div>
            </div>
        );
    }
}
