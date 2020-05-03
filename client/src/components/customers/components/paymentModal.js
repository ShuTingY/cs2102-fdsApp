import React, {useState, useEffect} from "react";
import {Button, Loader, Modal, Rating} from 'semantic-ui-react';
import Axios from "axios";

export default function PaymentModal(props) {
    const [open, setOpen] = useState(false);
    const [done, setDone] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    
    const handleOpen=()=> {
        setOpen(true);
        const {carts, total, address, coupon, payment, deliveryFee} = props;
        Axios.post('/api/customer/placeOrder', {totalcost:total,
                                                address:address,
                                                coupon:coupon,
                                                payment:payment,
                                            deliveryFee:deliveryFee})
            .then(res=> {
                console.log(res.data);
                setMessage(res.data);
                setDone(true);
                setTimeout(() => {
                    props.redirectTOHomePage();
                }, 5000);
            })
            .catch(err=> {
                console.log(err.message);
            })
        
    
    }

    const handleClose = ()=> {
        setOpen(false);
        props.redirectTOHomePage()
        
    }
    setTimeout(() => {
        setLoading(false)
    }, 5000);
    return (
        <Modal
            trigger={<Button color="red" onClick={handleOpen}>Pay and place order</Button>}
            open={open}
            basic 
            onClose={handleClose}
            size='small'
            >
            <Modal.Header icon="browser" content ='Place order'/>  
                         
            {loading || !done? 
                <div display='flex'>
                    <Modal.Content> 
                    <p>**If pay by card, assume an api is used that deduced the money from the customer's card </p>
                    <Loader active inline='centered'>Process order</Loader> 
                    </Modal.Content>
                </div>
                :
                <div display='flex'>
                    <Modal.Content>
                    <h3> {message}</h3>
                    <p> You will be redirect to home page in 5s....</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button 
                            inverted
                            onClick ={handleClose}
                            color ='green'
                            >DONE</Button>
                    </Modal.Actions>
                </div>
            }
            </Modal>

    )
    
}


