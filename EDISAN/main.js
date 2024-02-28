function loadData(){
$.ajax({
    url: "categories.php"
}).done(function(data){
console.log(data);

let result = JSON.parse(data);

var template = document.querySelector("#categoryRowTemplate");
var parent = document.querySelector("#tableBody");
parent.innerHTML = "";

result.forEach(item => {
let clone = template.content.cloneNode(true);
clone.querySelector("tr td.tdID").innerHTML = item.category_id;
clone.querySelector("tr td.tdName").innerHTML = item.category_name;
parent.appendChild(clone);
});
});
}

loadData();

$("#btnSaveCategory").click(function(){
var categoryName = document.querySelector("#categoryName").value;
if(categoryName.length > 0){
    $.ajax({
        url:  "categories.create.php",
        type: "GET",
        data: {
            name: categoryName
        }
    }).done(function(data){
        let result = JSON.parse(data);
        if(result.res == "success"){
            alert("Successfully Added")
            window.location.reload();
            //  $("#exampleModal").modal("toggle"); 
            //  document.querySelector("form").reset();

            
        }
    })
}
});
