// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  const date = req.params.date;
  if (!date) {
    res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });
  } else {
    const parsedDate = isNaN(Date.parse(date)) ? new Date(parseInt(date)) : new Date(date);
    if (isNaN(parsedDate.getTime())) {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: parsedDate.getTime(),
        utc: parsedDate.toUTCString(),
      });
    }
  }
});


// app.get("/api/:date?", function (req, res) {
//   const date = req.params.date
//   //falta data
//   if (!date) {
//     res.json({
//       unix: new Date().getTime(),
//       utc: new Date().toUTCString(),
//     });
// } else if (isNaN(parseInt(date))) {
//     res.json({ error: "Invalid Date" });
//   } else if (date.includes("-")) {
//     res.json({
//       unix: new Date(date).getTime(),
//       utc: new Date(date).toUTCString(),
//     });
//   } else {
//     res.json({
//       unix: new Date(parseInt(date)).getTime(),
//       utc: new Date(parseInt(date)).toUTCString(),
//     });

 
//   }
// });



// app.get("/api/:date?", function (req, res) {
//   let dateParam = req.params.date;

//   // If dateParam is not provided, use the current date
//   if (!dateParam) {
//     dateParam = new Date();
//   } else {
//     // Try parsing dateParam as a date string
//     const date = new Date(dateParam);

//     // Check if the parsed date is valid
//     if (isNaN(date.getTime())) {
//       return res.json({ error: "Invalid Date" });
//     }

//     dateParam = date;
//   }

  // Respond with the UNIX timestamp and UTC string representation of the date
//   res.json({
//     unix: dateParam.getTime(),
//     utc: dateParam.toUTCString(),
//   });
// });

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
