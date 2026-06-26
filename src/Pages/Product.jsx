import { useEffect, useState } from "react"
import { Loader } from "../utils/Loader";

export const Products = () => {

    const [productdata, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteItem, setDeleteItem] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        let URL = 'https://dummyjson.com/products';
        setLoading(true)
        setError("");
        try {
            const response = await fetch(URL)

            if (!response.ok) {
                throw new error("failed to fetch Products");
            }
            const result = await response.json()
            // console.log("==", result.products);
            setProductData(result.products)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchData() }, [])

    if (loading) return <Loader />;

    if (error) return <h2 style={{ color: "red" }}>{error}</h2>

    const handleDelete = (id) => {

        const deletedItem = productdata.find((item) => item.id === id);
        setProductData(productdata.filter((item) => item.id !== id));

        if (deletedItem) {
            setDeleteItem((prev) => [...prev, deletedItem]);
        }
    }

    return (
        <section>
            <p>Products</p>
            {
                productdata?.map((item) => {
                    return (
                        <section key={item.id}>
                            <p>{item.title}</p>
                            {
                                item.tags?.map((v, i) => (<ul key={i}><li>{v}</li></ul>))
                            }
                            <button onClick={() => handleDelete(item.id)}>Delete Btn</button>
                        </section>
                    )
                })
            }

            <hr />
            <h6>Deleted Item Show</h6>
            {
                deleteItem.length === 0 ? (
                    <p>no Deleted Items</p>
                ) : (
                    deleteItem?.map((item) => (
                        <article key={item.id}>
                            <p>{item.title}</p>
                            {
                                item.tags?.map((v, i) => (<ul key={i}><li>{v}</li></ul>))
                            }
                        </article>
                    ))
                )
            }
        </section >
    )
}







