const { Router } = require('express');
const Swimmer = require('../models/Swimmer');
const router = Router();

router.get('/', async (req, res) => {
    const swimmers = await Swimmer.find({}).sort({'result': -1});
    res.send(swimmers);
});

router.post('/update-result', async (req, res) => {
    const swimmers = await Swimmer.find({});

    let currSwimmer;
    for (let i = swimmers.length - 1; i >= 0; i--) {
        if (!currSwimmer) {
            if (swimmers[i]._id == String(req.body.swimmer_id)) {
                currSwimmer = swimmers[i];
                currSwimmer.result += Number(req.body.result);
            } else {
                continue;
            }
        }

        if (currSwimmer.result > swimmers[i].result) {
            currSwimmer.position--;
            swimmers[i].position++;
        }
    }

    await swimmers.forEach(swimmer => swimmer.save());
    res.redirect('http://localhost:3000');
});

router.post('/add-swimmer', async (req, res) => {
    const swimmer = new Swimmer({
        name: req.body.name,
        result: 0,
        position: req.body.position,
    });

    await swimmer.save();
    res.redirect('http://localhost:3000');
});

module.exports = router;