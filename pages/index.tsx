import Head from 'next/head'
import Character from '../components/character'
import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'
import theme from '../utils/theme';

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridGap: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, auto)',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(3, auto)',
    },
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
      <Typography variant="h1">
          Star Wars Characters
        </Typography>
        <br />
        <div className={classes.grid}>
          <Character></Character>
          <Character></Character>
          <Character></Character>
          <Character></Character>
          <Character></Character>
          <Character></Character>
          <Character></Character>
          <Character></Character>
          <Character></Character>
        </div>
      </Container>
    </div>
  )
}
