const { Router } = require('express');
const Swimmer = require('../models/Swimmer');
const router = Router();

router.get('/', async (req, res) => {
    const swimmers = await Swimmer.find({});
    res.send(swimmers);
});

router.post('/update-result', async (req, res) => {
    const swimmer = await Swimmer.findById(req.body.swimmer_id);
    swimmer.result += Number(req.body.result);
    await swimmer.save();
    res.redirect('http://localhost:3000');
});

router.post('/add-swimmer', async (req, res) => {
    const swimmer = new Swimmer({
        name: req.body.name,
        result: 0,
    });

    await swimmer.save();
    res.redirect('http://localhost:3000');
});

module.exports = router;