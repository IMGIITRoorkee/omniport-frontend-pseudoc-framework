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
      submitDisabled: false
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

  validateNumber = (num, field) => {
    let min = field.fieldAttribute.min
    let max = field.fieldAttribute.max
    num = parseInt(num)
    if (min && max && (num < min || num > max)) {
      this.setState(prevState => ({
        error_msgs: [
          ...prevState.error_msgs,
          `${field.displayName}: Range should be from ${min} to ${max}.`
        ]
      }))
      return false
    } else if (min !== null && parseInt(num) < min) {
      this.setState(prevState => ({
        error_msgs: [
          ...prevState.error_msgs,
          `${field.displayName}: Number should be greater than ${min}.`
        ]
      }))
      return false
    } else if (max !== null && num > max) {
      this.setState(prevState => ({
        error_msgs: [
          ...prevState.error_msgs,
          `${field.displayName}: Number should be less than ${max}.`
        ]
      }))
      return false
    }
    return true
  }

  validateText = (text, field) => {
    let maxLength = field.fieldAttribute.maxLength
    if (maxLength !== null) {
      if (text.length > maxLength) {
        this.setState(prevState => ({
          error_msgs: [
            ...prevState.error_msgs,
            `${field.displayName}: Maximum length cannot be greater than ${maxLength}.`
          ]
        }))
        return false
      }
    }
    return true
  }

  validateData = data => {
    const fields = this.state.query.fieldList
    let isValid = true
    for (let field of fields) {
      if (data[field.name]) {
        switch (field.fieldAttribute.type) {
          case 'numeric':
            let isValidNum = this.validateNumber(data[field.name], field)
            isValid = isValid && isValidNum
            break
          case 'text':
            let isValidText = this.validateText(data[field.name], field)
            isValid = isValid && isValidText
            break
          default:
            null
        }
      } else {
        if (field.required) {
          isValid = false
          this.setState(prevState => ({
            error_msgs: [
              ...prevState.error_msgs,
              `${field.displayName}: This field is required.`
            ]
          }))
        }
      }
    }
    return isValid
  }

  handleSubmit = () => {
    this.setState(
      { error: false, error_msgs: [], submitDisabled: true },
      () => {
        const isValid = this.validateData(this.state.data)
        if (isValid) {
          let headers = {
            'X-CSRFToken': getCookie('csrftoken')
          }
          axios
            .post(this.state.query.api, this.state.data, { headers: headers })
            .then(res => {
              console.log(res)
              this.props.onSubmit()
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
      }
    )
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
