import React from "react";
// Using swapi-typescript for type definitions, just to speed up the dev. process.
// Given types could be incorrect as I didn't checked the quality of them.
import People from "swapi-typescript/dist/models/People";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import {
  LocalMovies,
  Cake,
  FitnessCenter,
  Wc,
  Visibility,
  PanTool,
  Face,
  ArrowBack,
} from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import { httpToHttps } from "../../utils/url";
import { convertPeopleValue } from "../../utils/convertValue";
import DefinitionList, { DefinitionData } from "../../components/definition-list";
import theme from "../../utils/theme";

const useStyles = makeStyles({
  root: {},
  button: {
    width: "100%",
  },
  list: {
    display: "grid",
    gridGap: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(2, auto)",
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(3, auto)",
    },
  },
  pos: {
    marginBottom: 8,
  },
});

export default function Character() {
  const router = useRouter();
  const { id } = router.query;

  const classes = useStyles();
  const [character, setCharacter] = React.useState<People>();
  const [films, setFilms] = React.useState<string[]>([]);
  const [info, setInfo] = React.useState<DefinitionData[]>([]);
  const [title, setTitle] = React.useState<string>("");

  const fetchCharacter = async () => {
    if (!id) return;

    // Todo: move the base url to a constant / environment file
    const response = await fetch("https://swapi.dev/api/people/" + id + "/", {
      redirect: "follow",
    });
    const character: People = await response.json();
    setCharacter(character);
  };

  React.useEffect(() => {
    fetchCharacter();
  }, [id]);

  React.useEffect(() => {
    if (!character) return;

    // Set the features of current character
    setInfo([
      {
        icon: LocalMovies,
        title: "Height",
        value: convertPeopleValue("height", character.height),
      },
      {
        icon: Wc,
        title: "Gender",
        value: convertPeopleValue("gender", character.gender),
      },
      {
        icon: FitnessCenter,
        title: "Mass",
        value: convertPeopleValue("mass", character.mass),
      },
      {
        icon: Face,
        title: "Hair color",
        value: convertPeopleValue("hair_color", character.hair_color),
      },
      {
        icon: Visibility,
        title: "Eye color",
        value: convertPeopleValue("eye_color", character.eye_color),
      },
      {
        icon: PanTool,
        title: "Skin color",
        value: convertPeopleValue("skin_color", character.skin_color),
      },
      {
        icon: Cake,
        title: "Birth year",
        value: convertPeopleValue("birth_year", character.birth_year),
      },
    ]);

    // Show skeleton loader while film info is getting fetched.
    if (films) {
      setFilms(Array.from(Array(character.films.length)));
    }

    // Start loading the film titles
    Promise.all(
      character?.films.map((filmUrl, index) => {
        return fetch(httpToHttps(filmUrl), { redirect: "follow" }).then((response) =>
          response.json()
        );
      })
    ).then((films) => {
      // Ideally you would populate the films async, and not wait till all promises are resolved.
      // When trying only the first result was popping up.
      setFilms(films.map((film) => film.title));
    });

    // Update the meta title & h1 with fetched data
    setTitle(character.name);
  }, [character]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Container>
        <Box my={3}>
          {/* When navigating back, it would be best that navigates back to the exact card that was just openend. */}
          <Button href="/" variant="contained" color="primary" startIcon={<ArrowBack />}>
            Back to main list
          </Button>
        </Box>
        <Box my={3}>
          <Card component="section">
            <CardContent>
              <Typography gutterBottom={true} align="center" variant="h4" component="h1">
                {title ? title : <Skeleton />}
              </Typography>
              <DefinitionList className={classes.list} list={info} skeletonItems={7} />
              <Divider />
              <List>
                <ListSubheader>{character?.films.length} Films</ListSubheader>
                {films.map((item, key) => (
                  <ListItem key={`film-${key.toString()}`}>
                    {
                      item
                      ? <ListItemText primary={item} /> 
                      : <Skeleton width={Math.ceil(Math.random() * 30) + 'em'} /> // A fixed width was too boring today ;)
                    }
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}
