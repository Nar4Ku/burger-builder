import React from 'react';

import classes from './ContactData.module.scss';
import Button from '../../../components/UI/Button/Button';

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name"/>
                    <input type="email" name="email" placeholder="Your Email"/>
                    <input type="text" name="street" placeholder="Street"/>
                    <input type="text" name="postal" placeholder="Postal Code"/>

                    <div>
                        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ContactData;
