import scale from '../../scale'
import React from 'react'
import { css } from '@emotion/core'

export default React.memo(() => (
  <>
    <h2>Latest releases</h2>
    <Release
      title="Dusk To Dawn Part I-III"
      artist="Mr. Tophat"
      label=""
      date=""
    />
    <Release title="Studio Barnhus Volym 1" artist="Various" label="" date="" />
    <Release title="Once Upon A Passion" artist="Bella Boo" label="" date="" />
    <Release
      title="Mount Liberation Unlimited"
      artist="Mount Liberation Unlimited"
      label=""
      date=""
    />
    <Release
      title="Stockholm Marathon"
      artist="Kornél Kovács"
      label=""
      date=""
    />
    <Release
      title="Steal Chickens From Men And The Future From God"
      artist="Shakarchi & Stranéus"
      label=""
      date=""
    />
    <Release title="Reveries Of" artist="Art Alfie" label="" date="" />
    <Release title="The Bells" artist="Kornél Kovács" label="" date="" />
    <Release title="Total" artist="Baba Stiltz" label="" date="" />
    <Release title="Family Vacation" artist="Axel Boman" label="" date="" />
    <Release title="Kuwa Huru" artist="Usio" label="" date="" />
  </>
))

const Release = React.memo(({ artist, title, label, date }) => (
  <div
    css={css`
      align-items: center;
      display: flex;
      padding: 0.75em 0;
      position: relative;
      ${scale(1.25, 'font-size')}

      &:not(:last-child) {
        border-bottom: 2px solid rgb(220, 220, 220);
      }

      &:last-child {
        padding-bottom: 0;
      }

      div {
        flex-grow: 0;
        flex-shrink: 0;
      }
    `}
  >
    <div
      css={css`
        display: none;
        padding-right: 1.5em;
        width: 11.25%;

        @media (min-width: 481px) {
          display: block;
        }
      `}
    >
      <img
        css={css`
          border-radius: 0.25em;
          width: 100%;
          display: block;
        `}
        alt={title}
        src="https://img.discogs.com/Esg0J3Z44KXXdIWR4kNx1yTWz9I=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-14376251-1573290978-3847.jpeg.jpg"
      />
    </div>
    <div
      css={css`
        font-weight: 700;
        padding-right: 1.5em;
        width: 55%;

        @media (min-width: 481px) {
          width: 50%;
        }
      `}
    >
      {title}
    </div>
    <div
      css={css`
        width: 45%;

        @media (min-width: 481px) {
          width: 38.875%;
        }
      `}
    >
      {artist}
    </div>
  </div>
))