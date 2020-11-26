import React, { Component } from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'
import app from '../css/app.css'

class HomePage extends Component {
  render () {
    return (
      <div>
        <Container styleName={'app-detail-container'}>
          <Segment vertical>
            <Header as='h1'>Welcome to Pseudoc Portal</Header>
          </Segment>
          <Segment vertical>
              <Container as='h3'>
                  An app which provides a pseudo control of other apps
              </Container>
          </Segment>
        </Container>
      </div>
    )
  }
}
export default HomePage
