

const User = require('../models/userModel')


/**
 * Get All Users
 * @param {object} req
 * @param {object} res
 * @returns {object} user
 */

const getAllUsers = async (req, res) =>{
  try{
    
    const user = await User.find()
     
    if (user.length === 0) {
     
      return res.status(204).json({message:'success', data : user}) 
    }

    res.status(200).json({message:'success', data: user})

  }catch(e){
  console.error('message :' , e );
  res.status(500).json({
    message: 'server error',
    data: null
  })
  }


}


/**
 * add User
 * @param {object} req
 * @param {object} res
*/
const addUser = async(req, res) => {
try{
  const { name , email, password} = req.body

  if(!name ) {
    return res.status(400).json({ status : false , message : 'Please Provide Your name '})
  }


  const user = new User({name , email, password} ) 

  await user.save();

  res.status(201).json({ status : true , message :"success" });

}catch(e){
  console.error('message :' , e );
  res.status(500).json({
    success : false,
    message: 'server error'
  })
  }

}


module.exports = {
  getAllUsers,
  addUser
}