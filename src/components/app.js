import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import { Sidebar, Segment } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import { AppHeader, AppFooter, AppMain, ErrorDart } from 'formula_one'

import SideNav from './sidenav'
import AppDetails from './appDetails'
import HomePage from './homePage'
import sidenav from '../css/sidenav.css'
import main from 'formula_one/src/css/app.css'
import blocks from '../css/app.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sideBarVisibility: false
    }
  }

  handleSidebarClick = () => {
    this.setState(prevState => ({
      sideBarVisibility: !prevState.sideBarVisibility
    }))
  }

  render () {
    const { history } = this.props
    const creators = [
      {
        name: 'Praduman Goyal',
        role: 'Mentor',
        link: 'https://pradumangoyal.github.io'
      },
      {
        name: 'Rishi Ranjan',
        role: 'Mentor',
        link: 'https://github.com/rish9101'
      },
      {
        name: 'Mrinal Kumar',
        role: 'Full Stack Developer',
        link: 'https://github.com/kmrinal19'
      },
      {
        name: 'Rochak Jain',
        role: 'Full Stack Developer',
        link: 'https://github.com/rochakjain361'
      }
    ]

    return (
      <div styleName='main.app'>
        <AppHeader
          appName='pseudoc_framework'
          mode='app'
          sideBarButton={isMobile}
          sideBarVisibility={this.state.sideBarVisibility}
          onSidebarClick={this.handleSidebarClick}
          userDropdown
        />
        <AppMain>
          <div styleName='main.app-main'>
            {isMobile ? (
              <div styleName='sidenav.app-sidebar-main'>
                <Sidebar
                  animation='overlay'
                  styleName='sidenav.app-sidebar-wrapper'
                  visible={this.state.sideBarVisibility}
                >
                  <SideNav history={history} />
                </Sidebar>
              </div>
            ) : (
              <SideNav history={history} />
            )}
            <Scrollbars autoHide>
              <Switch>
                <Route exact path='/pseudoc_framework' component={HomePage} />
                <Route
                  exact
                  path='/pseudoc_framework/app/:id'
                  component={AppDetails}
                />
                <Route
                  render={() => {
                    return (
                      <Segment basic styleName='blocks.error-page'>
                        <ErrorDart />
                      </Segment>
                    )
                  }}
                />
              </Switch>
            </Scrollbars>
          </div>
        </AppMain>
        <AppFooter creators={creators} />
      </div>
    )
  }
}

export default connect(null, null)(App)
