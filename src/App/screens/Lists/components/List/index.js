import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import classNames from 'classnames'

const List = ({ id, name, isLast }) => {
  const todoClass = classNames(
    'bg-animate hover-bg-light-gray',
    {
      'bb b--light-silver': !isLast
    }
  )

  return (
    <li className={todoClass}>
      <Link className='db black ph3 pv3 no-underline' to={`/list/${id}`}>
        {name}
      </Link>
    </li>
  )
}

List.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isLast: PropTypes.bool
}

export default List
