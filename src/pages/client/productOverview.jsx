import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { toast } from "react-hot-toast";

export default function ProductOverview() {
    const params = useParams(); // this is to get the params from the url as an object
    const productId = params.id;
    const [status, setStatus] = useState('loading'); // loading, success, error
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_BASE_URL + '/api/products/' + productId)
            .then((response) => {
                console.log(response.data);
                setProduct(response.data);
                setStatus('success');
            })
            .catch((error) => {
                console.log(error);
                setStatus('error');
                toast.error('An error occurred while fetching the product');
            })
    }, [])

    return (
        <div>
            this is an overview page for product {JSON.stringify(product)}
        </div>
    )
}