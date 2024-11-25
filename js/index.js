var bookmarkName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var editBtn = document.getElementById("editBtn");
var tBody = document.getElementById("tBody");
var alertBox = document.getElementById("alertBox");

var indexBox;

// Render Data To Page
var siteList = [];
if (localStorage.getItem("sites")) {
  siteList = JSON.parse(localStorage.getItem("sites"));
  showData();
}

// Create Data and Push it To Array
function addSite() {
  if (Validation(bookmarkName) && Validation(siteUrl)) {
    var site = {
      siteName: bookmarkName.value,
      siteUrl: /^(https?:\/\/)/.test(siteUrl.value)
        ? siteUrl.value
        : `https://${siteUrl.value}`,
    };
    siteList.push(site);
    localStorage.setItem("sites", JSON.stringify(siteList));
    showData();
    clearInputs();

  } else {
    console.log("err");
    alertBox.classList.replace("d-none" , "d-block");
  }
}
// close alert box 
document.addEventListener("click", function(e){
    if(e.target.id == "closeBtn" || e.target.id == "alertBox"){
        alertBox.classList.replace("d-block" , "d-none");
    }
})

// clear input
function clearInputs() {
  bookmarkName.value = null;
  siteUrl.value = null;
  clearValid();
}
// clear validation classes
function clearValid() {
  bookmarkName.classList.remove("is-invalid");
  bookmarkName.classList.remove("is-valid");
  siteUrl.classList.remove("is-invalid");
  siteUrl.classList.remove("is-valid");
}
// Display Date to Page
function showData() {
  var tmp = "";
  for (var i = 0; i < siteList.length; i++) {
    tmp += `
                <tr class="py-5">
                  <td>${i + 1}</td>
                  <td>${siteList[i].siteName}</td>
                  <td>
                    <button class="btn btn-outline-info px-0 py-0">
                        <a class="px-3 py-1 rounded" href="${
                          siteList[i].siteUrl
                        }" target="_blank">Visit</a>
                    </button>
                  </td>
                  <td><button class="btn btn-outline-danger py-1" onclick="delSite(${i})">Delete</button></td>
                  <td><button class="btn btn-outline-warning py-1" onclick="setDataToEdit(${i})">Edit</button></td>
                </tr>
    
            `;
  }
  tBody.innerHTML = tmp;
}

// Create new element by clicking submit button
submitBtn.addEventListener("click", function (e) {
  addSite();
});

// Delete Element
function delSite(delIndex) {
  siteList.splice(delIndex, 1);
  localStorage.setItem("sites", JSON.stringify(siteList));
  showData();
}

// Edit
function setDataToEdit(editIndex) {
  bookmarkName.value = siteList[editIndex].siteName;
  siteUrl.value = siteList[editIndex].siteUrl;
  indexBox = editIndex;
  submitBtn.classList.add("d-none");
  editBtn.classList.remove("d-none");
}

function editSite(e) {
  var site = {
    siteName: bookmarkName.value,
    siteUrl: /^(https?:\/\/)/.test(siteUrl.value)
      ? siteUrl.value
      : `https://${siteUrl.value}`,
  };
  siteList.splice(indexBox, 1, site);
  localStorage.setItem("sites", JSON.stringify(siteList));
  showData();
  submitBtn.classList.remove("d-none");
  editBtn.classList.add("d-none");
  clearInputs();
}

editBtn.addEventListener("click", function (e) {
  editSite(e);
});

// Validation
function Validation(el) {
  var regex = {
    bookmarkName: /^\w{1,8}$/,
    siteUrl:
      /^((https?\:\/\/)?(www\.)?)?[a-zA-Z0-9]{1,}(\.[a-zA-Z0-9]{2,})(\/?.{2,})?$/gm,
  };
  if (regex[el.id].test(el.value)) {
    el.classList.add("is-valid");
    el.classList.remove("is-invalid");
    return true;
  } else {
    el.classList.remove("is-valid");
    el.classList.add("is-invalid");
    return false;
  }
}

document.addEventListener("input", function (e) {
  Validation(e.target);
});