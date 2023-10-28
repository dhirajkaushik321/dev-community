import React,{useEffect,Fragment} from 'react'
import { Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile,deleteAccount} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
const Dashboard = ({auth:{user},profile:{profile,loading},getCurrentProfile,deleteAccount}) => {
 
    useEffect(() => {
        getCurrentProfile()   // eslint-disable-next-line
    },[])
    return (
        loading && profile===null ?
        <Spinner/>
        :<Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i>  Welcome {user && user.name}
            </p>
        {profile!==null ? <Fragment>
            <DashboardActions/>
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
            <div className="my-2">
                <button className="btn btn-danger" onClick={deleteAccount}>
                    <i className="fas fa-user-minus"></i>
                    Delete my account
                </button>
            </div>
        </Fragment>
         :<Fragment>
             <p>You have not created profile yet,please add some info</p>
             <Link to="/create-profile" className="btn btn-primary my-1">Create profile</Link>
         </Fragment>}
        </Fragment>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    getCurrentProfile:PropTypes.func.isRequired
}
const mapStateToProps =state=>({
    auth: state.auth,
    profile: state.profile
})

const mapDispatchToProps ={
    getCurrentProfile,
    deleteAccount
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
