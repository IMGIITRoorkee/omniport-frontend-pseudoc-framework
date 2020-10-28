import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Dropdown, Menu, Divider, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { getTheme } from 'formula_one'
import { appsApi } from '../urls'

import sidenav from '../css/sidenav.css'

class SideNav extends Component {
  constructor (props) {
    super(props)
    const history = this.props.history
    const location = history.location.pathname
    const pathArray = location.split('/')
    const active =
      pathArray[2] === 'app' && /^\d+$/g.test(pathArray[3])
        ? parseInt(pathArray[3])
        : null
    this.state = {
      apps: null,
      active: active
    }
  }

  getApps = () => {
    axios
      .get(appsApi())
      .then(res => {
        this.setState({
          apps: res.data.results
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount () {
    this.getApps()
  }

  handleAppClick = pk => {
    this.setState({ active: pk })
    const { history } = this.props
    history.push(`/pseudoc_framework/app/${pk}`)
  }

  render () {
    const active = this.state.active
    return (
      <Menu
        secondary
        vertical
        inverted
        attached
        styleName='sidenav.sidenav-menu'
        color={getTheme()}
      >
        {this.state.apps
          ? this.state.apps.map(app => {
              return (
                <Fragment key={app.pk}>
                  <Menu.Item
                    name={app.name}
                    styleName={
                      active === app.pk
                        ? 'sidenav.sidenav-active-item'
                        : 'sidenav.sidenav-items'
                    }
                    // as='h4'
                    onClick={() => this.handleAppClick(app.pk)}
                  >
                    {app.name}
                  </Menu.Item>
                  <Divider styleName='sidenav.sidenav-divider' />
                </Fragment>
              )
            })
          : null}
      </Menu>
    )
  }
}

export default SideNav
