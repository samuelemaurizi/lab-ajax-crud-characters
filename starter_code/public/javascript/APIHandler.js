class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
    // Create Axios new instance
    this.query = axios.create({
      baseURL: this.BASE_URL
    });
  }

  // FULL LIST
  getFullList() {
    return this.query
      .get("/characters")
      .then(response => {
        console.log(`GET LIST OF ${response.data.length} CHARACTERS!`);
        return response.data;
      })
      .catch(err => {
        throw err;
      });
  }

  // GET ONE
  getOneRegister(characterId) {
    return this.query
      .get("/characters/" + characterId)
      .then(response => {
        console.log(response.data);
        $("input[name=character-id]").val("");
        $("#fetch-one").css("background-color", "green");
        return response.data;
      })
      .catch(err => {
        $("#fetch-one").css("background-color", "red");
        throw err;
      });
  }

  // POST ONE
  createOneRegister(newChar) {
    return this.query
      .post("/characters/", newChar)
      .then(response => {
        console.log(response.data);
        $("#new-character-form :input").val("");
        $("#send-data").css("background-color", "green");
      })
      .catch(err => {
        $("#send-data").css("background-color", "red");
        throw err;
      });
  }

  // PATCH ONE
  updateOneRegister(charId, updatedChar) {
    this.query
      .patch(`/characters/${charId}`, updatedChar)
      .then(response => {
        console.log("CHARACTER UPDATE", response.data);
        $("#edit-character-form :input").val();
        $("#update-data").css("background-color", "green");
      })
      .catch(err => {
        $("#update-data").css("background-color", "red");
        console.log(err.response);
      });
  }

  // DELTE ONE BY ID
  deleteOneRegister(charId) {
    return this.query
      .delete("/characters/" + charId)
      .then(response => {
        console.log("CHARACTER DELETED! ID: ", charId);
        $("input[name=character-id-delete]").val("");
        $("#delete-one").css("background-color", "green");
        return response.data;
      })
      .catch(err => {
        $("#delete-one").css("background-color", "red");
        throw err;
      });
  }
}

// Run the following code on the terminal to make our API start working
// $ json-server --watch api/db.json --port 8000
