export function getCart() {
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  if (cart == null) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
}

export function removeFromCart(productId) {
  let cart = getCart();

  const newCart = cart.filter((item) => {
    return item.productId != productId;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
  let cart = getCart();
  // Parse the cart from localStorage
  let index = cart.findIndex((item) => {
    //
    return item.productId === productId.productId;
  });

  if (index == -1) {
    cart[cart.length] = {
      productId: productId.productId,
      productName: productId.productName,
      productImage: productId.productImages[0],
      price: productId.salePrice,
      labelPrice: productId.labelPrice,
      quantity: quantity,
    };
  } else {
    const newQuantity = cart[index].quantity + quantity;
    if (newQuantity <= 0) {
      return;
    } else {
      cart[index].quantity = newQuantity;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
