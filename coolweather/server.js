let fetch = require("node-fetch");
let merry = require("merry");
let querystring = require("querystring");
let fs = require("fs");
let Cache = require("timed-cache");

let cache = new Cache({ defaultTtl: 300 * 1000 }); // Five minute cache
let app = merry();

function getDurationInMilliseconds(start) {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
}

app.route(
  "GET",
  "/___glitch_loading_status___",
  async function (_req, _res, ctx) {
    ctx.send(200, "OK");
  }
);

app.route("GET", "/", async function (_req, _res, ctx) {
  let md = fs.readFileSync("./README.md", { encoding: "UTF-8" }).toString();
  ctx.send(200, md, { "Content-Type": "text/plain; charset=UTF-8" });
});

app.route("GET", "/:city", async function (req, _res, ctx) {
  let start = process.hrtime();
  let {
    params: { city },
  } = ctx;
  let units = "metric";

  let [, query] = req.url.split("?");
  if (query) {
    let qs = querystring.parse(query);
    if (qs.units) {
      units = qs.units;
    }
  }

  let cacheKey = `${city}:${units}`;
  let data = cache.get(cacheKey);
  let status = 200;
  let servedFromCache = true;

  if (!data) {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&&units=${units}&appid=${process.env.OPENWEATHER_KEY}`
    );
    status = res.status;
    data = await res.json();
    servedFromCache = false;
    cache.put(cacheKey, data);
    if (!res.ok) {
      ctx.send(status, { error: res.status, message: data.message });
      return;
    }
  }

  let out = {
    weather: data.weather[0].description.toLowerCase(),
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    lat: data.coord.lat,
    lon: data.coord.lon,
    country: data.sys.country,
    name: data.name,
    dt: data.dt,
    _meta: {
      icon: data.weather[0].icon,
      servedFromCache,
      timeSpentOnRequest: getDurationInMilliseconds(start),
    },
  };

  ctx.send(status, JSON.stringify(out, null, 2), {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });
});

app.listen(parseInt(process.env.PORT, 10));
