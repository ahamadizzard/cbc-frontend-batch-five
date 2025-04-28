// import "./productCard.css";
export default function ProductCard(props) {
    return (
        <div className="card">
            <img src="https://picsum.photos/200/300" alt="Product" />
            <h1>{props.name}</h1>
            <h2>{props.description}</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Enim voluptate soluta sapiente perspiciatis veritatis corrupti laboriosam quas error totam explicabo distinctio,
                iste reiciendis impedit recusandae sed animi, odio eaque eligendi?</p>
            <h3 className="price">Price{props.price}</h3>
            <button className="addToCart">Add to Cart</button>
            <button className="buyNow">Buy Now</button>
        </div>
    );
}