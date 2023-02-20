const bodyParser = require('body-parser');
const request = require('request');
const express = require('express');
// const nodeFetch = require('node-fetch');

const app = express()

app.use(express.static("public"))

const https = require('https');


app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/sign.html")


})

app.post("/", (req, res) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.Email
    console.log(firstName, lastName, email)
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    
    const url = "https://us12.api.mailchimp.com/3.0/listS/493cdd4cc6"

    const option = {
        method: "POST", 
        auth : "auth:a8b693e5d881b815349e0274d7f6e7e3-us12"
    }
    const request = https.request(url, option, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
            
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
            
        })

    })
    request.write(jsonData);
    request.end();
    
   
        
})
app.post("/failure", (req,res)=>{
    res.redirect("/")

})
app.listen(process.env.PORT || 3000, () => {
    console.log("3000 is running");
})



/