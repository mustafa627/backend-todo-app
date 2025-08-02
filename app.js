import cors from "cors";
import express from "express";
import { mongoose } from "mongoose";
import TodoData from "./schema.js";
const app = express();
const port = process.env.PORT || 5500;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const uri = "mongodb+srv://aweb1727:aweb1727@cluster0.e5zfq16.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
    .connect(uri)
    .then((res) => console.log("MongoDB connected"))
    .catch((err) => console.log(err.message));
 
 

 
app.get("/", (req, res)=> {
    res.send("hellsever running on post 3000")
})


// create api
app.post("/createTodo", async (req, res) => {
    try {
        const body = req.body
        const data = await TodoData.create(body)
        res.json({
            message: "Successfully created!",
            data: data,
            status: true
        })

    } catch (error) {
        res.json({
            message: error.message || "Something went wrong",
            status: false
        })
    }
})

// get data
app.get("/getTodos", async (req, res) => {
    try {
        const data = await TodoData.find().sort({ "createAt": -1 })
        res.json({
            message: "Successfully Get!",
            data: data,
            status: true
        })

    } catch (error) {
        res.json({
            message: error.message || "Something went wrong",
            status: false
        })
    }
})


// update data
app.put("/updateTodo/:id", async (req, res) => {
    try {
        const TodoId = req.params.id
        const body = req.body
        const updateData = await TodoData.findByIdAndUpdate(TodoId, body, { new: true })
        res.json({
            message: "Successfully UPdated!",
            data: updateData,
            status: true
        })
    }
    catch (error) {
        res.json({
            message: error.message || "Something went wrong",
            status: false
        })
    }
})


app.delete("/deleteTodo", async (req, res) => {
    console.log(req.query, "query")
    await TodoData.findByIdAndDelete(req.query.id)
    res.json({
        message: "Successfully deleted!",
        data: null,
        status: true
    })
})

app.delete("/deleteAllTodo", async (req, res) => {
    await TodoData.deleteMany()
    res.json({
        message: "Successfully deleted!",
        data: null,
        status: true
    })
})



 

 

// Export for Vercel
export default app;