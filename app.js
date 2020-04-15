let express, app, bodyparser, request, https,key;
//init function
function init() {
    //require part
    express = require("express");
    bodyparser = require("body-parser");
    request = require("request");
    https = require("https");
    key=require("./apiKey.js");
    console.log('key :', key);
    app = new express();
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.get('/', (req, res) => {
        res.sendFile(__dirname + "/public/views/index.html");
    });
    app.listen(process.env.PORT|| 3000, () => {
        console.log(`Server started on 3000`);
    });
}
init();

//handle the sign up button
app.post('/signup', (req, res) => {
    let fname = req.body.Fname;
    let lname = req.body.Lname;
    let email = req.body.email;
    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    Lname: lname
                }
            }
        ]

    }
    let jsonData = JSON.stringify(data);

    let url = "https://us19.api.mailchimp.com/3.0/lists/39a1eae912"
    let options = {
        method: "POST",
        auth: `Saleh:${key}`
    }
    let request = https.request(url, options, response => {
        (response.statusCode == 200) ? res.sendFile(__dirname + "/public/views/welcome.html") : res.sendFile(__dirname + "/public/views/fail.html");
        // response.on("data", (data) => {

        // })
    })
    request.write(jsonData);

    request.end();
 
});


//redirect after failing
app.post('/tryAgain', (req, res) => {
     res.redirect("/");
});









