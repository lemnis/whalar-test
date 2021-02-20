import Head from "next/head";
import Character from "../components/character";
import React from "react";
import { Box, Button, Container, makeStyles, Typography } from "@material-ui/core";
import theme from "../utils/theme";
import PagedResults from "swapi-typescript/dist/models/PagedResults";
import People from "swapi-typescript/dist/models/People";
import { httpToHttps } from "../utils/url";

const useStyles = makeStyles({
  title: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
  grid: {
    // Show 1 grid item.
    display: "grid",
    gridGap: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      // Show 2 grid item on small screens and up.
      gridTemplateColumns: "repeat(2, auto)",
    },
    [theme.breakpoints.up("lg")]: {
      // Show 3 grid item on large screens and up.
      gridTemplateColumns: "repeat(3, auto)",
    },
  },
});

/**
 * Home page
 *
 * @todo: Load more characters when a user is detected to be on the bottom of the list
 * (e.g. with IntersectionObserver)
 */
export default function Home() {
  const classes = useStyles();
  const [characters, setCharacters] = React.useState<(People | undefined)[]>(Array.from(Array(10)));

  /** @todo URL should be stored somewhere else, e.g. in a constant file */
  const [url, setUrl] = React.useState<string | undefined>("https://swapi.dev/api/people/");
  const title = "Star Wars Characters";

  const fetchPeople = async () => {
    if (!url) return;

    const response = await fetch(httpToHttps(url), { redirect: "follow" });
    const result: PagedResults<People> = await response.json();

    // In case only the skeleton loader is shown, replace its content
    if (characters.every((character) => !character)) {
      setCharacters(result.results);
    } else {
      // Add new characters
      setCharacters([...characters, ...result.results]);
    }

    // Update the state to the next page, if now page exists store undefined.
    // So that we can detect when we are at the end of the list.
    setUrl(result.next || undefined);
  };

  /**
   * Load the next characters
   */
  function loadMore() {
    fetchPeople();
  }

  React.useEffect(() => {
    // Fetch first list
    fetchPeople();
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Container>
        <Typography variant="h1" className={classes.title}>
          {title}
        </Typography>
        <div className={classes.grid}>
          {characters.map((character, key) => (
            <Character key={`character-${key}`} character={character}></Character>
          ))}
        </div>
        <Box my={3}>
          {url ? (
            <Button onClick={loadMore} size="large" color="primary" variant="contained">
              Load More
            </Button>
          ) : undefined}
        </Box>
      </Container>
    </>
  );
}
