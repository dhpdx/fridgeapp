import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import ChoresDashboardContainer from './choresDashboardContainer';
import CompleteChore from '../components/chores/completeChore';
import AdminChores from '../components/chores/adminChores';
import AddChore from '../components/chores/addChore';
import GroupChores from '../components/chores/groupChores';
import GroupingOfChores from '../components/chores/groupingOfChores';
import {
  addChore,
  increaseGroups,
  decreaseGroups,
  assignGroup,
  rotateGroups,
} from '../actions/chore/chore';

import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

class Chores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: '',
      nextClicked: false,
      snackOpen: false,
      snackMessage: 'message default',
    }
    this.buttonSubmit = this.buttonSubmit.bind(this);
  }

  // this is not working
  handleKeyUp = (e) => {
    if (e.which === 13) {
      // this.props.addChore(this.state.inputField);
      // e.target.value = '';
      // this.state.inputField = '';
      this.buttonSubmit();
      return true;
    } else {
      this.state.inputField = e.target.value;
      return false;
    }
  };

  handleRequestClose = () => {
    this.setState({
      snackOpen: false,
    });
  };

  buttonSubmit () {
    if (this.state.inputField === '') {
      this.setState({snackMessage: 'Cannot leave field blank'});
      this.setState({snackOpen: true});
      return;
    }
    const today = new Date();
    const year = today.getUTCFullYear().toString();
    let month = today.getUTCMonth() + 1;
    let day = today.getUTCDate();
    if (month < 10) {
      month = `0${month}`;
    } else {
      month = month.toString();
    }
    if (day < 10) {
      day = `0${day}`;
    } else {
      day = day.toString();
    }
    const date = `${year}-${month}-${day}`;
    let chore = {
        "house_in_chore": 1,
        "chore_name": this.state.inputField,
        "chore_due": date,
        "chore_group": 1,
        "chore_parent": null,
        "chore_is_done": 0,
    }
    this.props.addChore(chore);
    this.setState({inputField: ''});
    this.setState({snackMessage: 'Chore Saved!'});
    this.setState({snackOpen: true});
  };

  render() {
    const complete = this.props.chores.complete;
    const incomplete = this.props.chores.incomplete;


    if (this.state.nextClicked === false) {
      return (
        <div>
          <ChoresDashboardContainer />
          <AdminChores
            chores={this.props.chores}
          />
          {this.props.admin &&
            <div>
              <AddChore
                handleKeyUp={this.handleKeyUp}
                buttonSubmit={this.buttonSubmit}
              />
              <GroupChores
                chores={this.props.chores}
                increaseGroups={this.props.increaseGroups}
                decreaseGroups={this.props.decreaseGroups}
                roomies={this.props.house.users}
              />
              <RaisedButton
                label="Next"
                primary
                onTouchTap={() => { this.setState({nextClicked: true }) }}
              />
            </div>
          }
          <Snackbar
            open={this.state.snackOpen}
            message={this.state.snackMessage}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
            contentStyle={{ textAlign: 'center' }}
          />
        </div>
      );
    } else {
      return (
        <div>
          <GroupingOfChores
            chores={this.props.chores}
            assignGroup={this.props.assignGroup}
            roomies={this.props.house.users}
            rotateGroups={this.props.rotateGroups}
          />
        </div>
      )
    }
  }
}

const mapStateToProps = ({ choresReducer, houseReducer, userReducer }) => ({
  chores: choresReducer,
  house: houseReducer,
  admin: userReducer.user_is_admin === 1,
});

export default connect(
  mapStateToProps,
  {
    addChore,
    increaseGroups,
    decreaseGroups,
    assignGroup,
    rotateGroups,
  }
)(Chores);
