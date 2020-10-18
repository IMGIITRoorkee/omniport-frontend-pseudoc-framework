import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Dropdown, Menu, Divider, Icon, Image } from 'semantic-ui-react'

import { getTheme } from 'formula_one'
import { appsApi } from "../urls"

class SideNav extends Component{
    state = {
        apps:null,
    }

    getApps = () => {
        axios.get(appsApi())
            .then(res => {
                this.setState({
                    apps:res.data.results
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleAppClick = (id) => {
        const  history  = this.props.history
        history.push(`/pseudoc_framework/app/${id}`)
    }

    componentDidMount() {
        this.getApps()
    }

    render(){
        return(
            <Menu
                secondary
                vertical
                inverted
                attached
                color={getTheme()}
            >
                {this.state.apps ? (
                    this.state.apps.map(app => {
                        return (
                            <Fragment key = {app.pk}>
                                <Menu.Item
                                    name={app.name}
                                    onClick = {() => this.handleAppClick(app.pk)}
                                >
                                    {app.name}
                                </Menu.Item>
                                <Divider/>
                            </Fragment>
                        )
                    })
                ) : null}
            </Menu>
        )
    }
}

export default SideNav
