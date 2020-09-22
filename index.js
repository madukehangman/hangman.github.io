var firebaseConfig = {
    apiKey: "AIzaSyBq2jUcFobTgICnoqzsg-oOZfW8Y29Bi70",
    authDomain: "testloginmateo.firebaseapp.com",
    databaseURL: "https://testloginmateo.firebaseio.com",
    projectId: "testloginmateo",
    storageBucket: "testloginmateo.appspot.com",
    messagingSenderId: "960903154291",
    appId: "1:960903154291:web:019bafb139c63ce024f806",
    measurementId: "G-S5D2DPF9RY"
  };
  // Initialize Firebase

firebase.initializeApp(firebaseConfig);

$("#loginemail").click(()=>{
  firebase.auth().signInWithEmailAndPassword($("#email").val(), $("#password").val()).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
});
$("#register").click(()=>{
  let pwd1 = $("#password").val();
  let pwd2 = $("#password2").val();
  if (pwd1 == pwd2){
    firebase.auth().createUserWithEmailAndPassword($("#email").val(), $("#password").val()).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
  } else {
    $("#status").text("Passwords do not match");
  }
});
$("#password2").keyup(()=>{
  let pwd1 = $("#password").val();
  let pwd2 = $("#password2").val();
  if (pwd1 == pwd2){
    $("#status").css("color", "green");
    $("#status").text("passwords match");
  }
  else{
    $("#status").css("color", "red");
    $("#status").text("passwords do not match");
  }
});

$("#reset").click(()=>{
  firebase.auth().sendPasswordResetEmail($("#email").val());
});

$("#show1").change(()=>{
  if($("#show1").is(":checked")){
    $("#password").attr("type", "");
  }
  else{
    $("#password").attr("type", "password");
  }
});

$("#show2").change(()=>{
  if($("#show2").is(":checked")){
    $("#password2").attr("type", "");
  }
  else{
    $("#password2").attr("type", "password");
  }
});



