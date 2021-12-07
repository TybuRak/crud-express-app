var express = require('express');
const DbService = require("../services/DbService");
const User = require("../models/User");
var router = express.Router();


router.get('/delete/:id', async function(req, res, next) {
  const id = req.params.id;
  await DbService.instance.deleteByIdentifier(id);
  res.redirect('/');
});

router.post('/create/', async function(req, res, next) {
  const prevUser = await DbService.instance.getByIdentifier(req.body.index);
  if (prevUser) return res.status(400).send('Użytkownik z takim indeksem już istnieje')
  const user = new User(req.body);
  await user.save();
  res.redirect('/');
});

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await DbService.instance.getUsers();
  res.send(JSON.stringify(users));
});

router.post('/:id', async function(req, res, next) {
  const id = req.params.id;
  const user = await DbService.instance.getByIdentifier(id);
  if (!user) return res.status(404).send("Nie znaleziono użytkownika")
  user.set(req.body);
  await user.save();
  res.redirect('/');
});

module.exports = router;
