const express = require('express');
const app = express();
const pool = require('./database/database');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash')
const PORT = process.env.PORT || 4000;


app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.get("/", (req, res)=>{
    res.render("index")
});

app.get("/users/register", (req, res)=>{
    res.render("register")
});

app.get("/users/login", (req, res)=>{
    res.render("login")
});

app.get("/users/dashboard", (req, res)=>{
    res.render("dashboard", { user: "Geymison Cavalcante" })
});

app.post("/users/register", async (req, res)=>{
    let { name, email, password, password2 } = req.body;

    console.log({
        name,
        email,
        password,
        password2
    });

    let errors = [];

    if(!name || !email || !password || !password2) {
        errors.push({message: "Insira todos os campos!"});
    }

    if(password.length < 6){
        errors.push({ message: "A senha deve conter ao menos 6 caracteres" });
    }

    if(password != password2){
        errors.push({ message: "A senha não combina" });
    }

    if(errors.length > 0){
        res.render('register', { errors })
    }else{
        // Validação da senha com hash

        let hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword);

        pool.query("SELECT * FROM login.users WHERE email = $1",
        [email], (err, results)=>{
            if(err){
                throw err
            }
            console.log(results.rows);

            if(results.rows.length > 0){
                errors.push({ message: "Email já cadastrado" });
                res.render('register', { errors });
            }
        }
        );

    }

});



app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});

