const mongoose = require('mongoose');
const Message = mongoose.model('Message');
const Channel = mongoose.model('Channel');


module.exports = (app) => {

  app.post('/api/message/new', (req,res) => {

      const {body, channel_id } = req.body;

      let channel_obj_id;
      Channel.findOne({"_id": channel_id}, (err,channel) => {
        if(err){
          res.send(400,err.msg);
        } else{
          channel_obj_id = channel._id;
        }

      });

      let newMessage = new Message({
        body: body,
        author: req.user._id,
        channel: channel_obj_id
      });

      newMessage.save( (err,newMessage) => {
        if(err){
          console.log("error saving message", err);
          res.send(400, err.msg);
        } else{
          console.log("message saved successfully")
          res.send(newMessage);
        }

      });

  });


  app.get('/api/messages/room_id', (req,res) => {
    console.log("/api/messages/room_id route hit")


    // room_id 5adfbef8db2f763976c5bea
    const {room_id} = req.query;

    Message.find({}, (err,docs) => {
      console.log(docs);


    });



  });


}; //end of function
