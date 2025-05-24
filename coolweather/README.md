# a cool weather api

Request `https://coolweather.glitch.me/city,countrycode` like...

```
https://coolweather.glitch.me/seattle,usa
-> {
  "weather": "broken clouds",
  "feelsLike": 2.53,
  "sunrise": 1604155963,
  "sunset": 1604191978,
  "lat": 47.61,
  "lon": -122.33,
  "country": "US"
}

https://coolweather.glitch.me/truro,gb
-> {
  "weather": "shower rain",
  "feelsLike": 4.96,
  "sunrise": 1604128160,
  "sunset": 1604163488,
  "lat": 50.27,
  "lon": -5.05,
  "country": "GB"
}
```

By default units are in metric, meaning Celcius.
If you want Farenheit you can add `?units=imperial` to the URL.
`?units=standard` is also an option if Kelvin is more your jam.

This API can only handle 60 calls a minute so please be kind.

> _☔️ originally forked from glitch.com/~niceweather_
