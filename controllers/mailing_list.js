//========= Configuration =============//
const express = require('express');
const ROUTER = express.Router();
const mailListObject = require('../models/mailing_list.js')

//======== Mailing List Seed Data ===========//
ROUTER.get('/Boolean/seed', (req, res) => {
    mailListObject.create([
        {
            email: '',
            confirmation: true
        }
    ], (error, data) => {
        res.redirect('/Boolean')
    })
})
//======== Mailing List ROUTES ==================//

//Mailing List Form (Index) 
ROUTER.get('/Boolean/Mailing', (req, res) => {
    mailListObject.find({}, (error, mailListNames) => {
        res.render('mailing_list.ejs', {
            allEditEmails: mailListNames
        })
    })
})
//======= Mailing list (Create) ===============//
ROUTER.post('/Boolean/Mailing', (req, res) => {
    console.log(req.body)
    if (req.body.confirmation === 'on') {
        req.body.confirmation = true
    } else {
        req.body.confirmation = false
    } 
    mailListObject.create(req.body, (error, mailListNames) => { 
        res.redirect('/Boolean/Mailing/:eml')
    }) 
})
//========== Mailing List Form (Edit) ============//
ROUTER.get('/Boolean/Mailing/:eml', (req, res) => {
    mailListObject.findOne(req.params.email, (error, mailListNames) => {
        res.render('mailing_list_edit.ejs', {
            allEditEmails: mailListNames
        })
    })
})
//========== Mailing List Form (Update) ===========//
ROUTER.put('/Boolean/Mailing/:eml', (req, res) => {
    if (req.body.confirmation === 'on') {
        req.body.confirmation = true
    } else {
        req.body.confirmation = false
    } 
    mailListObject.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedMailListName) => {
        res.redirect('/Boolean')
    })
}) 
//========== Mailing List Form (Show) =============//
ROUTER.get('/Boolean/Mailing/:eml', (req, res) => {
    mailListObject.findById(req.params.id, (error, mailListNames) => {
        res.render('mailing_list_show.ejs', {
            allEditEmails: mailListNames[req.params.email]
        })
    })
    console.log(req.body)
})
//=========== Mailing List Form (Delete) ===========//
ROUTER.delete('/Boolean/Mailing/:eml', (req, res) => {
    mailListObject.findOneAndDelete(req.params.email, (error, deletedEmailListName) => {
        res.redirect('/Boolean')
    })
    console.log(req.body)
})

module.exports = ROUTER;