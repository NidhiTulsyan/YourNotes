const express = require("express");
const Notes = require("../models/notes");
const decodeToken = require("../middleware/decodeToken");
const { body, validationResult } = require("express-validator");

const route = express.Router();

// ROUTE:1=> to fetch all notes from a particular user with that auth token
route.get("/fetchnotes", decodeToken, async (req, res) => {
  try {
    const note = await Notes.find({ user: req.user.id });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

// ROUTE:2=> to add notes of a logged in user with that auth token
route.post(
  "/addnotes",
  decodeToken,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body(
      "description",
      "enter a valid description of min 5 digits long"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tags } = req.body;
      const note = await Notes({
        title,
        description,
        tags,
        user: req.user.id,
      });
      await note
        .save()
        .then(() => {
          res.status(200).json(note);
        })
        .catch((err) => {
          res.status(400).json({ message: "some error ocuured", error: error });
        });
    } catch (error) {
      res.status(500).json({ error: "internal server error" });
    }
  }
);

route.put("/updatenotes/:id", decodeToken, async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(400).json({ error: "not found" });
    }
    if (note.user.toString() !== req.user.id) {
      res.status(400).json({ error: "not allowed to update" });
    }

    const updatedNotes = await Notes.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedNotes);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

route.delete("/deletenotes/:id", decodeToken, async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(400).json({ error: "not found" });
    }
    if (note.user.toString() !== req.user.id) {
      res.status(400).json({ error: "not allowed to update" });
    }

    const updatedNotes = await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "success!..deleted" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = route;
