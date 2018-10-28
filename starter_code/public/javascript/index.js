const charactersAPI = new APIHandler("http://localhost:8000");

$(document).ready(() => {
  function reset() {
    $(".characters-container").html("");
  }

  // GET ALL
  document.getElementById("fetch-all").onclick = function() {
    reset();
    charactersAPI
      .getFullList("/characters")
      .then(characters => {
        for (let i = 0; i < characters.length; i++) {
          $(".characters-container").append(
            `
            <div class="character-info">
            <div class="char-id"><strong>Id: </strong> ${
              characters[i].id
            } </div>
            <div class="name"><strong>Name: </strong> ${
              characters[i].name
            } </div>
            <div class="occupation"><strong>Occupation: </strong> ${
              characters[i].occupation
            } </div>
            <div class="cartoon"><strong>Cartoon: </strong> ${
              characters[i].cartoon ? "yes" : "no"
            } </div>
            <div class="weapon"><strong>Weapon: </strong> ${
              characters[i].weapon
            } </div>
            </div>
            `
          );
        }
      })
      .catch(err => {
        throw err;
      });
  };

  // GET ONE
  document.getElementById("fetch-one").onclick = function() {
    reset();
    let charId = $("input[name=character-id]").val();
    charactersAPI
      .getOneRegister(charId)
      .then(character => {
        $(".characters-container").append(
          `
          <div class="character-info">
            <div class="char-id"><strong>Id: </strong> ${character.id} </div>
            <div class="name"><strong>Name: </strong> ${character.name} </div>
            <div class="occupation"><strong>Occupation: </strong> ${
              character.occupation
            } </div>
            <div class="cartoon"><strong>Cartoon: </strong> ${
              character.cartoon
            } </div>
            <div class="weapon"><strong>Weapon: </strong> ${
              character.weapon
            } </div>
            </div>
          `
        );
      })
      .catch(err => {
        throw err;
      });
  };

  // DELETE
  document.getElementById("delete-one").onclick = function() {
    reset();
    let charId = $("input[name=character-id-delete]").val();
    charactersAPI
      .deleteOneRegister(charId)
      .then(character => {
        $(".characters-container").append(
          `<div class="char-id">Character with Id ${charId} has been successfully deleted</div>`
        );
      })
      .catch(err => {
        $(".characters-container").append(
          `<div class="char-id">Character with Id ${charId} not found</div>`
        );
        throw err;
      });
  };

  // POST
  document.getElementById("new-character-form").onsubmit = function(e) {
    e.preventDefault();
    reset();

    let createChar = {
      name: $("input[name=name]").val(),
      occupation: $("input[name=occupation]").val(),
      weapon: $("input[name=weapon]").val(),
      cartoon: $("input[name=cartoon]").prop("checked")
    };

    charactersAPI
      .createOneRegister(createChar)
      .then(character => {
        $(".characters-container").append(
          `
        <div class="character-info">
          <div class="name"><strong>Name: </strong> ${createChar.name} </div>
          <div class="occupation"><strong>Occupation: </strong> ${
            createChar.occupation
          } </div>
          <div class="weapon"><strong>Weapon: </strong> ${
            createChar.weapon
          } </div>
          <div class="cartoon"><strong>Cartoon: </strong> ${
            createChar.cartoon ? "Yes" : "No"
          } </div>
          </div>
        `
        );
      })
      .catch(err => {
        throw err;
      });
  };

  // PATCH
  document.getElementById("edit-character-form").onsubmit = function(e) {
    e.preventDefault();
    reset();

    let updatedChar = {
      name: $("#edit-character-form :input[name=name]").val(),
      occupation: $("#edit-character-form :input[name=occupation]").val(),
      weapon: $("#edit-character-form :input[name=weapon]").val(),
      cartoon: $("#edit-character-form :input[name=cartoon]").prop("checked")
    };

    let charId = $("#edit-character-form :input[name=chr-id]").val();

    charactersAPI.updateOneRegister(charId, updatedChar);
  };
});
