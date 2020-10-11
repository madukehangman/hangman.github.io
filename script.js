$(document).ready(function(){
    alert("starting");
    var firebaseConfig = {
        apiKey: "AIzaSyDvDRcJ1tAR-ebu0QocqaG0ZXU0276vNLA",
        authDomain: "simplehangman-3bbac.firebaseapp.com",
        databaseURL: "https://simplehangman-3bbac.firebaseio.com",
        projectId: "simplehangman-3bbac",
        storageBucket: "simplehangman-3bbac.appspot.com",
        messagingSenderId: "793883931570",
        appId: "1:793883931570:web:8b7d77a1ae2f6787a9aaab"
      };
      // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    let myDatabase = firebase.database();

    $("#make_guess").hide();
    $("#label_guessed").hide();
    $("label_remaining").hide();

    $("#start").click(()=>{
      var guesses_left = 5;
      var d = new Date();
      var start = d.getTime();
      $("#remaining").text(guesses_left);
      $("#start").hide();
      $("#make_guess").show();
      $("#label_guessed").show();
      $("label_remaining").show();

      let guessed_letters = [];
      $("#remaining").text(guesses_left);
      let num_words = 187632;
      let r = Math.floor(num_words *Math.random());
      let random_num = r.toString();
      myDatabase.ref("dictionary").child(random_num).once("value", ss=>{
        let random_word = ss.val();
        let word_len = random_word.length;
        console.log(random_word);
        for(var i = 0; i < word_len; i++){
          $("#word").append(
          `<span id = "${i}" class = "large">_ </span>`
          );
        }
        $("#make_guess").click(()=>{
          if($("#guess").val().length > 1){
            alert("You can only guess a single letter at a time");
          }
          else{
            var correct = false;
            for(var i = 0; i < word_len; i++){
              if(random_word[i] == $("#guess").val()){
                correct = true;
                $(`#${i}`).text(random_word[i]);
              }
            }
            if (!correct){
               if(!guessed_letters.includes($("#guess").val())){
                 guessed_letters.push($("#guess").val());
                 guesses_left--;
               }
               else{
                 alert(`${$("#guess").val()} has already been guessed`);
               }
               $("#guessed").text(guessed_letters);
            }
            else{
              var finished = true;
              for(var i = 0; i < word_len; i++){
                if($(`#${i}`).text() != random_word[i]){
                  finished = false;
                }
              }
              if(finished){
                var e = new Date();
                var stop = e.getTime();

                var elapsed = (stop - start) /1000;
                var minutes = Math.floor((elapsed / 60));
                var seconds = elapsed - minutes * 60;

                alert(`You won! Total time = ${minutes}:${seconds}`);
                $("#word").empty();
                $("#make_guess").hide();
                $("#label_guessed").hide();
                $("#start").show();
              }
            }
            if(guesses_left == 0){
              alert(`you lose!, the word was: ${random_word}`);
              $("#word").empty();
              $("#make_guess").hide();
              $("#label_guessed").hide();
              $("#label_remaining").hide();
              $("#start").show();
            }
            $("#guess").val("");
            $("#remaining").text(guesses_left);
          }
        });
      });
    });
});



