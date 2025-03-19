let container = document.getElementById("container");
let idinput = document.getElementById("id");
let titleinput = document.getElementById("title")  
let priceinput = document.getElementById("price")
let categoryinput = document.getElementById("category") 
let imageinput = document.getElementById("image")
let urll = "https://amused-titanium-thursday.glitch.me/products";

// let urll = "http://localhost:5000/products";
let btn = document.getElementById("btn")

btn.addEventListener('click', function (){
    if(titleinput.value=="" || 
        priceinput.value=="" || categoryinput.value=="" ){
            alert("Fill all the feilds")
        }
    else{
        let method = (idinput.value) ? "PUT" : "POST";
        let url =  (method == "POST") ? urll : `${urll}/${idinput.value}`;
        fetch(url, {
            method,
            "headers" : {
                "Content-Type" : "application/json"
            },
            "body" : JSON.stringify({
                "title" : titleinput.value,
                "price" : priceinput.value,
                "category" : categoryinput.value,
                "image" : imageinput.value
            })
        })
            .then(res => {
                if(res.ok){
                    // getData();
                    alert((method == "PUT")? "Data Updated..." : "Data Added")
                    getData();
                }
            })
            .catch(err => console.error(err))
    }
})

function getData(){
    fetch(urll)
        .then(res => res.json())
        .then(data => {
            displayData(data)
        })
        .catch(err=> console.error(err));
}

function displayData(products){
    for ( let obj of products){
        let item = document.createElement("div");
        item.className = "item"
        item.innerHTML = 
        `
        <img class="image" src='${obj.image}'>
        <p class="id">${obj.id}</p>
        <p class = "title">${obj.title}</p>
        <p class="price">$${obj.price}</p>
        <p class="category">${obj.category}</p>
        <button class = "btn btn-dark" onclick = deletedata('${obj.id}')>Delete</button>     <button class = "btn btn-secondary" onclick = updatedata('${obj.id}')>Update</button>
        `
        container.appendChild(item);
    }
    document.body.appendChild(container);
}

function deletedata(id){
    fetch(`${urll}/${id}`,{
        "method" : "DELETE"
    })
    .then(res => {
        if(res.ok){
            // getData();
            alert("Data deleted successfully...")
            getData();
        }
    })
    .catch(err => console.error(err))
}

function updatedata(id){
    fetch(`${urll}/${id}`)
        .then(res => res.json())
        .then(obj =>{
            idinput.value = obj.id
            titleinput.value = obj.title 
            priceinput.value = obj.price
            categoryinput.value = obj.category  
            imageinput.value = obj.image
            window.scroll({
                top : 0,
                behavior : "smooth"
            })
        })
        .catch(err => console.error(err))
}


getData()



