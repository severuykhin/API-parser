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
    const {
      cities, 
      addCities, 
      removeCities, 
      selectedCities,
      putPauseParsing,
      putStartParsing,
      query,
      fileName,
      putQuery,
      putFilename,
      isActive,
      activeCity
    } = this.props;

    return (
      <HomePage
        putStartParsing={putStartParsing}
        putPauseParsing={putPauseParsing}
        addCities={addCities}
        removeCities={removeCities}
        selectedCities={selectedCities}
        cities={cities}
        query={query}
        fileName={fileName}
        putQuery={putQuery}
        putFilename={putFilename}
        isActive={isActive}
        activeCity={activeCity}
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
