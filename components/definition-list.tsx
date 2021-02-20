import React from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

export interface DefinitionData {
  icon: SvgIconComponent;
  title: string;
  value: string | undefined;
};

interface DefinitionListState {
  list?: (DefinitionData | undefined)[];
  className: string;
  skeletonItems?: number;
}

function createInfo(
  skeletonItems: number,
  list?: (DefinitionData | undefined)[]
): (DefinitionData | undefined)[] {
  return list?.length ? list : Array.from(Array(skeletonItems));
}

export default function DefinitionList(props: DefinitionListState) {
  const DEFAULT_SKELETON_ITEMS = 3;
  const [skeletonItems, setSkeletonItems] = React.useState<number>(
    DEFAULT_SKELETON_ITEMS
  );
  const [info, setInfo] = React.useState<(DefinitionData | undefined)[]>(
    createInfo(skeletonItems, props.list)
  );

  React.useEffect(() => {
    setInfo(createInfo(skeletonItems, props.list));
  }, [props.list]);

  React.useEffect(() => {
    setSkeletonItems(props.skeletonItems || DEFAULT_SKELETON_ITEMS);
    setInfo(createInfo(skeletonItems, props.list));
  }, [props.skeletonItems]);

  return (
    <List className={props.className}>
      {info.map((definition, key) => (
        <ListItem key={`definition-list-${key}`}>
          <ListItemAvatar>
            {!definition ? (
              <Skeleton variant="circle">
                <Avatar />
              </Skeleton>
            ) : (
              <Avatar>
                <definition.icon />
              </Avatar>
            )}
          </ListItemAvatar>
          {!definition ? (
            <Box width="100%">
              <Skeleton variant="text" width="100%" height="2em" />
              <Skeleton variant="text" width="60%" />
            </Box>
          ) : (
            <ListItemText
              primary={definition?.title}
              secondary={definition?.value}
            />
          )}
        </ListItem>
      ))}
    </List>
  );
}
