import React from 'react'
import axios from 'axios'
import {
  Segment,
  Grid,
  Header,
  Form,
  Button,
  Placeholder,
  Message,
  Loader
} from 'semantic-ui-react'
import InputField from './input-field'
import { queryDetailApi } from '../urls'
import { getTheme, getCookie } from 'formula_one'

export class QueryDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.id,
      error: false,
      error_msgs: [],
      data: {},
      isLoading: true,
      submitDisabled: false,
    }
  }

  getQuery = () => {
    this.setState({ isLoading: true })
    axios
      .get(queryDetailApi(this.state.id))
      .then(res => {
        this.setState({
          query: res.data,
          isLoading: false
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount () {
    this.getQuery()
  }

  handleChange = (name, value) => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    })
  }

  // TODO: Modify handleReset to reset dropdowns too
  handleReset = () => {
    this.setState({
      data: {}
    })
  }

  validateData = data => {
    const fields = this.state.query.fieldList
    const required = fields.filter(field => {
      return field.required
    })
    let isValid = true
    for (let field of required) {
      console.log(field)
      if (!data[field.name]) {
        isValid = false
        this.state.error_msgs = [
          ...this.state.error_msgs,
          `${field.displayName}: This field is required.`
        ]
      }
    }
    return isValid
  }

  handleSubmit = () => {
    this.setState({ error: false, error_msgs: [], submitDisabled: true }, () => {
      const isValid = this.validateData(this.state.data)
      if (isValid) {
        let headers = {
          'X-CSRFToken': getCookie('csrftoken')
        }
        axios
          .post(this.state.query.api, this.state.data, { headers: headers })
          .then(res => {
            console.log(res)
            this.props.onSubmit();
            this.handleReset()
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.setState({
          error: true
        })
      }
    })
  }

  render () {
    const isLoading = this.state.isLoading
    const error = this.state.error
    const error_msgs = this.state.error_msgs
    return (
      <Form error={error}>
        <Message error>
          <Message.Header>Error</Message.Header>
          <Message.List items={error_msgs} />
        </Message>
        {isLoading ? (
          <Loader active />
        ) : (
          <Grid stackable>
            {this.state.query
              ? this.state.query.fieldList.map((field, index) => {
                  return (
                    <InputField
                      key={field.pk}
                      field={field}
                      handleChange={this.handleChange}
                      error={false}
                      value={this.state.data[field.name]}
                    />
                  )
                })
              : null}
            <Grid.Row as={Form.Field}>
              <Grid.Column width={4} verticalAlign='middle'>
                <Button
                  color={getTheme()}
                  onClick={this.handleSubmit}
                  basic
                  icon='check'
                  content='Submit'
                  disabled={this.state.submitDisabled}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </Form>
    )
  }
}
