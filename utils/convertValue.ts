import People from "swapi-typescript/dist/models/People";

// Only allow string properties of the People type to be converted.
type stringOnlyKeys = Extract<keyof People, string>;

export function convertPeopleValue<T extends stringOnlyKeys>(
  type: T,
  value: string
) {
  switch(type) {
    case "height":
      return `${value}cm`;
    case "mass":
      return `${value}kg`;
    case "birth_year": {
      const format = value.match(/(\d+).*?(\w+)/);
      if(format) {
        return `${format[1]} ${format[2]}`;
      } else {
        // Couldn't parse birt year wit used regex,
        // As such just use the initial value
        // Tracking if this happens would help to see if this ever happens on a live env.
        return value;
      }
    }
    default:
      return value.substring(0, 1).toUpperCase() + value.substring(1);
  }
}
