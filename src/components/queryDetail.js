import React from 'react'
import axios from 'axios'
import {
  Grid,
  Form,
  Button,
  Message,
  Loader,
  Container
} from 'semantic-ui-react'
import InputField from './input-field'
import { queryDetailApi, executeQueryApi } from '../urls'
import { getTheme, getCookie } from 'formula_one'
import { toast } from 'react-semantic-toasts'

export class QueryDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.id,
      formError: false,
      error_messages: [],
      data: {},
      isLoading: true,
      submitDisabled: false,
      success_message: '',
      submitSuccess: false,
      error: false,
      error_description: []
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
        this.setState({
          isLoading: false,
          error: true,
          error_description: ['Unable to fetch the Query']
        })
        toast({
          type: 'error',
          title: 'Unable to fetch the Query',
          description: err.response.status + ' - ' + err.response.statusText
        })
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

  handleReset = () => {
    this.setState({
      data: {}
    })
  }

  addErrorMessage = message => {
    this.setState(prevState => ({
      error_messages: [...prevState.error_messages, message]
    }))
  }

  validateNumber = (num, field) => {
    let min = field.fieldAttribute.min
    let max = field.fieldAttribute.max
    num = parseInt(num)
    if (min && max && (num < min || num > max)) {
      let error_message = `${field.displayName}: Range should be from ${min} to ${max}.`
      this.addErrorMessage(error_message)
      return false
    } else if (min !== null && parseInt(num) < min) {
      let error_message = `${field.displayName}: Number should be greater than ${min}.`
      this.addErrorMessage(error_message)
      return false
    } else if (max !== null && num > max) {
      let error_message = `${field.displayName}: Number should be less than ${max}.`
      this.addErrorMessage(error_message)
      return false
    }
    return true
  }

  validateText = (text, field) => {
    let maxLength = field.fieldAttribute.maxLength
    if (maxLength !== null) {
      if (text.length > maxLength) {
        let error_message = `${field.displayName}: Maximum length cannot be greater than ${maxLength}.`
        this.addErrorMessage(error_message)
        return false
      }
    }
    return true
  }

  validateData = data => {
    const fields = this.state.query.fieldList
    let isValid = true
    for (let field of fields) {
      if (data[field.name] || data[field.name] === false) {
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
          let error_message = `${field.displayName}: This field is required.`
          this.addErrorMessage(error_message)
        }
      }
    }
    return isValid
  }

  submitForm = () => {
    let headers = {
      'X-CSRFToken': getCookie('csrftoken')
    }
    axios
      .post(executeQueryApi(this.state.id), this.state.data, { headers: headers })
      .then(res => {
        let default_success_message =
          'Your query has been submitted successfully'
        let success_message = res.data
        this.setState({
          success_message: success_message
            ? success_message
            : default_success_message,
          submitSuccess: true,
          submitDisabled: false
        })
        this.handleReset()
      })
      .catch(err => {
        let response = err.response
        this.setState({
          formError: true,
          submitDisabled: false
        })
        this.addErrorMessage(response.data)
        toast({
          type: 'error',
          title: response.status + ' - ' + response.statusText,
          description: response.data
        })
      })
  }

  handleSubmit = () => {
    this.setState(
      {
        formError: false,
        error_messages: [],
        submitSuccess: false,
        success_message: '',
        submitDisabled: true
      },
      () => {
        const isValid = this.validateData(this.state.data)
        if (isValid) {
          this.submitForm()
        } else if (!isValid) {
          this.setState({
            formError: true,
            submitDisabled: false
          })
        }
      }
    )
  }

  render () {
    const isLoading = this.state.isLoading
    const formError = this.state.formError
    const error = this.state.error
    const submitSuccess = this.state.submitSuccess
    const error_messages = this.state.error_messages
    const success_message = this.state.success_message
    return (
      <Container>
        {error ? (
          <Message
            error
            icon='frown outline'
            header='Error'
            content={this.state.error_description}
          />
        ) : (
          <Form error={formError} success={submitSuccess}>
            <Message
              error
              icon='frown outline'
              header='Error'
              list={error_messages}
            />
            <Message
              success
              header='Query Submitted'
              content={success_message}
            />
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
        )}
      </Container>
    )
  }
}
