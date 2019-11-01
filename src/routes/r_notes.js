'use strict'
const express = require('express'),
      router = express.Router(),
      Note = require('../models/Note');

router
    .get('/', async (req, res) => {
       const notes = await Note.find({}).sort({date: 'desc'});
       res.render('notes/all-notes',{notes});
    })
    .get('/add', (req, res) => {
        res.render('notes/new-note');
    })
    .post('/new-note', async (req, res) => {
       const {title, description} = req.body;
       const errors = [];
       if(!title) {
           errors.push({text: 'Please Write a Title'});
       }
       if (!description) {
        errors.push({text: 'Please Write a Description'});
       }
       if (errors.length > 0) {
           res.render('notes/new-note',{
            errors,
            title,
            description
           });
       } else {
            const newNote = new Note({title, description});
            await newNote.save();
            req.flash('success_msg', 'Note add Successfully');
            res.redirect('/notes');
       }
    })
    .get('/edit/:id', async (req, res) => {
        const note = await Note.findById(req.params.id);

        res.render('notes/edit-note.hbs', {note});
    })
    .put('/edit-note/:id', async (req, res) => {
        const {title, description} = req.body;
        await Note.findByIdAndUpdate(req.params.id, {title, description});
        req.flash('success_msg', 'Note Updated Successfully');
        res.redirect('/notes');
    })
    .delete('/delete/:id', async (req, res) => {
        await Note.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Note Delete Successfully');
        res.redirect('/notes');
    });
module.exports = router;