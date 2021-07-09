function myFunction() {
  var person = prompt("Please enter your name", "Dear User");
  if (person != null) {
      localStorage.setItem('name', person);
    document.getElementById("demo").innerHTML = person;
  }
}

function getSubject(d)
{
    localStorage.setItem("subject", d.getAttribute("data-name"));
}

function getDifficulty(d)
{
    localStorage.setItem("difficulty", d.getAttribute("data-name"));
}

function getPage(){
    window.location.href = "pages/"+localStorage.getItem('subject')+"/"+localStorage.getItem('difficulty')+"/index.html";
}

document.onreadystatechange = function() {
    setTimeout(function (){
        if (document.readyState !== "complete") {
            document.querySelector("body").style.visibility = "hidden";
            document.querySelector("#loading").style.visibility = "visible";
        } else {
            document.querySelector("#loading").style.display = "none";
            document.querySelector("body").style.visibility = "visible";
        }
    }, 3000);
};

