const express = require('express');
const app = express();
app.use(express.json());
var port = 8080;

const knex = require("knex")({
    client: "mysql",
    version: '7.2',
    connection: {
      host: "localhost",
      user: "root",
      password: "Shanti123#@!",
      database: "student_details"
    }
})

knex.schema.hasTable("candidateDetails").then((exits) => {
    if(!exits){
        return knex.schema.createTable("candidateDetails",(t) => {
            t.increments('id').primary()
            t.string("Name")
            t.string("Email")
            t.integer("first_round")
            t.integer("second_round")
            t.integer("third_round")

        })
    }
})

app.post('/adding',(req,res) => {
    knex('candidateDetails').insert({
        Name : req.body.Name,
        Email :req.body.Email,
        first_round : req.body.first_round,
        second_round : req.body.second_round,
        third_round : req.body.third_round
    })
    .then(() => {
        res.send("created...............")
        console.log("created............");
    }).catch((err) =>{
        res.send(err)
        console.log(err);

    })
})

app.get('/AveragetScore',(req,res) => {
    knex.select("*").from("candidateDetails")
    .then((data) => {
        // console.log(data,"shnatiiiiiiiiii");
        // res.send(data)
        var average_score = [] ;
        for(var i=0; i<data.length; i++){
            console.log(data[i].first_round + " " + data[i].second_round + " " + data[i].third_round)
            var average = (data[i].first_round +  data[i].second_round + data[i].third_round)/3;
            console.log(average);
            average_score.push({id: data[i].id, name : data[i].Name , Email : data[i].Email , average_score: average})

        }
        res.send(average_score)
        console.log(average_score)
    })
    .catch((error) => {
        console.log(error)
        res.send(error)
    })
})

app.listen(port , ()=> {
    console.log("Server is working with port is 8080!!");
})