// This is a list of things we DO NOT want to redirect to
const blacklist = [
  '/', // Just in case. We don't want to end up in a redirect loop
  'favicon.ico', // Browsers automatically request this, don't want to waste time on them
  'http-redirect-to.glitch.me', // This would cause a redirect loop which is bad
];

// The HTML meta tags for the HTML page to be returned
const metaTags = `
    <!doctype html>
    <!-- Declare the HTML doctype -->
    
    <meta charset="utf-8">
    <!-- Set the content type to UTF-8 so we can render emojis -->

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Make it responsive! -->

    <meta name="referrer" content="unsafe-URL"> 
    <!-- A way to set the Referrer-Policy.
         See the meta tags page: https://developer.mozilla.org/en/docs/Web/HTML/Element/meta
    -->
  
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
    </style>
    <!-- Some CSS to style the page -->
`;

// Some content for the HTML page to be returned
const content = `
  <p>Add a URL to the path to get redirected there, e.g. <a href="/http-referer.glitch.me">javascript-redirect-to.glitch.me/http-referer.glitch.me ➡️</a></p>
  <p>See how this works by reading <a href="https://glitch.com/edit/#!/javascript-redirect-to?path=server.js:1:0">the code on Glitch 🎏</a></p>
`;

// ##################################
// #  The Import Stuff Starts Here  #
// ##################################

// Export our function that `micro` uses to handle requests
module.exports = (req, res) => {
  
  // 1. Grab the URL from the request
  //    See the documentation here: https://nodejs.org/api/http.html#http_message_url
  let url = req.url
    .replace(/^\/+/, ''); // Remove 1+ leading slashes from the URL e.g. ////http://endless.horse becomes http://endless.horse
  
  // 2. If the URL doesn't start with a protocol then add https to it
  if (url.search(/https?:\/\//) !== 0) {
    url = 'https://' + url;
  }
  
  // 3. Check if we have a URL left after removing the slashes and whether it's in the blacklist (minus the http protocol)
  if (!url || blacklist.includes(url.replace(/https?:\/\//, ''))) {
    
    // If there's no good URL to redirect to return an error message
    res.end(`
      ${metaTags}
      <h1>Oops 🙈</h1>
      ${content}
    `);
  }
  
  // 4. We have a URL so...
  
  // 4a. Set the referrer policy header so we can let the destination know where we came from.
  //     See the HTTP header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  res.setHeader('Referrer-Policy', 'unsafe-url');
  
  // 4b. Return a HTML document that handles the rest
  res.end(`

    ${metaTags}

    ${url ? `<script>document.location = ${JSON.stringify(url)};</script>` : ''}
    <!-- 
      If we have a URL then add a script tag with some JavaScript which redirects the page.
      
      In the browser we can set document.location to a string to cause the browser to move to a new page. 
      See the documentation: https://developer.mozilla.org/en-US/docs/Web/API/Document/location
    -->

    ${content}

  `);
}