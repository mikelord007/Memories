import Mongoose from 'mongoose';
import postMessage from '../models/postMessage.js';


export const getPosts = async (req,res) => {
    try{
        const postMessages = await postMessage.find();
        res.status(200).json(postMessages);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req,res) => {
    const post = req.body;

    const newPost = new postMessage(post);
    try{
        await newPost.save();
        res.status(200).json(newPost);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

export const updatePost = async(req,res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that status')

    const updatedPost = await postMessage.findByIdAndUpdate(_id, post,{new: true});

    res.json(updatedPost);
}

export const deletePost = async(req,res) => {
    const { id: _id } = req.params;

    if(!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that status')

    await postMessage.findByIdAndRemove(_id);

    res.json({message: 'Post deleted successfully'});
}

export const likePost = async(req,res) => {
    const { id: _id } = req.params;

    if(!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that status')

    const post = await postMessage.findById(_id);

    const updatedPost = await postMessage.findByIdAndUpdate(_id,{ likeCount: post.likeCount + 1}, {new: true});

    res.json(updatedPost);
}