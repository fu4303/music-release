import React, { useContext, useEffect } from 'react'
import { css } from '@emotion/core'
import Notice from './notice'
import State from '../context/state'
import auth from '../../auth'

export default React.memo(() => {
  const { user, labels, releases } = useContext(State)

  useEffect(() => {
    if (!user) {
      return
    }

    user.update({
      data: { labels, releases }
    })
  }, [labels, releases]) // eslint-disable-line react-hooks/exhaustive-deps

  if (user === null) {
    return
  }

  return user ? (
    <>
      <Notice>You are logged in as {user.user_metadata.full_name}.</Notice>
      <Button href="">Log me out</Button>
    </>
  ) : (
    <>
      <Notice>You can log in to save or restore your added labels.</Notice>
      <Button href={auth.loginExternalUrl('google')}>Log in with Google</Button>
    </>
  )
})

const Button = ({ children, href }) => (
  <a
    href={href}
    rel="nofollow"
    css={css`
      border-radius: 9em;
      box-shadow: 0 0.125em 0.5em rgba(0, 0, 0, 0.25);
      cursor: pointer;
      display: inline-flex;
      font-weight: 700;
      text-decoration: none;
      margin-top: 1em;
      padding: 0.75em 1.25em;
      transition: box-shadow 0.2s ease-out, transform 0.2s ease-out;

      &:hover {
        box-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.25);
        transform: translateY(-0.125em);
      }
    `}
  >
    {children}
  </a>
)
