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
      data: {},
      isLoading: true
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

  handleSubmit = () => {
    console.log(this.state.data)
    let headers = {
      'X-CSRFToken': getCookie('csrftoken')
    }
    axios
      .post(this.state.query.api, this.state.data, { headers: headers })
      .then(res => {
        console.log(res)
        this.handleReset()
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    const isLoading = this.state.isLoading
    return (
      <Form>
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
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </Form>
    )
  }
}
