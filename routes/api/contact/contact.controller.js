const Contact = require('../../../models/contact')

/* 
    GET /api/user/list
*/

exports.findAll = async (req, res) => { 
    console.log(req.query.page);
    let skip = req.query.page*10;  
    let totalRecords = await Contact.find({status:true}).count().exec();
    Contact.find({status:true}).limit(10).skip(skip).exec()
    .then(
        contacts=> {
            res.json({contacts,totalRecords})
        }
    )

}

exports.create = (req, res) => {  
    
    // create a new user if does not exist
    const create = (contact) => {
        if(contact) {
            throw new Error('username exists')
        } else {
            Contact.create(req.body)
            res.status(200).json({message:'Contact created Successfully'})
        }
    }

    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    Contact.findOneByEmail(req.body.email)
    .then(create)
    .catch(onError)
}

exports.findOne = (req, res) => {
   console.log(req.params)
    Contact.find({_id:req.params.id}).exec()
    .then(
        contacts=> {
            res.json(contacts[0])
        }
    )

}

exports.update = (req, res) => {
    // Contact.find({}).exec()
    // .then(
    //     contacts=> {
    //         res.json({contacts})
    //     }
    // )

    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Contact content can not be empty"
        });
    }

    // Find contact and update it with the request body
    Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "Contact not found with id " + req.params.id
            });
        }
        res.send(contact);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "contact not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    });
}

exports.delete = (req, res) => {
    // Contact.find({}).exec()
    // .then(
    //     contacts=> {
    //         res.json({contacts})
    //     }
    // )

    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Contact content can not be empty"
        });
    }

    // Find contact and update it with the request body
    Contact.findByIdAndUpdate(req.params.id, { status:false }, {new: true})
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "Contact not found with id " + req.params.id
            });
        }
        res.send({message:'Contact Deleted Successfully'});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "contact not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    });
}