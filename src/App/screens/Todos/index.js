import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { getEntities, getFilter } from 'App/stores/resources'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import TodoFilter from './components/TodoFilter'

const Todos = ({ todos, addTodo, toggleTodo, filter, setFilter }) => {
  return (
    <section className='pa3 pa5-ns'>
      <AddTodo onSubmit={({todo}, _, {reset}) => {
        addTodo(todo)
        reset()
      }} />

      <h1 className='f4 bold center mw6'>All Todos</h1>

      <TodoList {...{ todos, toggleTodo, filter }} />
      <TodoFilter {...{ filter, setFilter }} />
    </section>
  )
}

Todos.propTypes = {
  todos: PropTypes.array,
  filter: PropTypes.string
}

export default connect(
  state => ({
    todos: getEntities('todos')(state),
    filter: getFilter('todos')(state)
  }),
  dispatch => ({
    addTodo: (text) => dispatch(actions.submitEntity({ text }, {type: 'todos'})),
    toggleTodo: (todo, completed) => dispatch(actions.updateEntity({ ...todo, completed }, {type: 'todos'})),
    setFilter: (filter) => dispatch(actions.setFilter({ filter }, {type: 'todos'}))
  })
)(Todos)
