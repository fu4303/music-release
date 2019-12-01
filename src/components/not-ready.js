import React from 'react'
import { css } from '@emotion/core'

export default React.memo(() => (
  <div
    css={css`
      text-align: center;
      width: 100%;
    `}
  >
    <h2
      css={css`
        margin: 0;
      `}
    >
      Retrieving saved data…
    </h2>
  </div>
))
