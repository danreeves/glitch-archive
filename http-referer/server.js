const stringifyObject = require('stringify-object'); // This is a package that nicely turns JavaScript objects
                                                     // into strings so we can print them to the page later.

// Export a function that `micro` can use to handle requests
// See: npm.im/micro
module.exports = function (req, res) {
  // See the Response.end() documentation: https://nodejs.org/api/http.html#http_response_end_data_encoding_callback
  // We're retuning a string which contains our HTML document.
  
  // We're getting the referrer value from the headers object on the incoming request
  // See the documentation here: See the request.headers documentation: https://nodejs.org/api/http.html#http_message_headers
  
  res.end(`
    <!doctype html>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      html, body {
        margin:0;
        padding:0;
        font-family: sans-serif;
      }
      body {
        margin: 2em;
      }
      a {
        text-decoration: none;
        font-weight: bold;
        color: deeppink;
      }
      pre {
        font-family: monospace;
      }
    </style>

    <h1>Referrer: <code>${req.headers.referer}</code></h1>

    ${!req.headers.referer ? `
      <p>Looks like the referrer was not set. To see it working try <a href="https://javascript-redirect-to.glitch.me/http-referer.glitch.me">this link 🔄</a></p>
    ` : ''}

    <p>See how this works by reading <a href="https://glitch.com/edit/#!/http-referer?path=server.js:1:0">the code on Glitch 🎏</a></p>
    
    <details>
      <summary>All headers</summary>
      <pre>

${stringifyObject(req.headers, {
  indent: '    ',
  singleQuotes: false
})}
      </pre>
    </details>

  `);
}