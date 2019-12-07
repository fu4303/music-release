import React from 'react'
import { css } from '@emotion/core'
import scale from '../../scale'
import Label from './label'
import { useContext } from 'react'
import State from '../context/state'

export default React.memo(() => {
  const { labels } = useContext(State)

  return (
    !!labels.length && (
      <div
        css={css`
          ${scale(4, 'margin-top')}
        `}
      >
        <h3>Saved labels</h3>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            margin-bottom: -0.75em;
            ${scale(1, 'font-size')}
          `}
        >
          {labels
            .sort((f, s) => (f.name > s.name ? 1 : -1))
            .map(label => (
              <Label name={label.name} key={label.id} id={label.id} />
            ))}
        </div>
      </div>
    )
  )
})
