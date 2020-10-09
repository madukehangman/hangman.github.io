$(document).ready(function(){
    var firebaseConfig = {
    apiKey: "AIzaSyAcD_KArI4Mik1SIycQaS3BkNBwNkBCGus",
    authDomain: "numgametest.firebaseapp.com",
    databaseURL: "https://numgametest.firebaseio.com",
    projectId: "numgametest",
    storageBucket: "numgametest.appspot.com",
    messagingSenderId: "77507396053",
    appId: "1:77507396053:web:9255b99f5e487625807d5c",
    measurementId: "G-QK8PJB40P3"
  };

    firebase.initializeApp(firebaseConfig);
    let $gameDB = firebase.database().ref("games");

    class LobbyGame{
      constructor(gameJSON){
        this.gameJSON = gameJSON;
        this.updateFromJSON(this.gameJSON);
        this.gameJSON = this.toJSON();
        this.currDB = firebase.database().ref("games/" + this.gameJSON.gameid);
        this.currDB.set(this.gameJSON);
      }

      updateFromJSON(gameJSON){
        this.created = gameJSON.created || new Date().toLocaleString();
        this.title = gameJSON.title || `New Game ${this.created}`;
        this.gameid = gameJSON.gameid || `Game-${Math.floor(Math.random()*1000000000)}`;
        this.maxplayers = gameJSON.maxplayers || 4;
        this.players = gameJSON.players || {};
        this.status = gameJSON.status || `Waiting ${Object.keys(this.players).length}/${this.maxplayers}`;
      }
      toJSON(){
        let gameObj = {};
        gameObj.created = this.created;
        gameObj.gameid = this.gameid;
        gameObj.title = this.title;
        gameObj.maxplayers = this.maxplayers;
        gameObj.players = this.players;
        gameObj.status = this.status;
        return gameObj;
      }

      updateDB(){
        let data = this.toJSON();
        this.currDB.set(this.gameJSON);
      }

      addPlayer(){
        let id = localStorage.getItem("uuid");
        if(!id){
          let id = Date.now();
          localStorage.setItem("uuid", id);
          let name = $("#name").val();
          this.players[id] = {
            "name" : name,
            "id"   : id
          }
          this.updateDB();
        }
        else{
          alert(`you have already joined: ${id}`);
        }
      }
      removePlayer(){
        let id = localStorage.getItem("uuid");
        if(id){
          delete this.players[id];
          localStorage.removeItem("uuid");
          this.updateDB();
        }
        else{
          alert("You have not joined");
        }
      }
    }

    let aGame = new LobbyGame({});
    let players = firebase.database().ref("games/" + aGame.gameid + "/players");
    
    players.on("child_added", (snapshot)=>{
      console.log("child added" + snapshot.val().name);
    });
    
    players.on("child_removed", (snapshot)=>{
      console.log("child removed" + snapshot.val().name);
    });

    $("#join").on("click", ()=>{
      aGame.addPlayer();
    });

    $("#leave").on("click", ()=>{
      aGame.removePlayer();
    });
});


