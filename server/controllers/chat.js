const chat = require('../models/chat');


exports.people = async (req, res) => {
    
    // Getting the Id of people Who i can chat with (peopleIds) : 

    var userId = req.body.userId;
    var peopleIds = [];
    var tmp = [];
    await chat.peopleIds(userId).then((response) => {
        tmp = response[0]
        // res.json({response : tmp})
    })
    peopleIds = tmp.map((el => {
        return (el.user1 == userId) ? el.user2 : el.user1;
    }))
    console.log('pIds', peopleIds);

    ///////// we consider that borad is Username & Profile Picture 
    
    var boards = []
    for(i = 0; i < peopleIds.length; i++)
    {
        await chat.peopleBoard(peopleIds[i]).then((hadik) => { 
            // console.log('hadik', hadik[0]);
            boards.push(hadik[0][0])
        })
    }
    res.json({boards: boards});
    console.log('boards', boards);

}