const emojis = require("emojis-list");
const toUnicode = require("emoji-unicode");
const express = require("express");
const app = express();

const urls = emojis
  .map((e) => toUnicode(e))
  .map((c) => `https://mail.google.com/mail/e/${c}`);

app.get("*", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Gmojis!</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>  
  <body>
  
   ${urls.map((url) => `<img src="${url}" />`).join("")}

    <!-- include the Glitch button to show what the webpage is about and
          to make it easier for folks to view source and remix -->
    <div class="glitchButton" style="position:fixed;top:20px;right:20px;"></div>
    <script src="https://button.glitch.me/button.js"></script>
  </body>
</html>
`);
});

app.listen(process.env.PORT);
