var express = require('express');
const DbService = require("../services/DbService");
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const users = await DbService.instance.getUsers();
  res.render('users', { users });
});
router.get('/create', async function(req, res, next) {
  res.render('create', {});
});

router.get('/edit/:id', async function(req, res, next) {
  const user = await DbService.instance.getByIdentifier(req.params.id);
  res.render('edit', { user });
});

module.exports = router;
