# COOKIE ANALYZER

Cookie Analyzer is CLI executable to get the most frequent cookie occuring in huge file

## Features

- Calculate the most frequent Cookies
- Built using Typescript
- Built with streams first to avoid creating large memory footprint when parsing large files.
- Extensively tested with huge files

## Upcoming Features

- Get the Top K frequent cookies
- Preprocess the file and store check-sum.txt to avoid processing the file again.
- Support for multiple date queries

## How to Install

```Node
npm i @jeevansirela/cookie-analyzer -g
```

## How to Build and Test

- Clone the project
- Install all dependencies including dev dependencies
- Build using `npm run build` which includes tests too
- Can run tests separately using `npm run test`

## How To Run

```Node
  analyze-cookie -f "test1.csv" -d "2018-12-07"
```
