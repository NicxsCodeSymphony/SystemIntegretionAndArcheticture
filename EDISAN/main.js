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
  
    // Create an update button
    let updateButton = document.createElement("button");
    updateButton.classList.add("btn", "btn-warning", "btn-sm", "btnUpdateCategory");
    updateButton.setAttribute("data-id", item.category_id);
    updateButton.setAttribute("data-name", item.category_name);
    updateButton.textContent = "Update";
  
    // Append the update button to the row
    let tdActions = document.createElement("td");
    tdActions.appendChild(updateButton);
    clone.querySelector("tr").appendChild(tdActions);
  
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

// Update functionality
function updateCategory(categoryId, categoryName) {
    $.ajax({
      url: "categories.update.php",
      type: "POST",
      data: {
        id: categoryId,
        name: categoryName
      }
    }).done(function(data) {
        // alert(JSON.parse(data))
      let result = JSON.parse(data); 
      if (result.res == "success") {
        alert("Category updated successfully");
        window.location.reload();
      }
    });
  }
  
  // Open update modal with category data// Open update modal with category data
$(document).on("click", ".btnUpdateCategory", function() {
    let categoryId = $(this).data("id");
    let categoryName = $(this).data("name");
    $("#updateCategoryId").val(categoryId);
    $("#updateCategoryName").val(categoryName);
    $("#updateModal").modal("show");
  });
  
  // Handle update category button click
  $("#btnUpdateCategory").click(function() {
    let categoryId = $("#updateCategoryId").val();
    let categoryName = $("#updateCategoryName").val();
    if (categoryId && categoryName) {
      updateCategory(categoryId, categoryName);
    }
  });
  
  