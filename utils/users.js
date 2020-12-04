const users = []

function joinUsers(name,room,id){
  user = {
      name,
      room,
      id
  }
  users.push(user)
  return user
}

function findUser(id){
    return users.find(user=>user.id === id);
}

module.exports = {
    joinUsers,
    findUser
}