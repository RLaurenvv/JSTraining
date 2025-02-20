const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const router = express.Router();

dotenv.config();

const API_URL = process.env.API_URL;

const typeColors = {
    fire: 'bg-red-500 border-red-600',
    water: 'bg-blue-500 border-blue-600',
    grass: 'bg-green-500 border-green-600',
    electric: 'bg-yellow-500 border-yellow-600',
    ground: 'bg-yellow-900 border-yellow-800',
    psychic: 'bg-pink-500 border-pink-600',
    ice: 'bg-teal-500 border-teal-600',
    dragon: 'bg-indigo-600 border-indigo-700',
    dark: 'bg-gray-800 border-gray-900',
    fairy: 'bg-pink-300 border-pink-400',
    normal: 'bg-gray-300 border-gray-400',
    flying: 'bg-indigo-400 border-indigo-500',
    fighting: 'bg-red-700 border-red-800',
    poison: 'bg-purple-500 border-purple-600',
    bug: 'bg-lime-500 border-lime-600',
    rock: 'bg-yellow-600 border-yellow-700',
    ghost: 'bg-purple-900 border-purple-950',
    steel: 'bg-gray-500 border-gray-600',
    mystery: 'bg-gray-400 border-gray-500',
  };

router.get("/", async (req, res) => {
    try {
        console.log(API_URL);
        const response = await axios.get(`${API_URL}?limit=20`);
        return res.render("pages/home", { pokemonList: response.data.results});
    }catch (error){
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
})

router.get("/pokemon/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const response = await axios.get(`${API_URL}/${name}`);
        return res.render("pages/details", {pokemon: response.data, typeColors});
    }catch (error){
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

router.get("/search", async (req, res) => { 
    try {
        const { name } = req.query;
        if(!name) return res.redirect("/");
        const response = await axios.get(`${API_URL}/${name.toLowerCase()}`);
        return res.render("pages/details", {pokemon: response.data, typeColors});
    }catch (error){
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }});
    
    module.exports = router; 


