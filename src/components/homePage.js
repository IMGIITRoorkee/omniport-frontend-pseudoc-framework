import React, { Component } from 'react'
import { Container, Header, Segment, Step, Icon } from 'semantic-ui-react'
import app from '../css/app.css'

class HomePage extends Component {
  render () {
    return (
      <div>
        <Container styleName={'app-detail-container'}>
          <Segment vertical>
            <Header as='h1'>Welcome to Pseudoc</Header>
          </Segment>
          <Segment vertical>
            <Container as='h3'>
              App designed to resolve and execute queries for the apps deployed
              on Channel-I
            </Container>
            <Container as='h2'>Steps to operate the Pseudoc App:</Container>
          </Segment>
          <Segment vertical>
            <Container styleName={'home-page-stepper'}>
              <Step.Group stackable='tablet'>
                <Step>
                  <Icon name='folder' />
                  <Step.Content>
                    <Step.Title>App</Step.Title>
                    <Step.Description>
                      Choose the app from the sidebar
                    </Step.Description>
                  </Step.Content>
                </Step>
                <Step>
                  <Icon name='question circle' />
                  <Step.Content>
                    <Step.Title>Query</Step.Title>
                    <Step.Description>
                      Choose the query to be executed from the directory
                    </Step.Description>
                  </Step.Content>
                </Step>
                <Step>
                  <Icon name='check circle' />
                  <Step.Content>
                    <Step.Title>Confirm Details</Step.Title>
                    <Step.Description>
                      Fill in the query details and submit the query
                    </Step.Description>
                  </Step.Content>
                </Step>
              </Step.Group>
            </Container>
          </Segment>
        </Container>
      </div>
    )
  }
}
export default HomePage
