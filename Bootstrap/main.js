function $(id){
    return document.querySelector(id)
}

// const container = $('.container')
// $('.card-title').innerHTML = 'PRODUCTION'

// var parent = $("body")
// var newElement = document.createElement('div')
// newElement.style.background = 'yellow'
// newElement.style.height = '100px'
// newElement.style.width = '100px'
// parent.append(newElement)

// // Add Element on the first line = prepend

// $('h1').remove()

// var pa = $('h5.card-title')
// var news = document.createElement('h5')
// news.innerText = 'Price'
// pa.append(news)

// JSON

var listOfJSON = [

    {
        Name : 'Product 1',
        Price : 80,
        Description : "This is a description of Product 1"
    },

    {
        Name : 'Product 2',
        Price : 80,
        Description : "This is a description of Product 2"
    },
    
    {
        Name : 'Product 3',
        Price : 80,
        Description : "This is a description of Product 3"
    },

    {
        Name : 'Product 4',
        Price : 80,
        Description : "This is a description of Product 4"
    },

    {
        Name : 'Product 5',
        Price : 80,
        Description : "This is a description of Product 5"
    },

    

]



for(let i = 0; i < listOfJSON.length; i++){
    // Get parent
    let parentRow = $("div .row")

    // Get template
    let template = $('#card-template')

    // Clone template
    let clone = template.content.cloneNode(true)
    clone.querySelector('.card .card-body .card-title').innerHTML = listOfJSON[i].Name;
    clone.querySelector('.card .card-body .price').innerHTML = listOfJSON[i].Price;
    clone.querySelector('.card .card-body p.card-text').innerHTML = listOfJSON[i].Description;
    parentRow.append(clone)

}




