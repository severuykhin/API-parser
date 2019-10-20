import React from 'react';
import HelmetMeta from '../components/HelmetMeta/HelmetMeta.jsx';
import ErrorsContainer from '../containers/ErrorsContainer.jsx';

class Home extends React.Component {

  handleQueryChange = (e) => {
    const { putQuery } = this.props;
    putQuery && putQuery(e.target.value);
  }

  handleFileNameChange = (e) => {
    const { putFilename } = this.props;
    putFilename && putFilename(e.target.value);
  }

  handleSingleleCityChange = (e, city) => {
    const {addCities, removeCities} = this.props; 

    if (e.target.checked) {
      addCities && addCities([city]);
    } else {
      removeCities && removeCities([city]);
    }
  }

  handleCheckAllChange = (e) => {
    const {addCities, removeCities, cities} = this.props;
    if (e.target.checked) {
      addCities && addCities(cities);
    } else {
      removeCities && removeCities(cities);
    }
  }

  handleStartParsing = () => {
    const { putStartParsing, query, fileName } = this.props;
    if (!query.trim() || !fileName.trim()) {
      return false;
    } 
    putStartParsing && putStartParsing();
  }

  handlePauseParsing = () => {
    const { putPauseParsing } = this.props;
    putPauseParsing && putPauseParsing();
  }

  handleStopParsing = () => {
    const { putStopParsing } = this.props;
    putStopParsing && putStopParsing();
  }

  render() {

    const meta = {
      title : 'Парсер яндекс организации'
    };
    
    return (

      <div>
        <HelmetMeta meta={ meta } />
        <hr/>
        { this.renderControls() }
        { this.renderErrors() }
        <hr />
        { this.renderCheckAll() }
        <hr/>
        { this.renderCities() }
      </div>
    )
  }

  renderControls() {

    let { query, fileName } = this.props;

    return (<div>
      <p>Введите запрос: <input value={query} onChange={this.handleQueryChange}/></p>
      <p>Название файла: <input value={fileName} onChange={this.handleFileNameChange}/></p>
    </div>);
  }

  renderErrors() {
    return <ErrorsContainer />;
  }

  renderCheckAll() {
    const { 
      selectedCities, 
      query, 
      fileName,
      isActive 
    } = this.props; 

    return <div>
        <label>
          <input  
            onChange={this.handleCheckAllChange}
            type="checkbox"/> Выбрать все
        </label>
        { 
          selectedCities.length > 0 && query.trim() && fileName.trim()
          ? <button 
              onClick={() => { isActive ? this.handlePauseParsing() : this.handleStartParsing()}}>
              {isActive ? 'Остановить' : 'Начать'}
            </button> 
          : null 
        }
        {
          isActive 
          ? <button onClick={this.handleStopParsing} >Отменить</button>
          : null
        }
      </div>
  }

  renderCities() {
    const { cities, selectedCities, activeCity } = this.props;

    const selectedCitiesIds = selectedCities.map(city => city.id);

    return cities.map( city => {

      let checked = selectedCitiesIds.indexOf(city.id) !== -1;
      let isActive = activeCity && activeCity.id === city.id;
      let selectedCityCopy = selectedCities.filter(item => item.id === city.id)[0];

      return <div key={city.id}>
        <label>
          <input 
            id={city.id} 
            checked={checked}
            disabled={isActive}
            onChange={(e) => { this.handleSingleleCityChange(e, city)}}
            type="checkbox"/> 
            { city.name }
            { selectedCityCopy && selectedCityCopy.count >= 0 ? `(${ selectedCityCopy.count })` : null }
            { isActive ? '...' : null }
        </label>
      </div>
    });
  }
}

export default Home;
