const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Profile routes');
});

module.exports = router;