import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import CompleteChore from '../components/completeChore.jsx';
import IncompleteChore from '../components/incompleteChore.jsx';
import AddChore from '../components/addChore.jsx';
import { addChore, completeChore, undoComplete } from '../actions';

class Chores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: '',
    }
  }

  handleKeyUp = (e) => {
    if (e.which === 13) {
      this.props.addChore(this.state.inputField);
      e.target.value = '';
      this.state.inputField = '';
    } else {
      this.state.inputField = e.target.value;
    }
  }

  buttonSubmit = () => {
    this.props.addChore(this.state.inputField);
    this.state.inputField = '';
    console.log(AddChore.inputField);
  }

  completeChore = choreId => {
    this.props.completeChore(choreId);
  }

  undoComplete = choreId => {
    this.props.undoComplete(choreId);
  }

  render() {
    const complete = this.props.chores.complete;
    const incomplete = this.props.chores.incomplete;

    return (
      <div>
        <CompleteChore
          chores={this.props.chores}
          completeChore={this.completeChore}
        />
        <IncompleteChore
          chores={this.props.chores}
          undoComplete={this.undoComplete}
        />
        <AddChore
          handleKeyUp={this.handleKeyUp}
          buttonSubmit={this.buttonSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ choresReducer }) => ({
  chores: choresReducer
})

export default connect(
  mapStateToProps,
  {
    addChore,
    completeChore,
    undoComplete,
  }
)(Chores);