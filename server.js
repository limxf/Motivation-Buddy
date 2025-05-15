// Needed for dotenv
require("dotenv").config();

// Needed for Express
var express = require('express')
var app = express()

// Needed for EJS
app.set('view engine', 'ejs');

// Needed for public directory
app.use(express.static(__dirname + '/public'));

// Needed for parsing form data
app.use(express.json());       
app.use(express.urlencoded({extended: true}));

// Needed for Prisma to connect to database
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

//   try {
//     // Send data to your backend (replace '/subscribe' with your actual endpoint)
//     const response = await fetch('/subscribe', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formData)
//     });

//     if (response.ok) {
//       validationMsg.style.color = 'green';
//       validationMsg.textContent = 'Subscription successful!';
//       // Optionally, reset the form
//       document.getElementById('signup-form').reset();
//     } else {
//       validationMsg.style.color = '#d9534f';
//       validationMsg.textContent = 'Subscription failed. Please try again.';
//     }
//   } catch (error) {
//     validationMsg.style.color = '#d9534f';
//     validationMsg.textContent = 'An error occurred. Please try again.';
//   }


// Main landing page
app.get('/', async function(req, res) {
    res.render('/index');
});

// Create a new post
app.post('/subscribe', async function(req, res) {
    
    // Try-Catch for any errors
    try {
        // Get the title and content from submitted form
        const { name, phone, start_date, message_time } = req.body;

        // Reload page if empty title or content
        if (!name || !phone || !start_date || !message_time) {
            console.log("Unable to sign up");
            res.render('/');
        } else {
            // Create post and store in database
            const blog = await prisma.post.create({
                data: { name, phone,start_date,message_time },
            });

            // Redirect back to the homepage
            res.redirect('/index');
        }
      } catch (error) {
        console.log(error);
        res.render('/index');
      }

});


// Tells the app which port to run on
app.listen(8080);