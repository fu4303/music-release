import React, { useContext } from 'react'
import scale from '../../scale'
import { css } from '@emotion/core'
import Release from './release'
import Notice from './notice'
import State from '../context/state'

export default React.memo(() => {
  const { labels, updating, error } = useContext(State)

  const none = !labels.length
  const nonEmpty = labels.filter(label => !!label.release)
  const onlyEmpty = !nonEmpty.length

  return (
    <>
      <h2>
        {updating
          ? `Checking ${updating}…`
          : 'Latest releases'}
      </h2>
      {!onlyEmpty && (
        <>
          <div>
            {nonEmpty
              .sort((f, s) => (f.title > s.title ? 1 : -1))
              .map(label => (
                <Release key={label.id} data={label} />
              ))}
          </div>
        </>
      )}
      {error && (
        <Notice>
          {
            "Something went wrong wile checking for a new release. We'll keep trying."
          }
        </Notice>
      )}
      {!error && !updating && (none || onlyEmpty) && (
        <p
          css={css`
            ${scale(1.25, 'font-size')}
          `}
        >
          {none
            ? "Nothing to show yet 💁‍♂️. Add some labels and we'll check their latest release."
            : "Nothing to show from this year so far 🤔. We'll keep checking for new releases."}
        </p>
      )}
    </>
  )
})
