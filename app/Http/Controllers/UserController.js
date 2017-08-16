'use strict'

const User = use("App/Model/User")
const Hash = use("Hash")

class UserController {

  * index (request, response) {

  }

  * add (request, response) {
    if (!request.authUser.admin) return respons.json({ error: "Unauthorized." });
    const input = request.only("passcode", "name")
    input.password = input.passcode
    const user = yield User.create(input)

    response.json(user)
  }

  * create (request, response) {
    const input = request.only("password", "name")
    if (request.authUser.admin) input.passcode = input.password;
    input.passcode = input.password
    const user = yield User.create(input)

    response.json(user)
  }

  * login (request, response) {
    const input = request.only('name', 'password')
    try {
      const user = yield User.findBy('name', input.name)
      if (!user) throw new Error("Wrong user name.")

      const verify = yield Hash.verify(input.password, user.password)
      if (!verify) throw new Error("Wrong password!")

      user.access_token = yield request.auth.generate(user)
      response.json(user)
    } catch (e) {
      response.status(401).json({ error: e.message })
    }
  }

  * loginAdmin (request, response) {
    const input = request.only('username', 'password')
    try {
      const admin = yield User.findBy('name', input.username)
      if (!admin) throw new Error("Invalid credentials.")

      const verify = yield Hash.verify(input.password, admin.password)
      if (!verify) throw new Error("Invalid credentials.")

      admin.admin_token = yield request.auth.generate(admin)
      response.json(admin)
    } catch (e) {
      response.status(403).json({ error: e.message })
    }
  }

  * show (request, response) {
    console.log("Logging into toolkit for user: ", request.authUser)
    return response.json(request.authUser)
  }

  * schools (request, response) {
    let schools = yield User.query().where('admin', null).fetch();
    return response.json(schools)
  }

  * update (request, response) {
    //
  }

  * destroy (request, response) {
    //
  }

}

module.exports = UserController
