class User {
    constructor(
      id,
      email,
      password
    ) {
      this.id = id;
      this.email = email;
      this.password = password;
    }
  }
  
  module.exports = User; //import class into other files.
  