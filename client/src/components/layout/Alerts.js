import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Alert} from 'reactstrap';

const Alerts = ({ alerts }) => alerts !== undefined && alerts.length > 0 && alerts.map(alert => (
<Alert key={alert.id} color={alert.alertType}>{alert.message}</Alert>
));

Alerts.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.ui.alerts
});
  

export default connect(mapStateToProps)(Alerts);