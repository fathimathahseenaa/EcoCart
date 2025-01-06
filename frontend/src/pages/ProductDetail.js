 import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
 import {toast} from 'react-toastify';


export default function ProductDetail({cartItems, setCartItems}) {
const [product, setProduct] = useState(null);     const [qty, setQty] = useState(1);
const {id} = useParams();

     useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+'/products/'+id)
        .then(res => res.json())
        .then( res => setProduct(res.product))
    },[])

    function addToCart() {
        const itemExist = cartItems.find((item) => item.product._id == product._id)
        if (!itemExist) {
            const newItem = {product, qty};
            setCartItems((state) => [...state, newItem]);
            toast.success("Cart Item added succesfully!")
        }
    }

    function increaseQty() {
        if (product.stock == qty) {
            return;
        }
        setQty((state) => state + 1);
    }

    function decreaseQty() {
        if (qty > 1) {
            setQty((state) => state - 1);
        }
    }














    return  product && <div className="container container-fluid">
                <div className="row f-flex justify-content-around">
                    <div className="col-12 col-lg-5 img-fluid" id="product_image">
                        <img src={product.images[0].image} alt="sdf" height="500" width="500" />
                    </div>

                    <div className="col-12 col-lg-5 mt-5">
                        <h3>{product.name}</h3>
                        <p id="product_id">Product #{product._id}</p>

                        <hr />

                        <div className="rating-outer">
                            <div className="rating-inner" style={{width : `${product.ratings/5 * 100}%`}}></div>
                        </div>
                

                        <hr />

                        <p id="product_price">${product.price}</p>
                        <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                            <input type="number" className="form-control count d-inline" value={qty} readOnly />

                            <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                        </div>
                        <button type="button" onClick={addToCart} disabled={product.stock == 0}   id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

                        <hr />

                        <p>Status: <span id="stock_status" className={product.stock > 0 ?'text-success':'text-danger'}>{product.stock > 0  ?'In Stock' : 'Out of Stock'}</span></p>

                        <hr />

                        <h4 className="mt-2">Description:</h4>
                        <p>{product.description}</p>
                        <hr />
                        <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                        
                        <div className="rating w-50"></div>
                                
                    </div>

                </div>
            </div>
}





// export default function ProductDetail() {
//     return  product &&  <div className="container container-fluid">
//         <div className="row f-flex justify-content-around">
//         <div className="col-12 col-lg-5 img-fluid" id="product_image"/>
//             <img src={product.images[0].image} alt="sdf" height="500" width="500"/>
//         </div>

//         <div className="col-12 col-lg-5 mt-5">
//             <h3>Dell Inspiron 3511 Laptop, Intel i3-1115G4, 8GB, 512GB</h3>
//             <p id="product_id">Product # 387874kkfjkf</p>

//             <hr/>

//             <div className="rating-outer">
//                 <div className="rating-inner"></div>
//             </div>
       

//             <hr/>

//             <p id="product_price">$456.00</p>
//             <div className="stockCounter d-inline">
//                 <span className="btn btn-danger minus">-</span>

//                 <input type="number" className="form-control count d-inline" value="1" readOnly />

//                 <span className="btn btn-primary plus">+</span>
//             </div>
//              <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

//             <hr/>

//             <p>Status: <span id="stock_status">In Stock</span></p>

//             <hr/>

//             <h4 className="mt-2">Description:</h4>
//             <p>Processor: Intel i5-1235U (3.30 GHz up to 4.40 GHz), 10 Cores & 12MB Cache
//                 RAM & Storage: 8GB, 8Gx1, DDR4, 2666MHz Ach & 512GB SSD
//                 Display & Graphics: 15.6" FHD WVA AG 120Hz 250 nits Narrow Border & Integrated Graphics</p>
//             <hr/>
//             <p id="product_seller mb-3">Sold by: <strong>Amazon</strong></p>
            
//             <div className="rating w-50"></div>
                    
//         </div>

//     </div>

// }