import React, { Component } from 'react';
import HomePage from '../pages/HomePage.jsx';
import { connect } from 'react-redux';
import {
  addCities,
  removeCities,
  putStartParsing,
  putPauseParsing,
  putStopParsing,
  moduleName as citiesModule,
  putFilename,
  putQuery
} from '../redux/actions/cities';

class HomePageContainer extends Component {
  render() {
    return (
      <HomePage
        putStartParsing={this.props.putStartParsing}
        putPauseParsing={this.props.putPauseParsing}
        putStopParsing={this.props.putStopParsing}
        addCities={this.props.addCities}
        removeCities={this.props.removeCities}
        selectedCities={this.props.selectedCities}
        cities={this.props.cities}
        query={this.props.query}
        fileName={this.props.fileName}
        putQuery={this.props.putQuery}
        putFilename={this.props.putFilename}
        isActive={this.props.isActive}
        activeCity={this.props.activeCity}
        />
    )
  }
}

const mapStateToProps = state => {
  return {
    cities: [...state[citiesModule].sourceCities],
    selectedCities: [...state[citiesModule].selectedCities],
    query: state[citiesModule].query,
    fileName: state[citiesModule].fileName,
    isActive: state[citiesModule].active,
    activeCity: state[citiesModule].activeCity
  };
}

const mapDispatchToProps = dispatch => ({
  addCities:       (data) => dispatch(addCities(data)),
  removeCities:    (data) => dispatch(removeCities(data)),
  putStartParsing: ()     => dispatch(putStartParsing()),
  putPauseParsing: ()     => dispatch(putPauseParsing()),
  putStopParsing:  ()     => dispatch(putStopParsing()),
  putQuery:        (data) => dispatch(putQuery(data)),
  putFilename:     (data) => dispatch(putFilename(data))          
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageContainer)
