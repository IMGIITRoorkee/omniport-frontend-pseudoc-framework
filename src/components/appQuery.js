import React, { Component } from 'react'
import axios from 'axios'
import { queryDetailApi } from '../urls';
import { getTheme } from 'formula_one'
import { Container, Header, Segment } from 'semantic-ui-react';

class AppQuery extends Component{
    constructor(props){
        super(props)
        this.state = {
            query_pk: this.props.pk,
            query_label: null,
            query_shortDescription: null,
            query_fieldList: null,
        }
    }
    getQueryDetails = () => {
        axios.get(queryDetailApi(this.state.query_pk))
            .then(res => {
                console.log(res)
                this.setState({
                    query_label: res.data.label,
                    query_shortDescription: res.data.shortDescription,
                    query_fieldList: res.data.fieldList,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount(){
        this.getQueryDetails()
    }

    render(){
        return(
            <Container>
                <Segment color={getTheme()}>
                    <Header as='h3'>{this.state.query_label}</Header>
                    <Header as='h4'>{this.state.query_shortDescription}</Header>
                </Segment>
            </Container>
        )
    }
}
export default AppQuery