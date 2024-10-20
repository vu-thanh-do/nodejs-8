import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from '../pages/Home/home';
import Login from '../pages/Login/login';
import PublicRoute from '../components/PublicRoute';
import PrivateRoute from '../components/PrivateRoute';
import NotFound from '../components/NotFound/notFound';
import Footer from '../components/layout/Footer/footer';
import Header from '../components/layout/Header/header';
import ProductDetail from '../pages/Product/productDetail/productDetail';
import Profile from '../pages/Profile/profile';
import Cart from '../pages/Purchase/Cart/cart';
import Pay from '../pages/Purchase/Pay/pay';
import CartHistory from '../pages/Purchase/ManagementCart/cartHistory';
import Contact from '../pages/Contact/contact';
import FinalPay from "../pages/Purchase/FinalPay/finalPay";
import Register from "../pages/Register/register";
import ProductList from "../pages/Product/productList/productList";
import News from "../pages/News/news";
import NewsDetail from "../pages/NewsDetai/newsDetai";
import ResetPassword from "../pages/ResetPassword/resetPassword";

import { Layout } from 'antd';
import { withRouter } from "react-router";

const RouterURL = withRouter(() => {
    const PublicContainer = () => (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/product-detail/:id" component={ProductDetail} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/news" component={News} />
                    <Route exact path="/news/:id" component={NewsDetail} />
                    <Route exact path="/product-list/:id" component={ProductList} />
                    <Route exact path="/reset-password/:id" component={ResetPassword} />
                    <Route component={NotFound} />
                </Switch>
                <Footer />
            </Layout>
        </div>
    );

    const PrivateContainer = () => (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Header />
                <Switch>
                    <PrivateRoute exact path="/home" component={Home} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute exact path="/pay" component={Pay} />
                    <PrivateRoute exact path="/final-pay" component={FinalPay} />
                    <PrivateRoute exact path="/cart-history" component={CartHistory} />
                    <PrivateRoute exact path="/product-list/:id" component={ProductList} />
                    <Route component={NotFound} />
                </Switch>
                <Footer />
            </Layout>
        </div>
    );

    const LoginContainer = () => (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Switch>
                    <PublicRoute exact path="/login" component={Login} />
                    <PublicRoute exact path="/register" component={Register} />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </div>
    );

    return (
        <Router>
            <Switch>
                <Route exact path={["/", "/product-detail/:id", "/cart", "/contact", "/news", 
                    "/news/:id", "/product-list/:id", "/reset-password/:id"]} 
                    component={PublicContainer} />
                <Route exact path={["/login", "/register"]} component={LoginContainer} />
                <Route path={["/home", "/profile", "/pay", "/final-pay", 
                    "/cart-history", "/product-list/:id"]} component={PrivateContainer} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
});

export default RouterURL;
