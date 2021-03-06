const mongoose = require('mongoose');
const Message = mongoose.model('Message');
const Channel = mongoose.model('Channel');


module.exports = (app) => {

  app.post('/api/message/new', (req,res) => {

      const {body, channel_id } = req.body;



      Channel.findOne({"_id": channel_id}, (err,channel) => {
        if(err){
          res.send(400,err.msg);
        }

        let newMessage = new Message({
          body: body,
          author: req.user._id,
          channel: channel._id
        });

        newMessage.save( (err,newMessage) => {
          if(err){
            ("error saving message", err);
            res.send(400, err.msg);
          } else{

            let offset = new Date(newMessage.timestamp) - (newMessage.time_zone*60000);

                let local_time = new Date(offset);



            res.send(newMessage);
          }

        });



      });

    });


  app.get('/api/messages/channel_id', (req,res) => {




    const {channel_id} = req.query;


    Message.find({channel: channel_id}, (err,docs) => {
      if(err){
        res.send(400, err.msg);

      } else{

        res.send(docs);
      }


    });



  });




}; 
