import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import '../../App.css';

const Landing = ({isDoctorAuthenticated, isUserAuthenticated}) => {
    if(isDoctorAuthenticated){
        return <Redirect to="/dashboard" />
    } else if(isUserAuthenticated) {
        return <Redirect to="/appointment" />
    }

    return (
        <Fragment>
            <section id="landing">
                <div className="container">
                    <div className="heading">
                        <h1 className="main-heading">Find Your Best Doctor &</h1>
                        <h1 className="main-heading">Book Your Appointment.</h1>
                    </div>
               
                    <div className="signup">
                        <div className="doctor-signup">
                            {/* <h2 className=" item heading-sub"><strong>For Doctors</strong></h2> */}
                            <h4 className="item special description text-center"><strong>For Doctors</strong></h4>
                            <Link to="/registerDoctor" type="button" className="item btn btn-outline-info">Sign Up</Link>
                        </div>
                        <div className="user-signup">
                            {/* <h2 className="item heading-sub"><strong>For Users</strong></h2> */}
                            <h4 className="item special description text-center"><strong>For Users</strong></h4>
                            <Link to="/registerUser" className="item btn btn-outline-info">Sign Up</Link>
                        </div>
                    </div>
                    
                    <br />
                    <div className="img">
                        <div className="img-1">
                            <img src={require("../../img/undraw_doctor_kw5l.svg")}  />
                        </div>
                    </div>
                </div>
                <br />
            </section>
        </Fragment>
    );
};
Landing.propTypes = {
    isDoctorAuthenticated: PropTypes.bool.isRequired,
    isUserAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isDoctorAuthenticated: state.authDoctor.isDoctorAuthenticated,
    isUserAuthenticated: state.authUser.isUserAuthenticated
});

export default connect(mapStateToProps)(Landing);
