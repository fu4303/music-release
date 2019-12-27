import React, { useState, useEffect, useContext } from 'react'
import scale from '../../scale'
import { css } from '@emotion/core'
import get from '../get'
import Loading from './loading'
import Results from './results'
import State from '../context/state'

let value = ''
let delayed

export default React.memo(() => {
  const [results, setResults] = useState([])
  const [done, setDone] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState()
  const { labels } = useContext(State)

  useEffect(() => {
    document.addEventListener('click', e => {
      if (!document.getElementById('add').contains(e.target)) {
        clear()
      }
    })
  }, [])

  const clear = () => {
    document.getElementById('search').value = ''
    setDone(false)
  }

  const search = async () => {
    let data

    try {
      data = await get(
        `/.netlify/functions/searchLabels?search=${value}`,
        value
      )
    } catch (e) {
      setLoading(false)
      setDone(true)
      setError(true)
      return
    }

    if (data.token === value) {
      setResults(
        data.response.results.filter(result => {
          return !labels.map(label => label.id).includes(result.id)
        })
      )
      setLoading(false)
      setDone(true)
    }
  }

  const onChange = () => {
    setDone(false)
    setError(false)

    if (value.length > 2) {
      setLoading(true)
    }

    if (delayed) {
      clearTimeout(delayed)
      delayed = null
    }

    delayed = setTimeout(() => {
      if (value.length > 2) {
        search()
      } else {
        setLoading(false)
      }
    }, 250)
  }

  return (
    <>
      <h2>Add label</h2>
      <div
        id="add"
        css={css`
          position: relative;
        `}
      >
        <div
          css={css`
            ${scale(1.25, 'font-size')}
          `}
        >
          <input
            autoComplete="off"
            spellCheck="false"
            id="search"
            css={css`
              background: rgb(250, 250, 250);
              border: 2px solid rgb(220, 220, 220);
              border-radius: 0.25em;
              font-size: inherit;
              width: 100%;
              font-family: inherit;
              padding: 1em 3.75em 1em 1em;
              -webkit-appearance: none;

              &:focus {
                border-color: rgb(200, 200, 200);
                outline: none;
              }
            `}
            type="text"
            onChange={e => {
              value = e.target.value
              onChange()
            }}
          />
          <Loading show={loading} />
        </div>
        <Results data={results} done={done} clear={clear} error={error} />
      </div>
      {!labels.length && (
        <p
          css={css`
            margin-top: 1.5em;
            ${scale(1.25, 'font-size')}
          `}
        >
          Once you've added some labels, we'll show them here.
        </p>
      )}
    </>
  )
})
