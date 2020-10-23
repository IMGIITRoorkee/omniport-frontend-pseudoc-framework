import React, { Component } from 'react'
import axios from 'axios'
import { queryDetailApi } from '../urls';
import { getTheme } from 'formula_one'
import { Button, Container, Grid, GridColumn, Header, Segment, Transition } from 'semantic-ui-react';
import { QueryDetail } from './queryDetail';

class AppQuery extends Component{
    constructor(props){
        super(props)
        this.state = {
            query_pk: this.props.pk,
            query_label: this.props.label,
            query_shortDescription: this.props.shortDescription,
            field_animation: 'drop',
            field_duration: 500,
            field_visible: false,
        }
    }

    handleVisibility = () => {
        this.setState((prevState) => ({
            field_visible: !prevState.field_visible
        }))
    }

    componentDidUpdate = (prevProps) => {
        if(this.props !== prevProps ) {
            this.setState(
                {
                    query_pk: this.props.pk,
                    query_label: this.props.label,
                    query_shortDescription: this.props.shortDescription,
                    field_visible: false
                }
            )
        }
    }

    render(){
        const {field_animation, field_duration, field_visible} = this.state

        return(
            <Container>
                <Segment color={getTheme()}>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <Header 
                                 as='h3'>
                                    Query: {this.state.query_label}
                                </Header>
                            </Grid.Column>
                            <Grid.Column textAlign='right'>
                                <Button
                                    icon={field_visible ? 'angle up' : 'angle down'}
                                    onClick={this.handleVisibility}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Header 
                     as='h4'>
                         Details: {this.state.query_shortDescription}
                    </Header>
                    <Transition.Group
                    animation={field_animation} duration={field_duration}
                    >{field_visible 
                        && (
                        <QueryDetail 
                            id={this.state.query_pk}/>
                        )}
                    </Transition.Group>
                </Segment>
            </Container>
        )
    }
}
export default AppQuery