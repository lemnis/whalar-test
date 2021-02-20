import People from "swapi-typescript/dist/models/People";

// Only allow string properties of the People type to be converted.
type stringOnlyKeys = Extract<keyof People, string>;

function capitalizeFirstLetter(string: string){
  return string.substring(0, 1).toUpperCase() + string.substring(1)
}

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
        // Couldn't parse birth year with used regex,
        // As such just use the initial value (e.g. when value is 'unknown')
        return capitalizeFirstLetter(value);
      }
    }
    default:
      return capitalizeFirstLetter(value);
  }
}
