import { Route, Routes, Navigate } from 'react-router-dom';
import { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import store from './store/store';
import './App.css';

const client = new ApolloClient({
    uri: 'http://localhost:4000',
});

class App extends Component {
    render() {
        return (
            <main className="App">
                <Provider store={store}>
                    <ApolloProvider client={client}>
                        <Navbar />
                        <Routes>
                            <Route
                                path="*"
                                element={<Navigate to="/home" replace />}
                            />
                            <Route path="/home/*" element={<Home />} />
                            <Route path="/product/:id" element={<Product />} />
                            <Route path="/cart" element={<Cart />} />
                        </Routes>
                    </ApolloProvider>
                </Provider>
            </main>
        );
    }
}

export default App;
