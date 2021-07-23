# PerfAnalytics JS

**PerfAnalytics JS** is part of PerfAnalytics ecosystem which collects and criticizes web performance data.


## How it works

Collect performance metrics with new [Navigation Timing Level 2](https://w3c.github.io/navigation-timing/). 

**Collect** *`TTFB`*, *`FCP`*, *`Dom Load`*, and *`Window Load`* events and *`Document Network timings`* with [PerformanceNavigationTiming API `(as know as Navigation Timing v2)`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming)

Metrics are sent with [Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API) if exist otherwise send with [fetch API.](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 

> - [Navigator.sendBeacon()](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon)

## Installation 

Add this line under **HTML body** to serve analytics metric with perfanalytics API.

```html
<script src="https://hasantezcan.github.io/PerfAnalytics-Js/src/index.js"></script>
```
> Script size = **2.3 KiB**

After add, this line to your project you can watch metric results from [perfanalytics Dashboard.](https://hasantezcan.github.io/PerfAnalytics-Dashboard/)

## For custom usage

If you want to customize this script. You can set backend url which are you using on top of the `src/index.js` file.

```bash
const BASEURL = "https://perfanalytics-api-ht.herokuapp.com";
```

This script sends a JSON object parsed as a text.

**JSON structure:**

```js
{
  "UserAgent": string,
  "URL": string,
  "TTFB": number,
  "DomLoad": number,
  "WindowLoad": number,
  "FCP": number,
  "Entries": [
    {
      "name": string,
      "initiatorType": string,
      "responseEnd": number,
      "transferSize": number
    }
  ]
}
```

**JSON example:**

```json
{
  "UserAgent": "Mozilla/5.0 (X11; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0",
  "URL": "http://127.0.0.1:5502/.Test%20sites/index.html",
  "TTFB": 0.002,
  "DomLoad": 1.141,
  "WindowLoad": 1.141,
  "FCP": 0.589,
  "Entries": [
    {
      "name": "http://127.0.0.1:5502/.Test%20sites/style.css",
      "initiatorType": "other",
      "responseEnd": 0.88,
      "transferSize": 0
    }
  ]
}
```



## Dev Logs

You can reach my [**`dev logs`**](DEVLOGS.md) about this project! 


## Commit message convention

I use [this](https://www.conventionalcommits.org) commit message conventions standard in this project.
> https://www.conventionalcommits.org
 
## License

[MIT](/LICENSE)