const express = require('express');
const router = express.Router();

router.get('/manga/:id', (req, res) => {
    const mangaID = req.params.id;

    const mockMangaData = {
        title: "ололололол",
        archiveID: "spdoos-manga-324",
        pages: [

        ]
    };
    res.json(mockMangaData);
});

module.exports = router;