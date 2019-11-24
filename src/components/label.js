import scale from '../../scale'
import React from 'react'
import { css } from '@emotion/core'

export default ({ name }) => (
  <div
    css={css`
      color: white;
      font-weight: 700;
      margin: 0 0.75em 0.75em 0;
      position: relative;
      ${scale(1, 'font-size')}

      &:hover .remove {
        opacity: 1;
        transform: scale(1);
        pointer-events: auto;
      }
    `}
  >
    <div
      css={css`
        background: rgb(160, 160, 160);
        border-radius: 9em;
        user-select: none;
        text-align: center;
        padding: 0.5em 1em;
      `}
    >
      {name}
    </div>
    <div
      className="remove"
      css={css`
        background: rgb(255, 40, 80);
        display: flex;
        align-items: center;
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
      ✕
    </div>
  </div>
)
