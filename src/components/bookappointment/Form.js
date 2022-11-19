import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addAppointment} from '../../actions/appointment';
import { Link } from 'react-router-dom';

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'


const Form = ({profile, doctorId,history, addAppointment}) => {

    const [formData, setFormData] = useState({
        patientname: '',
        fathername: '',
        age:'',
        status:'',
        date:'',
        description:''
    });   

    const {
        patientname,
        fathername,
        age,
        status,
        date,
        description
    } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const [name, setName] = useState('Mehul')

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Check your Internet Connection')
			return
		}

		const data = await fetch('http://localhost:3000/razorpay', { method: 'POST' }).then((t) =>
			t.json()
		)

		console.log(data)
        
		const options = {
			key: __DEV__ ? 'rzp_test_GtfJIU7t9Di70j' : 'PRODUCTION_KEY',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Doctor Fee',
			description: 'This is the fee for your checkup Appointment',
			image: 'http://localhost:3000/logo.svg',
			handler: function (response) {
				// alert(response.razorpay_payment_id)
				// alert(response.razorpay_order_id)
				// alert(response.razorpay_signature)
                alert("Payment Successful !!!")
			},
			prefill: {
				name,
				email: '',
				phone_number: ''
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}
    return (
        <Fragment>
        <br />
            <div className="heading-common">
                <h1><strong>Book Appointment</strong>
                </h1>  
                <p className="lead">
                    Provide your details correctly and book your appointment.
                </p>
            <div className="appointment-doctor">
                <img className="round-img appointment-img" src={profile.avatar} alt="" />
                <p className="lead"><strong>{profile.name}</strong></p>
            </div>
            </div>
            <form onSubmit={e => {
                e.preventDefault();
                addAppointment(doctorId, formData, history);  
            }}>
                <small>* required field</small>
                <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="* Patient's name"
                    name="patientname"
                    value={patientname}
                    onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <input
                    type="text" 
                    className="form-control" 
                    placeholder="* Father's name"
                    name="fathername" 
                    value={fathername} 
                    onChange={e => onChange(e)} />
                </div>                    
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="* Age"
                        name="age" 
                        value={age} 
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="* Status"
                        name="status" 
                        value={status} 
                        onChange={e => onChange(e)} />
                        <small className="form-text">Status like profession (eg. student, job etc)</small>
                    </div>
                    <h6>Check for available slots.</h6>
                    <div className="form-group">
                    <a href='https://calendar.app.google/9xTZgYZEjWUpUM3g8' class="btn btn-danger  d-grid gap-2 col-6 mx-auto btn-md text-light" target='_blank' >Book Appointment</a>
                    
                    {/* <iframe src="https://calendar.google.com/calendar/appointments/AcZssZ23uwYatZE0j9gLYvetYbCqkJN3yrIaq5MR49A=?gv=true" style="border: 0" width="100%" height="600" frameborder="0"></iframe> */}

                </div>
                    <h6>Enter the Appointment Date you have chosen above.</h6>
                <div className="form-group">
                    <input 
                         type="date" 
                        className="form-control" 
                        name="date" 
                        value={date}
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <textarea 
                        className="form-control" 
                        placeholder="* Health Problem Description" 
                        name="description" 
                        value={description}
                        onChange={e => onChange(e)}
                        ></textarea>
                    <small className="form-text">Tell us about the Health Problem.</small>
                </div>
                <a
					type="button"
                    className="btn btn-success  d-grid gap-2 col-6 mx-auto btn-lg text-light"
					onClick={displayRazorpay}
					target="_blank"
					rel="noopener noreferrer"
				>
					Pay Doctor Fee
				</a>
                <br></br>
                <input type="submit" value="Submit" className="btn btn-outline-info  d-grid gap-2 col-6 mx-auto btn-lg " />{' '}
                <Link to="/profiles" type="submit" className="btn btn-outline-info  d-grid gap-2 col-6 mx-auto btn-lg mt-2">Go Back</Link>
            </form>
            <br />
        </Fragment>
    );
};

Form.propTypes = {
    addAppointment: PropTypes.func.isRequired
}

export default connect(null, {addAppointment})(Form);
