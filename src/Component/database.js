// import mongoose from "mongoose";
const mongoose = require('mongoose');
const express=require('express');
const News=require("./Schema.js");
const { log } = require('react-zlib-js');
const cors = require('cors')
const app=express();
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://23031701012:23031701012@cluster.dmkbw.mongodb.net/news").then(()=>{
        console.log("Connected with mongoDB");

    //get
    app.get('/news', async (req, res) => {
        try {
            const newsapi = await News.find();
            res.send(newsapi);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });


    // get by category
    app.get("/news/category/:category", async (req, res) => {
        try {
            const newsapi = await News.find({ category: req.params.category });
            res.send(newsapi);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });

    // get by id

    app.get("/news/id/:id", async (req, res) => {
        console.log(req.params.id)
        try {
            
            const newsArticle = await News.findOne({id:req.params.id});
            
            res.send(newsArticle);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });

    // insert
    app.post('/news', async (req,res)=>{
        const { name, description, urlToImage, url, category } = req.body;

        const newNews=new News({
                name,
                description,
                urlToImage,
                url,
                category
        })
        const savednews=await newNews.save();
        res.send(savednews)
    })

    // update

    app.patch('/news/id/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
    
            const updatedNews = await News.findOneAndUpdate({ id: id }, updateData, { new: true });
            if (!updatedNews) {
                return res.status(404).json({ message: "Article not found" });
            }
            res.json(updatedNews);
        } catch (error) {
            console.error("Error updating data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    

    // delete

    app.delete('/news/:id', async (req, res) => {
        try {
            const { id } = req.params;

            const deletednews = await News.findOneAndDelete({ id: id });
    
            if (!deletednews) {
                return res.status(404).send("Article not found");
            }
    
            res.send(deletednews); // Respond with the deleted item
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });
    

    app.listen(5000,()=>{
            console.log("connected");
    })
})

