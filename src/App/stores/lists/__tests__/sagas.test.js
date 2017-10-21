import { normalize } from 'normalizr'
import { put, fork, call, take } from 'redux-saga/effects'

import api from '../../../../config/api'
import t from '../../../../App/stores/resources/actions/constants'
import { receiveListResponse, addList, setFilter } from '../sagas'

const type = 'lists'
const list = {id: 1, filter: 'all'}
const defaultResponse = (ok = true) => ({
  ok,
  data: { list }
})

const getAction = (actionType, payload = { ...list }) => ({
  type: actionType,
  meta: { type },
  payload
})

describe('receiveListResponse saga', () => {
  it(`should dispatch ${t.SET_ENTITY} with type lists`, () => {
    const response = defaultResponse()
    const gen = receiveListResponse(response)
    const actual = gen.next().value
    const expected = put(getAction(t.SET_ENTITY, {
      entities: {
        [type]: {
          [response.data.list.id]: response.data.list
        }
      },
      result: 1
    }))

    expect(actual).toEqual(expected)
  })

  it(`should dispatch ${t.REQUEST_FAILURE} for bad response`, () => {
    const response = defaultResponse(false)
    const gen = receiveListResponse(response)
    const actual = gen.next().value
    const expected = put({
      type: t.REQUEST_FAILURE,
      meta: { type }
    })

    expect(actual).toEqual(expected)
  })
})

describe('addList saga', () => {
  const gen = addList()

  it(`should listen for ${t.SUBMIT_ENTITY} with type lists`, () => {
    const actual = gen.next().value
    const expected = take(t.SUBMIT_ENTITY)

    expect(actual).toEqual(expected)
  })

  it(`should call api`, () => {
    const action = getAction(t.SUBMIT_ENTITY)
    const actual = gen.next(action).value
    const expected = call(api.post, '/lists', list)

    expect(actual).toEqual(expected)
  })

  it(`should fork receiveListResponse`, () => {
    const response = defaultResponse()
    const actual = gen.next(response).value
    const expected = fork(receiveListResponse, response)

    expect(actual).toEqual(expected)
  })
})

describe('setFilter saga', () => {
  const gen = setFilter()

  it(`should listen for ${t.UPDATE_ENTITY} with type lists`, () => {
    const actual = gen.next().value
    const expected = take(t.UPDATE_ENTITY)

    expect(actual).toEqual(expected)
  })

  it(`should call api`, () => {
    const action = getAction(t.UPDATE_ENTITY)
    const actual = gen.next(action).value
    const expected = call(api.put, `/lists/${list.id}`, {...list})

    expect(actual).toEqual(expected)
  })

  it(`should fork receiveListResponse`, () => {
    const response = defaultResponse()
    const actual = gen.next(response).value
    const expected = fork(receiveListResponse, response)

    expect(actual).toEqual(expected)
  })
})
