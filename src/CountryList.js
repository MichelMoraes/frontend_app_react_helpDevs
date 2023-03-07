import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class CountryList extends Component {

    constructor(props) {
        super(props);
        this.state = {countries: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/api/v1/jpa/countries')
            .then(response => response.json())
            .then(data => this.setState({countries: data}));
    }

    async remove(id) {
        await fetch(`/api/v1/jpa/country/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedCountries = [...this.state.countries].filter(i => i.id !== id);
            this.setState({countries: updatedCountries});
        });
    }

    render() {
        const {countries} = this.state;

        const countriesList = countries.map(countries => {
            return <tr key={countries.id}>
                <td style={{whiteSpace: 'nowrap'}}>{countries.name}</td>
       
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/api/v1/jpa/countries" + countries.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(countries.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/api/v1/jpa/country/">Add Country</Button>
                    </div>
                    <h3>Countries</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {countriesList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );   }
}

export default CountryList;