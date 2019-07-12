import React, { Component } from 'react'
import HomePage from '../pages/HomePage.jsx'
import bigCities from '../../data/cities-1.json'
import smallCities from '../../data/cities-2.json'
import testCities from '../../data/cities-3.json'
import moscow from '../../data/cities-4.json'

const allCities = [ ...bigCities.cities ];

smallCities.cities.forEach( city => {
  let inAllCities = allCities.filter( item => city.name === item.name);
  if (inAllCities.length <= 0) allCities.push(city);
});

allCities.sort((a, b) => {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
});

console.log(allCities);

export default class HomePageContainer extends Component {
  constructor(params) {
    super(params)
    this.ws = null

    this.state = {
      status: 'Сокет оффлайн',
      busy: false,
      cities: {
        0: {
          type: 'Большие (от 150 т.)',
          data: bigCities,
        },
        1: {
          type: 'Маленькие (от 50 до 150 т.)',
          data: smallCities,
        },
        2: {
          type: `Все города России от 50тыс. (${allCities.length})`,
          data: { cities: allCities }
        },
        3: {
          type: 'Тестовая выборка',
          data: testCities,
        },
        4: {
          type: 'Москва',
          data: moscow,
        }
      },
      activeCities: null,
      activeCityIndex: null,
      phrase: null,
      fileDescriptor: null,
      enablePartition: false
    }
  }

  handleSelectChange(valueId) {
    if (valueId === '') {
      this.setState({ activeCities: null })
      return false
    }

    let activeCities = this.state.cities[valueId].data.cities

    activeCities.forEach(element => {
      element.parsed = false;
      element.progress = false;
      element.count = 0;
    })

    this.setState({ activeCities })

    return true
  }

  handlePartitionCheckboxChange = () => {
    // TO DO
  }

  startParsing = (phrase, enablePartition = false) => {
    if (this.state.busy) return false

    this.ws = new WebSocket('ws://localhost:8080')

    this.ws.onopen = () => {
      this.setState({
        status: 'Сокет онлайн',
        activeCityIndex: 0,
        phrase,
        enablePartition,
        busy: true,
        fileDescriptor: Date.now()
      });
      this.runLoop()
    }

    return true
  }

  runLoop() {
    let activeCityIndex = 0

    let data = JSON.stringify({
      phrase: this.state.phrase,
      enablePartition: this.state.enablePartition,
      activeCity: this.state.activeCities[activeCityIndex],
      cityIndex: activeCityIndex,
      fileDescriptor: this.state.fileDescriptor
    })

    this.ws.send(data)

    this.ws.onmessage = response => {

      let message = JSON.parse(response.data);

      console.log(message);

      if (message.type === 'result-notify') {
        this.updateCityResults(message.data);
        return false;
      }

      activeCityIndex += 1

      if (activeCityIndex >= this.state.activeCities.length) {
        this.ws.close()
        return false
      }

      let dataLoop = JSON.stringify({
        phrase: this.state.phrase,
        enablePartition: this.state.enablePartition,
        activeCity: this.state.activeCities[activeCityIndex],
        cityIndex: activeCityIndex,
        fileDescriptor: this.state.fileDescriptor
      })

      this.setState({ activeCityIndex })
      this.ws.send(dataLoop)

      return true
    }

    this.ws.onclose = () => {
      this.setState({
        status: 'Сокет оффлайн',
        busy: false,
        activeCityIndex: null
      })
    }
  }

  updateCityResults(data) {
    let { activeCities }  = this.state;
    activeCities[data.cityId].count = data.count;
    this.setState({ activeCities })
  }

  render() {
    return (
      <HomePage
        activeCities={ this.state.activeCities }
        status={ this.state.status }
        cities={ this.state.cities }
        activeCityIndex={ this.state.activeCityIndex }
        startParsing={ this.startParsing.bind(this) }
        handleSelectChange={ this.handleSelectChange.bind(this) }
      />
    )
  }
}
