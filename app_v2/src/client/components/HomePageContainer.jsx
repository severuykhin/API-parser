import React, { Component } from 'react'
import HomePage from '../pages/HomePage.jsx'
import bigCities from '../../data/cities-1.json'
import smallCities from '../../data/cities-2.json'
import testCities from '../../data/cities-3.json'

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
          type: 'Тестовая выборка',
          data: testCities,
        },
      },
      activeCities: null,
      activeCityIndex: null,
      phrase: null,
      fileDescriptor: null 
    }
  }

  handleSelectChange(valueId) {
    if (valueId === '') {
      this.setState({ activeCities: null })
      return false
    }

    let activeCities = this.state.cities[valueId].data.cities

    activeCities.forEach(element => {
      element.parsed = false
      element.progress = false
    })

    this.setState({ activeCities })

    return true
  }

  startParsing = phrase => {
    if (this.state.busy) return false

    this.ws = new WebSocket('ws://localhost:8080')

    this.ws.onopen = () => {
      this.setState({
        status: 'Сокет онлайн',
        activeCityIndex: 0,
        phrase,
        busy: true,
        fileDescriptor: Date.now()
      })
      this.runLoop()
    }

    return true
  }

  runLoop() {
    let activeCityIndex = 0

    let data = JSON.stringify({
      phrase: this.state.phrase,
      activeCity: this.state.activeCities[activeCityIndex],
      fileDescriptor: this.state.fileDescriptor
    })

    this.ws.send(data)

    this.ws.onmessage = response => {

      activeCityIndex += 1

      if (activeCityIndex >= this.state.activeCities.length) {
        this.ws.close()
        return false
      }

      let dataLoop = JSON.stringify({
        phrase: this.state.phrase,
        activeCity: this.state.activeCities[activeCityIndex],
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

  render() {
    return (
      <HomePage
        activeCities={this.state.activeCities}
        status={this.state.status}
        cities={this.state.cities}
        activeCityIndex={this.state.activeCityIndex}
        startParsing={this.startParsing.bind(this)}
        handleSelectChange={this.handleSelectChange.bind(this)}
      />
    )
  }
}
