import React from 'react'
import HelmetMeta from '../components/HelmetMeta/HelmetMeta.jsx'
import bigCities from '../../data/cities-1.json'
import smallCities from '../../data/cities-2.json'


class Home extends React.Component {

  constructor(params) {
    super(params);
    this.ws = null;

    this.requestInput = React.createRef();

    this.state = {
      status: 'Сокет оффлайн',
      cities: {
        0: {
          type: 'Большие (от 150 т.)',
          data: bigCities
        },
        1: {
          type: 'Маленькие (от 50 до 150 т.)',
          data: smallCities
        }
      },
      activeCities: null
    };
  }

  componentDidMount() {
    if (BROWSER) {
      this.ws = new WebSocket('ws://localhost:8080');

      this.ws.onopen = () => {
        this.setState({ status: 'Сокет онлайн' });
      };

    }
  }

  renderOptions() {
    return Object.keys(this.state.cities).map((element, index) => {
      let elem = this.state.cities[index];
      return <option key={ index } value={ index }>{ elem.type }</option>
    })
  }

  handleSelectChange = (e) => {
    let valueId = e.target.value;

    if (valueId === '') {
      this.setState({ activeCities: null });
      return false;
    }

    let activeCities = this.state.cities[valueId].data.cities;

    activeCities.forEach(element => {
      element.parsed = false;
      element.progress = false;
    });

    this.setState({ activeCities });

    return true;
  }

  renderInput() {
    return <input ref={ this.requestInput } type='text' placeholder='Введите запрос' />
  }

  renderActiveCitiesList() {
    return (
      <ul>
        { this.state.activeCities.map((item, index) => <li key={ index }> { item.name } </li>) }
      </ul> 
    )
  }

  startParsing = () => {
    let phrase = this.requestInput.current.value;
    this.ws.send(phrase);
  }

  render() {

    const meta = {
      title : 'Парсер яндекс организации'
    };
    
    return (

      <div>
        { this.state.status }
        <HelmetMeta meta={ meta } />
        <hr/>
        <select onChange={ this.handleSelectChange } name='cities-type' id='cities-type'>
          <option value=''>Выберите города для парсинга</option>
          { this.renderOptions() }
        </select>
        { this.state.activeCities && this.renderInput() }
        <button onClick={ this.startParsing }>Поехали</button>
        { this.state.activeCities && this.renderActiveCitiesList() }
      </div>
    )
  }
}

export default Home;
