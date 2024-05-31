

// validation form login
const inputUsername = document.querySelector(".input-login-username");
const inputPassword = document.querySelector(".input-login-password");
const btnLogin = document.querySelector(".login__signInButton");

// validation form login

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputUsername.value === "" || inputPassword.value === "") {
    alert("vui lòng không để trống");
  } else {
    const user = JSON.parse(localStorage.getItem(inputUsername.value));
    if (!user) {
      alert("Email hoặc Password không chính xác");
    } else if (
      user.username === inputUsername.value &&
      user.password === inputPassword.value
    ) {
      alert("Đăng Nhập Thành Công");
      window.location.href = "index.html";
    } else {
      alert("Đăng Nhập Thất Bại");
    }
  }
});

// import { initializeApp } from "https://www.gstatic.com/firebasejs/8.2.9/firebase/app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/8.2.9/firebase/analytics.js";
// // import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/8.2.9/firebase/auth.js";
// // import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/8.2.9/firebase/auth.js";
// import { getAuth, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/8.2.9/firebase/auth.js";
// import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/8.2.9/firebase/auth.js";


// const firebaseConfig = {
//   apiKey: "AIzaSyBo2SIk7ChnSsqTGd5iwawEfDwTz6cVytg",
//   authDomain: "kltn-5595d.firebaseapp.com",
//   databaseURL: "https://kltn-5595d-default-rtdb.firebaseio.com",
//   projectId: "kltn-5595d",
//   storageBucket: "kltn-5595d.appspot.com",
//   messagingSenderId: "456873223239",
//   appId: "1:456873223239:web:b5cd0870a3f2d3d0017d62",
//   measurementId: "G-W6BV1WJPP2"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });