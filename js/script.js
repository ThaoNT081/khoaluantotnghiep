
function openNav() {
  document.getElementById("tabcontrol").style.width = "250px";
  
};
/*chuyen trang*/
function openroom(evt, RoomName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(RoomName).style.display = "block";
  evt.currentTarget.className += " active";
};



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo2SIk7ChnSsqTGd5iwawEfDwTz6cVytg",
  authDomain: "kltn-5595d.firebaseapp.com",
  databaseURL: "https://kltn-5595d-default-rtdb.firebaseio.com",
  projectId: "kltn-5595d",
  storageBucket: "kltn-5595d.appspot.com",
  messagingSenderId: "456873223239",
  appId: "1:456873223239:web:b5cd0870a3f2d3d0017d62",
  measurementId: "G-W6BV1WJPP2"
};
// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

//load mode 
firebase.database().ref("/dieu-khien/mode").on("value", function(snapshot) {
  var mode = snapshot.val();
  var displayMode = (mode == "1") ? "Tự động" : "Thủ công";
  document.getElementById("mode").innerHTML = displayMode;
});
// nhiet do
firebase.database().ref("/Phong_khach/nhietdo").on("value", function(snapshot) {
  var nd = snapshot.val();
  document.getElementById("nhietdo").innerHTML = nd;
  console.log(nd);
});

// do am
firebase.database().ref("/Phong_khach/doam").on("value", function(snapshot) {
  var nd = snapshot.val();
  document.getElementById("doam").innerHTML = nd;
  console.log(nd);
});

// ph
firebase.database().ref("/Phong_khach/ph").on("value", function(snapshot) {
  var nd = snapshot.val();
  document.getElementById("ph").innerHTML = nd;
  console.log(nd);
});

// light
firebase.database().ref("/Phong_khach/light").on("value", function(snapshot) {
  var nd = snapshot.val();
  document.getElementById("light").innerHTML = nd;
  console.log(nd);
});
// tds
firebase.database().ref("/Phong_khach/tds").on("value", function(snapshot) {
  var nd = snapshot.val();
  document.getElementById("tds").innerHTML = nd;
  console.log(nd);
});

// Function to update the box color
function updateBoxColor(id, value) {
  var box = document.getElementById(id);
  if (value < 15) {
    box.classList.add("red");
  } else {
    box.classList.remove("red");
  }
}
// muc-nuoc
firebase.database().ref("/Phong_khach/muc-nuoc").on("value", function(snapshot) {
  var nd = snapshot.val();
  document.getElementById("muc-nuoc").innerHTML = nd;
  console.log(nd);
  updateBoxColor("box-muc-nuoc", nd);
});

// muc-giamph
firebase.database().ref("/Phong_khach/muc-giamph").on("value", function(snapshot) {
  var nd = snapshot.val();
  document.getElementById("muc-giamph").innerHTML = nd;
  console.log(nd);
  updateBoxColor("box-muc-giamph", nd);
});

// muc-tangph
firebase.database().ref("/Phong_khach/muc-tangph").on("value", function(snapshot) {
  var nd = snapshot.val();
  document.getElementById("muc-tangph").innerHTML = nd;
  console.log(nd);
  updateBoxColor("box-muc-tangph", nd);
});

// dinh-duong
firebase.database().ref("/Phong_khach/dinh-duong").on("value", function(snapshot) {
  var nd = snapshot.val();
  document.getElementById("dinh-duong").innerHTML = nd;
  console.log(nd);
  updateBoxColor("box-dinh-duong", nd);
});


// Function to update status
const updateStatus = (snapshot, elementId, switchId) => {
  const value = snapshot.val()[elementId];
  const statusElement = document.getElementById(`statusbutton-${elementId}`);
  const switchElement = document.getElementById(`switch-${elementId}`);
  const displayValue = (value == "1") ? "ON" : "OFF";
  statusElement.innerHTML = displayValue;
  switchElement.checked = (value == "1");
};

const addEventListenerToSwitch = (elementId) => {
  document.getElementById(`switch-${elementId}`).addEventListener("change", function() {
    const statusElement = document.getElementById(`statusbutton-${elementId}`);
    if (this.checked) {
      statusElement.innerHTML = "ON";
      database.ref("/dieu-khien").update({ [elementId]: "1" });
    } else {
      statusElement.innerHTML = "OFF";
      database.ref("/dieu-khien").update({ [elementId]: "0" });
    }
  });
};

// Devices to check
const devices = ["den", "quat", "phun", "bom", "giamph", "tangph",  "bomdd"];

devices.forEach(device => {
  database.ref("/dieu-khien").on("value", function(snapshot) {
    if (snapshot.exists()) {
      updateStatus(snapshot, device);
    } else {
      console.log("No data available for", device);
    }
  });
  addEventListenerToSwitch(device);
});

firebase.database().ref('/dieu-khien').on('value', function(dieuKhienSnapshot) {
  var dieuKhienData = dieuKhienSnapshot.val();

// không được điều khiển khi mode auto
 if (dieuKhienData.mode == 1) {
        // Thêm lớp 'disabled' cho tất cả các switch
        document.querySelectorAll('.switch').forEach(function(button) {
            button.classList.add('disabled');
        });
    } else {
        // Loại bỏ lớp 'disabled' cho tất cả các switch
        document.querySelectorAll('.switch').forEach(function(button) {
            button.classList.remove('disabled');
        });
}

//đổi màu khi thiết bị lỗi
  firebase.database().ref('/Check').on('value', function(checkSnapshot) {
      
      var checkData = checkSnapshot.val();
//phun  sương
      if (dieuKhienData.phun == 1 && checkData.check_Phun == 0) {
          document.getElementById('device-phun').style.color = 'red';
      } else {
        document.getElementById('device-phun').style.color = 'black';
      }
//đèn
      if (dieuKhienData.den == 1 && checkData.check_BomNuoc == 0) {
        document.getElementById('device-den').style.color = 'red';
       } else {
      document.getElementById('device-den').style.color = 'black';
      }
// giảm ph
      if (dieuKhienData.giamph == 1 && checkData.check_GiamPh == 0) {
          document.getElementById('device-giamph').style.color = 'red';
      } else {
        document.getElementById('device-giamph').style.color = 'black';
      }
//tang ph
      if (dieuKhienData.tangph == 1 && checkData.check_TangPh == 0) {
          document.getElementById('device-tangph').style.color = 'red';
      } else {
        document.getElementById('device-tangph').style.color = 'black';
      }
//bơm dung dịch
       if (dieuKhienData.bomdd == 1 && checkData.check_BomDd == 0) {
        document.getElementById('device-bomdd').style.color = 'red';
       } else {
      document.getElementById('device-bomdd').style.color = 'black';
      }
  });
});

// chọn chế độ
function toggleMode(mode) {
  const autoButton = document.getElementById('autoButton');
  const manualButton = document.getElementById('manualButton');
  const deviceSwitches = document.querySelectorAll('#switch-den, #switch-quat, #switch-phun, #switch-bom, #switch-tangph, #switch-giamph,  #switch-bomdd');

  if (mode == 1) {
    autoButton.classList.add('active');
    manualButton.classList.remove('active');
    deviceSwitches.forEach(switchElement => {
        switchElement.disabled = true;
    });
} else if (mode == 0) {
    autoButton.classList.remove('active');
    manualButton.classList.add('active');
    deviceSwitches.forEach(switchElement => {
        switchElement.disabled = false;
    });
}
  // Ghi lại chế độ lên Firebase
  firebase.database().ref('/dieu-khien/mode').set(mode);
}
// Khởi tạo trạng thái ban đầu
firebase.database().ref('/dieu-khien/mode').on('value', (snapshot) => {
  const mode = snapshot.val();
  toggleMode(mode);
});
//khóa điều khiển
function toggleDevice(switchId, statusId) {
  const switchElement = document.getElementById(switchId);
  const statusElement = document.getElementById(statusId);
  if (switchElement.checked) {
      statusElement.innerHTML = "ON";
  } else {
      statusElement.innerHTML = "OFF";
  }
}

// nhập dữ liệu từ web 
document.getElementById('dataForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Tạo một đối tượng dữ liệu để gửi lên Firebase
  const updates = {
    
    '/dieu-khien/ddmin': document.getElementById('dd-min').value,
    '/dieu-khien/ddmax': document.getElementById('dd-max').value,
    '/dieu-khien/minph': document.getElementById('ph-min').value,
    '/dieu-khien/maxph': document.getElementById('ph-max').value,
    '/dieu-khien/mintemp': document.getElementById('temp-min').value,
    '/dieu-khien/maxtemp': document.getElementById('temp-max').value,
    '/dieu-khien/inputDate': document.getElementById('inputDate').value
  };
 
  // Gửi dữ liệu lên Firebase
  firebase.database().ref().update(updates)
      .then(() => {
          alert('Dữ liệu đã được gửi thành công!');
      })
      .catch((error) => {
          console.error('Lỗi khi gửi dữ liệu: ', error);
      });
});
window.onload = function() {
  loadData();
};
function loadData() {
  firebase.database().ref('/dieu-khien').get().then((snapshot) => {
      if (snapshot.exists()) {
          const data = snapshot.val();
          document.getElementById('dd-min').value = data.mindd || '';
          document.getElementById('dd-max').value = data.maxdd || '';
          document.getElementById('ph-min').value = data.minph || '';
          document.getElementById('ph-max').value = data.maxph || '';
          document.getElementById('temp-min').value = data.mintemp || '';
          document.getElementById('temp-max').value = data.maxtemp || '';
          document.getElementById('inputDate').value = data.inputDate || '';
          calculateDays();

      } else {
          console.log('No data available');
      }
  }).catch((error) => {
      console.error('Error getting data: ', error);
  });
}

// tính ngày trôi qua
function calculateDays() {
  const inputDate = document.getElementById('inputDate').value;
  if (inputDate) {
      const currentDate = new Date();
      const enteredDate = new Date(inputDate);
      const timeDifference = currentDate - enteredDate;
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

      document.getElementById('result').innerText = `Số ngày trồng: ${daysDifference}`;
  } else {
      document.getElementById('result').innerText = '';
  }
}

// Check device condition
const updateCondition = (elementId, value) => {
  const displayValue = (value == "1") ? "Đang hoạt động" : "Không hoạt động";
  document.getElementById(elementId).innerHTML = displayValue;
};

database.ref("/Check/check_BomDd").on("value", function(snapshot) {
  updateCondition("check_BomDd", snapshot.val());
});

database.ref("/dieu-khien/bom").on("value", function(snapshot) {
  updateCondition("check_BomNuoc", snapshot.val());
});

database.ref("/Check/check_GiamPh").on("value", function(snapshot) {
  updateCondition("check_GiamPh", snapshot.val());
});

database.ref("/Check/check_TangPh").on("value", function(snapshot) {
  updateCondition("check_TangPh", snapshot.val());
});

database.ref("/Check/check_Phun").on("value", function(snapshot) {
  updateCondition("check_Phun", snapshot.val());
});

database.ref("Check/check_BomNuoc").on("value", function(snapshot) {
  updateCondition("check_Den", snapshot.val());
});

database.ref("/dieu-khien/quat").on("value", function(snapshot) {
  updateCondition("check_quat", snapshot.val());
});

// database.ref("/dieu-khien/che_nang").on("value", function(snapshot) {
//   updateCondition("check_Che", snapshot.val());
// });