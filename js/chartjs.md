# Chart.js

# Overview

```js
var ctx = document.getElementById("myChart").getContext("2d");

var chart = new Chart(ctx, {
  type: "", // line, bar
  data: {
    labels: [],
    datasets: [
      // M datasets for M data series
      {
        type: "line",
        label: [
          /*N*/
        ],
        data: [
          /* N */
        ],
        backgroundColor: [
          /* N */
        ],
        borderColor: [
          /* N */
        ],
        fill: false, // between line & axis
      },
      {
        type: "bar",
        label: [],
      },
    ],
  },
  options: {
    animations: {},
    title: {
      /* Chart title, and its options */
    },
    scale: {
      xAxes: [],
      yAxes: [],
    },
    tooltips: {},
  },
});
```

# Scale options (xAxes / yAxes)

- For time series data, you better use `momoent.js`

```json
{
  type: "time"; // time,
  time: {

  }
  scaleLabel: {
    display: true,
    labelString: 'Date' // Axis label
  }
}
```

# Chart lib

```js
// "window" is global JS obj
// Seen in window.onload()
// Seemingly Chart.js automatically appends chartColors obj to it
window.chartColors.red;
Chart.helpers.color;
```
