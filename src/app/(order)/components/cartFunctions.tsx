export function displayCart(cart) {
  const cartTotal: { amount: number; items: number; tax: number } = {
    amount: 0,
    items: 0,
    tax: 0,
  };
    const cartTable:[] = cart.map(product=> {
      cartTotal.amount = cartTotal.amount + product.qty * product.productprice; //Incrementing Value of Amount
      cartTotal.items = cartTotal.items + product.qty; //Incrementing Total Items Here
      cartTotal.tax = cartTotal.tax + product.productprice * 0.08; //Adding 8% tax of each item
        return (
          <tr className="border-b border-blue-gray-200 text-center" key={product.productid}>
          <td className="py-3 px-4">{product.productname}</td>
          <td className="py-3 px-4">{product.productprice}$</td>
          <td className="py-3 px-4">{product.qty}</td>
          <td className="py-3 px-4">{product.qty * product.productprice}$</td>
          <td className="py-3 px-4">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Edit</a>
          </td>
        </tr>
        )
      })
      cartTable.push(           <tr className="border-b border-blue-gray-200 text-center" key={"total"}>    <td className="py-3 px-4">Total</td>      <td className="py-3 px-4">TAX: {cartTotal.tax}$</td>
      <td className="py-3 px-4">{cartTotal.items}</td>
      <td className="py-3 px-4">{cartTotal.amount}$</td></tr>)
      
    return {cartTable, cartTotal}
}