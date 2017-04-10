import React, { PropTypes } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import ChoresDashboard from './choresDashboardContainer.jsx';
import Tasks from './tasksContainer.jsx';

// import actions here and then add the to mapStateToProps

// main react app component
class Dashboard extends Component {
  render() {
    return (
      <div className="dashboardCont">

        <div className="col-md-6"><ChoresDashboard /></div>
        <div className="col-md-6"><Tasks /></div>
        <div className="col-md-6">Dashboard</div>
        <div className="col-md-6">Dashboard</div>
        <div className="col-md-6">Dashboard</div>
      </div>
    );
  }
}

// App.propTypes = {
//   define destructured proptypes here
// };

// const mapDispatchToProps = dispatch => ({
//   someKey: (someArg) => {dispatch(someFunc(someArg))}
// })

export default connect()(Dashboard);
// export default App;
