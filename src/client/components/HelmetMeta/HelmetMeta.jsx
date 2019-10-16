import React from 'react'
import Helmet from 'react-helmet'

export default props => {

  const { meta } = props;

  return (
    <Helmet>
      <title>{ `${meta.title}` }</title>
    </Helmet>
  )
}
