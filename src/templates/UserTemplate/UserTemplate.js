
import { Fragment } from 'react'
import { Route, NavLink } from 'react-router-dom'
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import ResponsiveHeader from './ResponsiveHeader/ResponsiveHeader';


export const UserTemplate = (props) => {
    const { Component, ...restProps } = props;
    return <Route {...restProps} render={(propsRoute) => {
        return <div className='theme-layout'>
            <ResponsiveHeader />
            <Header />
            <SideBar />
            <Component {...propsRoute} />
        </div>
    }} />
}