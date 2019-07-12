import React from 'react'
import HelmetMeta from '../components/HelmetMeta/HelmetMeta.jsx'


class Home extends React.Component {

  constructor(props) {
    super(props);

    this.requestInput = React.createRef()
    this.enablePartitionCheckbox = React.createRef();

  }

  renderOptions() {
    if (!this.props.cities) return null;
    return Object.keys(this.props.cities).map((element, index) => {
      let elem = this.props.cities[index];
      return <option key={ index } value={ index }>{ elem.type }</option>
    })
  }

  handleSelectChange = (e) => {
    let valueId = e.target.value;
    this.props.handleSelectChange(valueId);
  }

  renderInput() {
    return <input ref={ this.requestInput } type='text' placeholder='Введите запрос' />
  }

  startParsing = () => {
    let phrase = this.requestInput.current.value,
        enablePartition = this.enablePartitionCheckbox.current.checked;

    this.props.startParsing(phrase, enablePartition);
  }

  renderActiveCitiesList() {
    return (
      <ul>
        { this.props.activeCities.map((item, index) => {

          let count = (item.count && item.count > 0) ? `(${item.count})` : '';

          return <li key={ index }> { item.name } { count }  { this.props.activeCityIndex === index ? '...' : '' } </li>
        }) }
      </ul> 
    )
  }

  renderEnablePartitionCheckbox() {
    return (
      <label>
        <input ref={this.enablePartitionCheckbox} type="checkbox"/>
        Разбить таблицу по городам
      </label>
    )
  }

  render() {

    const meta = {
      title : 'Парсер яндекс организации'
    };
    
    return (

      <div>
        { this.props.status }
        <HelmetMeta meta={ meta } />
        <hr/>
        <select onChange={ this.handleSelectChange } name='cities-type' id='cities-type'>
          <option value=''>Выберите города для парсинга</option>
          { this.renderOptions() }
        </select>
        { this.props.activeCities && this.renderInput() }
        { this.props.activeCities && this.renderEnablePartitionCheckbox() }
        <button onClick={ this.startParsing }>Поехали</button>
        { this.props.activeCities && this.renderActiveCitiesList() }
      </div>
    )
  }
}

export default Home;
