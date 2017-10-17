import React, { PropTypes } from 'react'

import classNames from 'classnames'

const TodoFilter = ({ filter, setFilter }) => {
  const todoFilters = ['all', 'completed', 'active']

  return (
    <div className="flex items-center justify-center pa2">
      {todoFilters.map(f => <button key={f}
          className={classNames(
            "f6 ttc br2 bg-animate hover-bg-mid-gray hover-white inline-flex items-center pa2 ba border-box mr2",
            {"bg-black-70 white": f === filter},
            {"bg-white-70 black pointer": f !== filter}
          )}
          children={f}
          onClick={() => setFilter(f)}
        />)}
    </div>
  )
}

TodoFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired
}

export default TodoFilter
