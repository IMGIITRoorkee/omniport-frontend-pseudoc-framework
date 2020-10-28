import React, { Component } from 'react'
import axios from 'axios'
import { Grid, GridColumn, Segment, Header, Container } from 'semantic-ui-react'
import { appDetailApi } from '../urls'
import AppQuery from './appQuery'

class AppDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      app_name: null,
      app_description: null,
      app_queries: null
    }
  }

  getAppDetails = () => {
    axios
      .get(appDetailApi(this.state.id))
      .then(res => {
        console.log(res)
        this.setState({
          app_name: res.data.name,
          app_description: res.data.shortDescription,
          app_queries: res.data.queries
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount () {
    this.getAppDetails()
  }

  componentDidUpdate = prevProps => {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({ id: this.props.match.params.id }, () =>
        this.getAppDetails()
      )
    }
  }

  render () {
    console.log(this.state.app_queries)
    return (
      <Container>
        <Segment vertical>
          <Header as='h2'>{this.state.app_name}</Header>
        </Segment>
        <Segment vertical>
          <Header as='h3'>{this.state.app_description}</Header>
        </Segment>
        <Container>
          {this.state.app_queries
            ? this.state.app_queries.map(query => {
                return (
                  <AppQuery
                    key={query.pk}
                    pk={query.pk}
                    label={query.label}
                    shortDescription={query.shortDescription}
                  />
                )
              })
            : null}
        </Container>
      </Container>
    )
  }
}

export default AppDetails
