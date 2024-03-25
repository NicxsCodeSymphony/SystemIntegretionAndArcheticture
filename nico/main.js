$(document).ready(function() {

    $(".youtube").html('<iframe width="100%" height="300" src="https://www.youtube.com/embed/1sVG1a0ERYI?autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    $(".status").append('<div class="video-container"><video width="100%" controls autoplay><source src="nico.mp4" type="video/mp4">Your browser does not support the video tag.</video></div>');
    let productCounter = 0;
    let categoryCounter = 0;

    $.ajax({
        url: "fetchProduct.php",
    }).done(function(data){
        // console.log(data)

        let res = JSON.parse(data)

        console.log(res)

        var template = document.querySelector("#productTemplate");
        var parent = document.querySelector("#listContainer");
        parent.innerHTML = "";

        res.forEach(item => {
            let clone = template.content.cloneNode(true);
            clone.querySelector("#productID").value = item.product_id;
            clone.querySelector("img").src = "components/images/" + item.photo;
            clone.querySelector(".productName").innerHTML = `Product Name: <span class="displaySpan">${item.name}</span>`; 
            clone.querySelector(".productCategory").innerHTML = `Category Name: <span class="displaySpan">${item.category_name}</span>`; 



            clone.querySelector(".productQuantity").innerHTML = `Quantity: <span class="displaySpan">${item.quantity}</span>`; 


            clone.querySelector(".editProduct").setAttribute("data-id", item.product_id);
            clone.querySelector(".editProduct").setAttribute("data-photo", item.photo);
            clone.querySelector(".editProduct").setAttribute("data-name", item.name);
            clone.querySelector(".editProduct").setAttribute("data-category", item.category_id);
            clone.querySelector(".editProduct").setAttribute("data-quantity", item.quantity);

            clone.querySelector(".btnDeleteProduct").setAttribute("data-id", item.product_id);

            parent.appendChild(clone);
            productCounter++;
        })

        $(".heading").html(`
    <div><span>Product Counter</span><h1>${productCounter}</h1></div>
    <div><span>Welcome!</span><h1>John Nico Edisan</h1></div>
    <div><span>Category Counter</span><h1>${categoryCounter}</h1></div>
`);
    })

    function fetchCategories() {
        $.ajax({
            url: "fetchCategory.php",
        }).done(function(data){
            let categories = JSON.parse(data);
            categoryCounter = categories.length;
            $(".heading").html(`
                <div><span>Product Counter</span><h1>${productCounter}</h1></div>
                <div><span>Welcome!</span><h1>John Nico Edisan</h1></div>
                <div><span>Category Counter</span><h1>${categoryCounter}</h1></div>
            `);
        });
    }

    fetchCategories();



    $("#btnSaveProduct").click(function () {
        var formData = new FormData($("#productsForm")[0])

        $.ajax({
            url: "../createProduct.php",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
        }).done(function(data){
            let result = JSON.parse(data)
            if(result.res === "success"){
                location.href = "../index.html"
            }
        })
    });

    $("#btnSaveCategory").click(function() {
        var categoryName = $("#name").val()
    
        $.ajax({
            url: "../createCategory.php",
            type: "POST",
            data: {
                name: categoryName
            }
        }).done(function(data){
            let result = JSON.parse(data)
            if(result.res === "success"){
                alert("CATEGORY SUCCESSFULLY ADDED")
                 window.history.back();
            } else {
                console.error("Insert failed:", result.message);
            }
        }).fail(function(xhr, status, error) {
            console.error("Error:", error);
        });
    })
    

    $(document).on("click", ".editProduct", function () {
        let productID = $(this).closest(".templateList").find("#productID").val();
        let productName = $(this).closest(".templateList").find(".productName").text();
        let productCategory = $(this).closest(".templateList").find(".productCategory").text();
        let productQuantity = $(this).closest(".templateList").find(".productQuantity").text();
        var currentPictureUrl = $(this).closest(".templateList").find(".img").attr("src");
    
        // Remove default text from inputs
        productName = productName.replace("Product Name: ", "");
        productCategory = productCategory.replace("Category Name: ", "");
        productQuantity = productQuantity.replace("Quantity: ", "");
    
        $("#updateProductId").val(productID);
        $("#updateProductName").val(productName);
        $("#updateProductCategory").val(productCategory);
        $("#updateProductQuantity").val(productQuantity);
        $("#currentPicture").attr("src", currentPictureUrl);
    
        populateCategoryNamesInUpdateModal(productCategory);
    
        $("#updateModal").modal("show");
    });
    
    

    function populateCategoryNamesInUpdateModal(selectedCategoryId) {
        $.ajax({
          url: "fetchCategory.php",
          method: "GET",
          success: function(response) {
            var categories = JSON.parse(response);
            var selectElement = $("#updateProductCategory");
            selectElement.empty();
      
            categories.forEach(function(category) {
              var option = $("<option></option>")
                .attr("value", category.category_id)
                .text(category.category_name);
              if (category.category_id == selectedCategoryId) {
                option.attr("selected", true);
              }
              selectElement.append(option);
            });
          },
          error: function(xhr, status, error) {
            console.error("Error fetching category names:", error);
          }
        });
      }
      


    function updateCategory(categoryId, photo, productName, category_id, quantity) {
        $.ajax({
          url: "updateProduct.php",
          type: "POST", // Changed to POST
          data: {
            id: categoryId,
            name: productName,
            photo: photo,
            category_id: category_id,
            quantity: quantity
          }
        }).done(function (data) {
          let result = JSON.parse(data);
          if (result.res == "success") {
            alert("Category updated successfully");
            window.location.reload();
          } else {
            alert("Failed to update category");
          }
        });
        
      }

      $("#btnUpdateProduct").click(function() {
        var productId = $("#updateProductId").val();
        var productName = $("#updateProductName").val();
        var productCategory = $("#updateProductCategory").val();
        var productQuantity = $("#updateProductQuantity").val();
      
        var formData = new FormData();
        var picture = $("#updatePicture")[0].files[0];

      
        // Append form data
        formData.append('id', productId);
        formData.append('name', productName);
        formData.append('category', productCategory);
        formData.append('quantity', productQuantity);
      

        formData.append('photo', picture);
      
        if (productName.length > 0 && productCategory.length > 0 && productQuantity.length > 0) {
            $.ajax({
                url: "updateProduct.php",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
            }).done(function(data) {
                let result = JSON.parse(data);
                if (result.res == "success") {
                    location.reload();
                }
            }).fail(function(xhr, status, error) {
                console.error("An error occurred while updating product:", error);
                alert("An error occurred while updating product. Please try again later.");
            });
        }
      });
      
      $()

      $(document).on("click", ".btnDeleteProduct", function () {
        let productID = $(this).closest(".templateList").find("#productID").val();
    
        // Apply the "boom" effect to the closest .templateList element
        $(this).closest(".templateList").addClass("boom");
    
        $.ajax({
            url: "deleteProduct.php",
            type: "POST",
            data: {
                id: productID
            }
        }).done(function (data) {
            let result = JSON.parse(data);
            if (result.res == "success") {
                // Remove the element after the animation completes
                setTimeout(() => {
                    $(this).closest(".templateList").remove();
                    // Refresh the page after 5 seconds
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }, 500);
            } else {
                alert("Failed to delete product");
            }
        });
    });
    

    // document.getElementById("productId").value = getQueryStringValue("id");

    $(document).on("click", ".btnDeleteCategory", function () {
        let productID = $(this).data("id");
        $.ajax({
            url: "deleteProduct.php",
            type: "POST",
            data: {
                id: productID
            }
        }).done(function (data) {
            let result = JSON.parse(data);
            if (result.res == "success") {
                alert("Product deleted successfully");
                window.location.reload();
            } else {
                alert("Failed to delete product");
            }
        });
    });

    $("#addProduct").click(function () {
        $(".line").show();
        setTimeout(function() {
            window.location.href = "components/createForm.html"; 
        }, 2500); 
    });

    $("#addCategory").click(function () {
        $(".line").show();
        setTimeout(function() {
            window.location.href = "components/createCategory.html";
        }, 2500); 
    });
});
