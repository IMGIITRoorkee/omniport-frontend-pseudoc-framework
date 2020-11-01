import React, { Component } from 'react'
import { getTheme } from 'formula_one'
import { Grid, Header, Segment, Transition, Icon } from 'semantic-ui-react'
import { QueryDetail } from './queryDetail'

class AppQuery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query_pk: this.props.pk,
      query_label: this.props.label,
      query_shortDescription: this.props.shortDescription,
      field_animation: 'drop',
      field_duration: 500,
      field_visible: false
    }
  }

  onSubmitChangeVisibility = () => {
    this.setState({
      field_visible: false
    })
  }

  handleVisibility = () => {
    this.setState(prevState => ({
      field_visible: !prevState.field_visible
    }))
  }

  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      this.setState({
        query_pk: this.props.pk,
        query_label: this.props.label,
        query_shortDescription: this.props.shortDescription,
        field_visible: false
      })
    }
  }

  render () {
    const { field_animation, field_duration, field_visible } = this.state

    return (
      <Segment color={getTheme()} padded>
        <Grid columns={2}>
          <Grid.Row onClick={this.handleVisibility}>
            <Grid.Column>
              <Header as='h3'>{this.state.query_label}</Header>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Icon
                link
                name={field_visible ? 'angle up' : 'angle down'}
                size={'large'}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Header as='h4'>Details: {this.state.query_shortDescription}</Header>
        <Transition.Group animation={field_animation} duration={field_duration}>
          {field_visible && (
            <QueryDetail
              id={this.state.query_pk}
              onSubmit={this.onSubmitChangeVisibility}
            />
          )}
        </Transition.Group>
      </Segment>
    )
  }
}
export default AppQuery
