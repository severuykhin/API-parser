import React, { Component } from 'react';
import Errors from '../components/Errors/Erros.jsx';
import { connect } from 'react-redux';
import {
    moduleName as errorsModule
} from '../redux/actions/errors';

class ErrorsContainer extends Component {
  render() {
    return (
      <Errors
        errors={this.props.errors} />
    )
  }
}

const mapStateToProps = state => {
  return {
    errors: [...state[errorsModule].errors],
  };
}

const mapDispatchToProps = dispatch => ({
          
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorsContainer)
