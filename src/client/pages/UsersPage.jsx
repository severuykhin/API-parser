import React, { Component } from 'react'
import { connect } from 'react-redux'
import HelmetMeta from '../components/HelmetMeta/HelmetMeta.jsx'

class UsersList extends Component {
  renderUser = user => {
    return <li key={ user.id }>{ user.name }</li>
  }

  componentDidMount() {
    console.log('Some async action')
  }

  render() {
    const { users } = this.props
    const meta = {
      title : 'User list page'
    };


    return (
      <div>
        { /* Render seo meta info */ }
        <HelmetMeta meta={ meta } />

        <h2>List of users</h2>
        { users && <ul> { users.map(this.renderUser) } </ul> }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList)
