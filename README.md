# date-strings
Simple zero dependancy client or server package for finding out how long ago in English a Date object was.

```js
import ds from 'date-strings';

const date = new Date('2017-09-01T09:54:05.216Z');
const dateString = ds(date);

const response = `Event took place on ${dateString.when}, ${dateString.ago.strings.long} ago`;
// Event took place on 1 Sep 10:54, 4 weeks 1 day
```

## build
Date Strings is written in modern es7, but uses babel to transpile
`npm build`

## tests
`npm test`


