const express = require ("express");
const mongoose = require('mongoose');
const dotenv = require ("dotenv").config();
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")
const multer = require("multer");
var cors = require('cors');
const path = require ("path");




const app = express ();
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

//Accessing the public folder
const imagePath = path.join(__dirname, "images");
app.use("/images", express.static(imagePath));


const PORT = process.env.PORT

//Connecting to mongoDb
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("database is connected"))
.catch(err => console.error("error connecting to database", err)) // Defining the error message when it doesn't connect 

//Setting up multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage });
  app.post("/upload", upload.single("file"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      res.status(200).json({ message: "File uploaded successfully", filename: req.file.filename });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


//Creating the routes
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/posts", postRoute);
app.use("/categories", categoryRoute);

//Connecting to the server
app.listen(PORT, ()=> console.log(`server is connected on port: ${PORT}`))

