import React from 'react'
import axios from 'axios'
import {
    Segment,
    Grid,
    Header,
    Form,
    Button,
    Placeholder,
    Message
  } from 'semantic-ui-react' 
import InputField from './input-field'
import { queryDetailApi } from '../urls';

export class QueryDetail extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            id: this.props.id,
            error: false
        }
    }

    getQuery = () => {
        axios.get(queryDetailApi(this.state.id))
        .then( res => {
            this.setState({ query : res.data})
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
          [name]: value
        })
    }

    render(){
        return (
            <Form>
                <Grid stackable>
                    {this.state.query ? (
                        this.state.query.fieldList.map(
                            (field, index) => {
                                return (
                                    <InputField
                                        key={field.pk}
                                        field={field}
                                        handleChange={this.handleChange}
                                        error={false}
                                    />
                                )
                            }
                        )
                    ) : null}
                </Grid>
            </Form>
        )
    }
}
