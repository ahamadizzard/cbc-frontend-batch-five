export function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    cart = [];
    // If cart is null, initialize it as an empty array
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    // If cart is not null, parse it to convert it back to an array
    // This is necessary because localStorage stores everything as a string
    cart = JSON.parse(cart);
  }
  return cart;
}

export function removeFromCart(productId) {
  let cart = getCart();

  const newCart = cart.filter((item) => {
    return item.productId != productId;
  });
  localStorage.setItem("cart", JSON.stringify(newCart));
}

export function addToCart(product, quantity) {
  let cart = getCart();
  // Parse the cart from localStorage
  let index = cart.findIndex((item) => {
    //
    return item.productId == product.productId;
  });

  if (index == -1) {
    cart[cart.length] = {
      productId: product.productId,
      productName: product.productName,
      productImage: product.productImages[0],
      price: product.salePrice,
      labelPrice: product.labelPrice,
      quantity: quantity,
    };
  } else {
    const newQuantity = cart[index].quantity + quantity;
    if (newQuantity <= 0) {
      removeFromCart(product.productId);
      return;
    } else {
      cart[index].quantity = newQuantity;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getTotal() {
  let cart = getCart();
  let totalPrice = 0;
  let totalItems = 0;
  let totalLabelPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  return totalPrice;
}
export function getTotalLabelPrice() {
  let cart = getCart();
  let totalLabelPrice = 0;
  cart.forEach((item) => {
    totalLabelPrice += item.labelPrice * item.quantity;
  });
  return totalLabelPrice;
}
