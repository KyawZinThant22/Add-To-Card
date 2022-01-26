//  Get data from API


// to short the description

function toShort(str,max = 50){
    if ( str.length > max){
        return str.substring(0,max) + "...."
    }


    return str;
}


let productData = []

function toShowOnUi(x){
    $(".products").empty();
    x.map(item=>{
        $(".products").append(`
        <div class="card product pt-3">
             <img src="${item.image}"  class="card-img-top">
        <div class="card-body border rounded">
            <p class="card-title font-weight-bold text-primary text-nowrap overflow-hidden">${item.title}</p>
            <small class ="text-black-50" >${toShort(item.description,120)}</small>
            <div class="d-flex justify-content-between align-items-end mt-3">
                <span class="font-weight-bold">${item.price}</span>
                <button class="btn btn-outline-primary btn-sm"> <i class="fas fa-cart-plus mr-2">Add </i></button>
            </div>
        </div>
        
    </div>
    `)
    })
}


$.get("https://fakestoreapi.com/products",function(data){
    // console.log(data);
    productData = data;
    toShowOnUi(productData)
   
})

$("#search").on("keyup", function(){
    let keyword = $(this).val().toLowerCase();
    // $(".product").filter(function(){
    //   $(this).toggle($(this).text().toLowerCase().indexOf(keyword));
    // })

    if(keyword.trim().length){

    let filterData = productData.filter(product => {
        if(product.title.toLowerCase().indexOf(keyword) > -1 || product.description.toLowerCase().indexOf(keyword) > -1 || product.price === keyword) {
            return product;
        }
    })
    toShowOnUi(filterData)
    }
});



//category 

$.get("https://fakestoreapi.com/products/categories" , function (data){
    data.map(cate => $("#category").append(`<option value = "${cate}">${cate}</option>`))
})

$("#category").on("change",function(){
    let selectedCategory = $(this).val();
    
    if(selectedCategory !=0){

    let filterData = productData.filter(product => {
        if(product.category == selectedCategory) {
            return product;
        }
    })
        toShowOnUi(filterData);
    }else{
        toShowOnUi(productData)
    }
})
