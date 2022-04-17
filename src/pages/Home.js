import { Component } from 'react';
import Items from '../components/Items/Items';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div className="home">
                <Items />
            </div>
        );
    }
}

export default Home;
