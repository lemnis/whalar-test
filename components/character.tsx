import React from "react";
// Using swapi-typescript for type definitions, just to speed up the dev. process.
// Given types could be incorrect as I didn't checked the quality of them.
import People from "swapi-typescript/dist/models/People";
import { ButtonBase, Typography, CardContent, Card, makeStyles } from "@material-ui/core";
import { LocalMovies, Cake } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import DefinitionList, { DefinitionData } from "./definition-list";
import { getIdFromUrl } from "../utils/url";
import { convertPeopleValue } from "../utils/convertValue";
import theme from "../utils/theme";

const useStyles = makeStyles({
  // Makes sure that the click target spans the full card
  fullWidth: {
    width: "100%",
  },
  // Change the direction of the definiton list
  list: {
    display: "flex",
    flexDirection: "row",
  },
  // Align the title with the definition list
  title: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
});

type CharacterState = { character?: People };

/**
 * Minicard for a character
 * @param props
 */
export default function Character(props: CharacterState) {
  const classes = useStyles();
  const [info, setInfo] = React.useState<DefinitionData[]>([]);
  const [id, setId] = React.useState<string>();

  React.useEffect(() => {
    if (!props.character) return;

    setInfo([
      {
        // Icons are a dangerous thing as they possibly are unclear to some users,
        // but I liked the visual appeal for this app
        icon: LocalMovies,
        // These should become hard-coded, these should be variables for translation.
        title: "Films",
        value: props.character.films.length.toString(),
      },
      {
        // Icons are a dangerous thing as they possibly are unclear to some users,
        // but I liked the visual appeal for this app
        icon: Cake,
        // These should become hard-coded, these should be variables for translation.
        title: "Birth Year",
        value: convertPeopleValue("birth_year", props.character.birth_year),
      },
    ]);

    // Extract the id from the url, as that id is used for routes within our application.
    setId(getIdFromUrl(props.character?.url));
  }, [props.character]);

  return (
    <Card component="section">
      <ButtonBase className={classes.fullWidth} href={`/character/${id}`}>
        <CardContent className={classes.fullWidth}>
          <Typography variant="h4" component="h2" className={classes.title}>
            {props.character?.name ? props.character?.name : <Skeleton />}
          </Typography>
          <DefinitionList className={classes.list} list={info} skeletonItems={2} />
        </CardContent>
      </ButtonBase>
    </Card>
  );
}
