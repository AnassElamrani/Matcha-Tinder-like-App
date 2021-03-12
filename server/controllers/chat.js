const chat = require('../models/chat');
const { response } = require('express');


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

    ///////// we consider that borad is Username & Profile Picture && email
    
    var boards = []
    for(i = 0; i < peopleIds.length; i++)
    {
        await chat.peopleBoard(peopleIds[i]).then((hadik) => { 
            // console.log('hadik', hadik[0]);
            boards.push(hadik[0][0])
        })
    }
    res.json({boards: boards});
    // console.log('boards', boards);
}

exports.getUserInfos = async (req, res) => {
    var userId = req.body.userId;
    await chat.getUserInfos(userId).then((hadik) => {
        res.json({myInfos: hadik[0][0]});
    })
}

exports.saveMessage = async (req, res) => {
    if(req.body.from && req.body.to, req.body.content)
    {
        var from = req.body.from;
        var to = req.body.to;
        var content = req.body.content;
        await chat.saveMessage(from, to, content).then((hadik) => {
            if(hadik)
            {
                if(hadik[0].affectedRows == 1)
                    res.json({response: true});
            }
        })
    }else {
        res.json({response:false})
    }
}

exports.getConversation = async (req, res) => {
    if(req.body.user1 && req.body.user2)
    {
        
        var user1 = req.body.user1;
        var user2 = req.body.user2;
        await chat.getConversation(user1, user2).then((hadik) => {
            if(hadik[0].length != 0)
            {
                // console.log('hadik.length', hadik[0].length);
                // console.log('hna', hadik[0]);
                res.json({response: hadik[0]});
                
            } else{
                // say hello ! if the conversation is empty.
                console.log('EmptyHadik');
                res.json({response: ''});
            }
        })
    } else {
        res.json({response: false})
    }
}