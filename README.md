# How to use

Install the npm packages

```
npm install
```

Build the package

```
npm run build
```

Start the package

```
npm run start 
```

# Dependencies

- Material UI: Used for increase the speed of building the app
- swapi-typescript: Used only for the included types, I didn't use the functions as the project is not being maintained. Nor would I use any other module in production code.

# Missing
- Unit & e2e tests
- Handle errors
- Auto load more characters when bottom of screen is reached
- Store (redux) to maintain state / data
- Missing loading visual after pressed "read more"
- UI adapts to its content, but this can result in a sudden chance in the UI when more content is loaded. This should be a fixed size.