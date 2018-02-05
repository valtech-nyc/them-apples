const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="/manifest.json">
    <title>Them Apples</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
    
    <script src="assets/js/bundle.js"></script>
  </body>
</html>
`);
});

module.exports = router;
