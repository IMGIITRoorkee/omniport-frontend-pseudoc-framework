import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import { Segment, Container } from 'semantic-ui-react'
import { Route } from 'react-router-dom'

import { AppHeader, AppFooter, AppMain, getTheme } from 'formula_one'

import SideNav from './sidenav'
import AppDetails from './appDetails'
import main from 'formula_one/src/css/app.css'
import blocks from '../css/app.css'

class App extends Component {
  render () {
    const {history} = this.props
    const creators = [
      {
        name: 'Dhruv Bhanushali',
        role: 'Mentor',
        link: 'https://dhruvkb.github.io/'
      },
      {
        name: 'Praduman Goyal',
        role: 'Frontend developer',
        link: 'https://pradumangoyal.github.io'
      }
    ]

    return (
      <div styleName='main.app'>
        <AppHeader appName='pseudoc_framework' mode='app' userDropdown/>
        <AppMain>
          <div styleName='main.app-main'>
            <SideNav history = {history}/>
            <Scrollbars autoHide>
              <Route
                exact
                path='/pseudoc_framework/app/:id'
                component={AppDetails}
              />
            </Scrollbars>
          </div>
        </AppMain>
        <AppFooter creators={creators} />
      </div>
    )
  }
}

export default connect(
  null,
  null
)(App)
