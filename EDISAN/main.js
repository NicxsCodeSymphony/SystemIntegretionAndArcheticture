$.ajax({
    url: "categories.php"
}).done(function(data){
    console.log(data);
    // console.log(data[0].category_name);
    let result = JSON.parse(data);
    console.log(result[1].category_name)

    var template = document.querySelector("#categoryRowTemplate");
    var parent = document.querySelector("#tableBody")

    result.forEach(item => {
        let clone = template.content.cloneNode(true);
        clone.querySelector("tr td.tdID").innerHTML = item.category_id;
        clone.querySelector("tr td.tdName").innerHTML = item.category_name;
        clone.querySelector("tr td.tdDate").innerHTML = item.date_created;
        parent.appendChild(clone)
    })
});