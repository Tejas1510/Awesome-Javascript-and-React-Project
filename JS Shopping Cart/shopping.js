// Hello Guys !! I have made it a id based application as this is how to works in real world


let products = [
  {
    id: 1,
    name: "White Tshirt",
    size: "L",
    color: "white",
    price: 400,
    image: "product1.jpeg",
    description: "Good looking white tshirt",
  },
  {
    id: 2,
    name: "Black Shirt",
    size: "M",
    color: "Black",
    price: 500,
    image: "product2.jpg",
    description: "Good looking black shirt",
  },

  {
    id: 3,
    name: "Checked Shirt",
    size: "S",
    color: "White & Black",
    price: 600,
    image: "product3.jpg",
    description: "Good looking Checked Shirt",
  },

  {
    id: 4,
    name: "Black Female Blazer",
    size: "M",
    color: "Black",
    price: 800,
    image: "product4.jpeg",
    description: "Beautifull Blazer",
  },

  {
    id: 5,
    name: "Navy Blue Top",
    size: "S",
    color: "Blue",
    price: 700,
    image: "product5.jpeg",
    description: "Good looking Top",
  },

  {
    id: 6,
    name: "Marriage Dress",
    size: "M",
    color: "Henna",
    price: 1000,
    image: "product6.jpg",
    description: "Good looking Traditional Dress",
  },
  {
    id: 7,
    name: "Browny Jeans",
    size: "L",
    color: "Brown",
    price: 700,
    image: "product7.jpg",
    description: "Amazing Browney Jeans",
  },
  {
    id: 8,
    name: "Slim and Fine Blezer",
    size: "M",
    color: "Gray",
    price: 900,
    image: "product8.jpeg",
    description: "Blezer specially for parties",
  },
  {
    id: 9,
    name: "Woodland Shoes",
    size: "M",
    color: "Brown",
    price: 800,
    image: "product9.jpg",
    description: "Favourable shoes for anyone",
  },
  {
    id: 10,
    name: "Kids Girl Frok",
    size: "S",
    color: "Pink",
    price: 900,
    image: "product10.jpg",
    description: "Beautiful Princess type frok",
  },
  {
    id: 11,
    name: "Kids Kurta",
    size: "S",
    color: "Light Blue",
    price: 500,
    image: "product11.jpg",
    description: "Sp.Kurta for Navratri",
  },
  {
    id: 12,
    name: "Long Heels",
    size: "M",
    color: "Black",
    price: 600,
    image: "product12.jpg",
    description: "Strong and long heels",
  },




];

cart = [];

function displayProducts(productsData, who = "productwrapper") {
  let productsString = "";

  productsData.forEach(function (product, index) {
    let { id, name, image, color, description, price, size } = product;

    if (who == "productwrapper") {
      productsString += ` <div class="product">
        <div class="prodimg">
          <img src="productimages/${image}" width="100%" />
        </div>
        <h3>${name}</h3>
        <p>Price : ${price}$</p>
        <p>Size : ${size}</p>
        <p>Color : ${color}</p>
        <p>${description}</p>
        <p>
          <button onclick="addToCart(${id})">Add to Cart</button>
        </p>
      </div>`;
    } else if (who == "cart") {
      productsString += ` <div class="product">
        <div class="prodimg">
          <img src="productimages/${image}" width="100%" />
        </div>
        <h3>${name}</h3>
        <p>Price : ${price}</p>
        <p>Size : ${size}</p>
        <p>Color : ${color}</p>
        <p>${description}</p>
        <p>
          <button onclick="removeFromCart(${id})">Remove from Cart</button>
        </p>
      </div>`;
    }
  });

  document.getElementById(who).innerHTML = productsString;
}

displayProducts(products);

function searchProduct(searchValue) {
  let searchedProducts = products.filter(function (product, index) {
    let searchString =
      product.name + " " + product.color + " " + product.description;

    return searchString.toUpperCase().indexOf(searchValue.toUpperCase()) != -1;
  });

  displayProducts(searchedProducts);
}

function searchForMinPrice(minprice){
   let maxprice=document.getElementById("maxprice").value;if(maxprice==0)maxprice= Number.MAX_SAFE_INTEGER ;
  let searchminproducts = products.filter(function(product,index){
    
    return product.price >= minprice && product.price <= maxprice;
  
});
  displayProducts(searchminproducts);
}

function searchForMaxPrice(maxprice){
   let minprice=document.getElementById("minprice").value;if(maxprice==0)maxprice= Number.MAX_SAFE_INTEGER ;
  let searchmaxproducts = products.filter(function(product,index){
    
    return product.price >= minprice && product.price <= maxprice;
  });
  displayProducts(searchmaxproducts);
}

function getProductByID(productArray, id) {
  return productArray.find(function (product) {
    return product.id == id;
  });
}

function addToCart(id) {
  
  let currcart=cart.filter(function (currprod){
     return currprod.id==id;
  });
  if(currcart.length==0){
  let pro = getProductByID(products, id);

  //  if not available before, then putting in cart
  cart.push(pro);
  document.getElementById("cartitems").innerHTML=`Total Cart Items : ${cart.length} `;
  displayProducts(cart, "cart");}
  else showModal();  //othervise showing message
}

function removeFromCart(id) {
  // getting the index based on id
  let index = cart.findIndex(function (product) {
    return product.id == id;
  });

  //   removing from cart based on index
  cart.splice(index, 1);
  document.getElementById("cartitems").innerHTML=`Total Cart Items : ${cart.length} `;
  displayProducts(cart, "cart");
}


function showModal() {
  let modal = document.getElementsByClassName("modal")[0];
  modal.style.display = "block";

}

function hideModal(event) {
  if (event.target.className == "modal") {
    let modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "none";
  }
}

function hidemodal(event) {
 
    let modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "none";
  
}
