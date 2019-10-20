import React, { Component } from 'react'

class Errors extends Component {
  render() {
    const { errors } = this.props;
    return (
      <div className='Errors'>
        <ul>
            { errors.map((error, index) => {
               return <li key={index}>{ error.data.text }</li> 
            }) }
        </ul>          
      </div>
    )
  }
}

export default Errors;
