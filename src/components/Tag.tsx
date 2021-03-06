import React, { useContext } from 'react'
import { post } from '../http'
import { css } from '@emotion/core'
import State from '../context/State'
import type { Label } from '../types'

export default ({ data }: { data: Label }) => {
  const { setLabels, user, setError } = useContext(State)

  const remove = async () => {
    setLabels((prev) => prev.filter((label) => label.id !== data.id))

    if (!user) {
      return
    }

    try {
      await post('/.netlify/functions/removeUserFromLabel', {
        data: { label: data.id },
      })
    } catch (e) {
      setError(
        'Something went wrong while saving data to your account. You can try again later.'
      )
    }
  }

  return (
    <div
      css={css`
        font-weight: 700;
        margin: 0 0.75em 0.75em 0;
        position: relative;
        user-select: none;

        &:hover .remove {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }
      `}
    >
      <a
        href={`https://www.discogs.com${data.link}?layout=sm&limit=500`}
        target="_blank"
        rel="noreferrer noopener nofollow"
        css={css`
          background: rgb(160, 160, 160);
          will-change: background-color;
          display: block;
          border-radius: 9em;
          text-decoration: none;
          color: white;
          transition: background-color 0.2s ease-out;
          text-align: center;
          padding: 0.5em 1em;

          &:hover {
            background: rgb(120, 120, 120);
          }
        `}
      >
        {decodeURIComponent(data.name)}
      </a>
      <div
        role="button"
        tabIndex={0}
        onKeyUp={(e) => (e.key === 'Enter' || e.keyCode === 13) && remove()}
        onClick={remove}
        className="remove"
        css={css`
          background: rgb(255, 40, 80);
          display: flex;
          align-items: center;
          color: white;
          justify-content: center;
          transform: scale(0.5) translate(-1em, 1em);
          transition: transform 0.2s ease-out;
          width: 2em;
          height: 2em;
          pointer-events: none;
          opacity: 0;
          border-radius: 50%;
          position: absolute;
          cursor: pointer;
          top: -0.75em;
          right: -0.75em;
          z-index: 1;
        `}
      >
        ???
      </div>
    </div>
  )
}
