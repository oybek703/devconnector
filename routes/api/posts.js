const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Posts routes');
});

module.exports = router;