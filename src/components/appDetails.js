import axios from 'axios'
import { Grid, GridColumn, Segment } from 'semantic-ui-react';
import { appsApi } from '../urls';
const { Component } = require("react");

class AppDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            id : this.props.match.params.id,
            app_name: '',
            app_description: ''
        }
    }

    getAppDetails = () => {
        axios.get(appsApi())// To be updated, still working on Routes
            .then(res => {
                this.setState({
                    ...this.state,
                    app_name: res.data.name,
                    app_description: res.data.shortDescription,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount(){
        this.getAppDetails()
    }

    render(){
        return(
            <React.Fragment>
                <Segment attached='top'>
                    <Header as='h2'>App Details</Header>
                </Segment>
                <Segment attached='bottom'>
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column as='h2' width={3}>
                                App Name
                            </Grid.Column>
                            <GridColumn width={5}>
                                {this.state.app_name}
                            </GridColumn>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column as='h3' width={3}>
                                App Description
                            </Grid.Column>
                            <GridColumn width={5}>
                                {this.state.app_description}
                            </GridColumn>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </React.Fragment>
        )
    }
}

export default AppDetails