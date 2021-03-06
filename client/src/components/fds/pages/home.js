import React, { useState, useEffect } from 'react'
import HeaderMenu from '../layout/headerMenu'
import CustomMonthPicker from '../components/customMonthPicker'
import GeneralSummary from '../components/generalSummary'
import CustomerSummary from '../components/customerSummary'
import LocationSummary from '../components/locationSummary'
import RiderSummary from '../components/riderSummary'
import { Button, Form, Header, Tab, Table, Segment } from 'semantic-ui-react'
import Utils from '../components/utils/utils'
import axios from 'axios';

export default function FHome(props) {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [generalSummary, setGeneralSummary] = useState([]);
    const [customerSummaries, setCustomerSummaries] = useState([]);
    const [locationSummaries, setLocationSummaries] = useState([]);
    const [riderSummaries, setRiderSummaries] = useState([]);
    const [showGeneral, setShowGeneral] = useState(false);
    const [showCustomer, setShowCustomer] = useState(false);
    const [showLocation, setShowLocation] = useState(false);
    const [showRider, setShowRider] = useState(false);

    function renderPanes() {
        var panes = [
            {
              menuItem: 'General Summary',
              render: () => <Tab.Pane attached={false}>
                  {showGeneral?
                    <Table textAlign='center'>
                        <Table.Header>
                            <Table.Row>
                            <Table.HeaderCell>Total Number of Orders</Table.HeaderCell>
                            <Table.HeaderCell>Total Cost of All Orders</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {generalSummary.map(gs=> 
                                
                                <GeneralSummary generalSummary={gs} />
                                
                            )}
                        </Table.Body>
                    </Table>
                        : "Loading.."
                    }
              </Tab.Pane>,
            },
            {
              menuItem: 'Customer Summary',
              render: () => <Tab.Pane attached={false}>
                  {showCustomer?
                    <Table textAlign='center'>
                        <Table.Header>
                            <Table.Row>
                            <Table.HeaderCell>User ID</Table.HeaderCell>
                            <Table.HeaderCell>Total Number of Orders</Table.HeaderCell>
                            <Table.HeaderCell>Total Cost of Orders</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {customerSummaries.map(cs=> 
                                
                                <CustomerSummary customerSummary={cs} />
                                
                            )}
                        </Table.Body>
                    </Table>
                        : "Loading.."
                    }
              </Tab.Pane>,
            },
            {
              menuItem: 'Location Summary',
              render: () => <Tab.Pane attached={false}>
                  {showLocation?
                    <Table textAlign='center'>
                        <Table.Header>
                            <Table.Row>
                            <Table.HeaderCell>Area</Table.HeaderCell>
                            <Table.HeaderCell>Total Number of Orders</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {locationSummaries.map(ls=> 
                                
                                <LocationSummary locationSummary={ls} />
                                
                            )}
                        </Table.Body>
                    </Table>
                        : "Loading.."
                    }
              </Tab.Pane>,
            },
            {
                menuItem: 'Rider Summary',
                render: () => <Tab.Pane attached={false}>
                    {showRider?
                        <Table textAlign='center'>
                            <Table.Header>
                                <Table.Row>
                                <Table.HeaderCell>User ID</Table.HeaderCell>
                                <Table.HeaderCell>Salary</Table.HeaderCell>
                                <Table.HeaderCell>Total Deliveries</Table.HeaderCell>
                                <Table.HeaderCell>Average Delivery Time (mins)</Table.HeaderCell>
                                <Table.HeaderCell>Total Ratings</Table.HeaderCell>
                                <Table.HeaderCell>Average Rating</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {riderSummaries.map(rs=> 
                                    
                                    <RiderSummary riderSummary={rs} />
                                    
                                )}
                            </Table.Body>
                        </Table>
                            : "Loading.."
                    }
                </Tab.Pane>,
              }
          ]

        return panes
    }


    function submit() {
        setShowGeneral(false);
        setShowCustomer(false);
        setShowLocation(false);
        setShowRider(false);

        const fetchGeneralSummary = async () => {
            await axios.get('/api/fdsManager/summary/general', {
                params: {
                    month: Utils.formatMonthString(selectedMonth)
                }
            })
                .then(res=> {
                    setGeneralSummary(res.data);
                    setShowGeneral(true);
                });
        };

        const fetchCustomerSummary = async () => {
            await axios.get('/api/fdsManager/summary/customer', {
                params: {
                    month: Utils.formatMonthString(selectedMonth)
                }
            })
                .then(res=> {
                    setCustomerSummaries(res.data);
                    setShowCustomer(true);
                });
        };

        const fetchLocationSummary = async () => {
            await axios.get('/api/fdsManager/summary/location', {
                params: {
                    month: Utils.formatMonthString(selectedMonth)
                }
            })
                .then(res=> {
                    setLocationSummaries(res.data);
                    setShowLocation(true);
                });
        };

        const fetchRiderSummary = async () => {
            await axios.get('/api/fdsManager/summary/rider', {
                params: {
                    month: Utils.formatMonthString(selectedMonth)
                }
            })
                .then(res=> {
                    setRiderSummaries(res.data);
                    setShowRider(true);
                });
        };

        fetchGeneralSummary();
        fetchCustomerSummary();
        fetchLocationSummary();
        fetchRiderSummary();
    }

    useEffect(() => {

        setSelectedMonth(new Date());

        const fetchData = async () => {
            await axios.get('/api/fdsManager/summary/general', {
                params: {
                    month: Utils.formatMonthString(selectedMonth)
                }
            })
                    .then(res=> {
                        setGeneralSummary(res.data);
                        setShowGeneral(true);
                    })
            await axios.get('/api/fdsManager/summary/customer', {
                params: {
                    month: Utils.formatMonthString(selectedMonth)
                }
            })
                    .then(res=> {
                        setCustomerSummaries(res.data);
                        setShowCustomer(true);
                    })
            await axios.get('/api/fdsManager/summary/location', {
                params: {
                    month: Utils.formatMonthString(selectedMonth)
                }
            })
                    .then(res=> {
                        setLocationSummaries(res.data);
                        setShowLocation(true);
                    })
            await axios.get('/api/fdsManager/summary/rider', {
                params: {
                    month: Utils.formatMonthString(selectedMonth)
                }
            })
                    .then(res=> {
                        setRiderSummaries(res.data);
                        setShowRider(true);
                    })
        }

        fetchData();
    }, [])

    return(
        <div className="Home">
            <HeaderMenu/>
            <Header 
                as='h1' 
                textAlign='center'
                content='FDS Manager Homepage'
                subheader='View application statistics'
            />
            <div class="container">
            <Segment basic textAlign='center'>
                <Form>
                    <Form.Field
                            label='Month'
                            control={CustomMonthPicker}
                            originalDate={selectedMonth}
                            onChange={date => setSelectedMonth(date)}
                    />
                    <Button content='Filter' onClick={submit} />
                </Form>
            </Segment>
            <Segment basic textAlign='center'>
                <Tab panes={renderPanes()} menu={{ secondary: true, pointing: true }} /> 
            </Segment>
            </div>
        </div>
    )
}
