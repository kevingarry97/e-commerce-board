import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/layout/adminLayout';
import _ from 'lodash';
import { getProduct, sendProduct} from '../services/productService';
import { cosmetics, jewelry, other, property, rooms } from "../utils/helper";

const categories = [
    {
      label: "Furnitures",
      value: 1,
      
    },
    { label: "Motors", value: 2, },
    { label: "Electronics", value: 3,},
    { label: "Property & Rent", value: 4,},
    {
      label: "Clothing",
      value: 5,
    },
    { label: "Cosmetics", value: 6,},
    { label: "Rooms", value: 7 },
    {
      label: "Jewelry",
      value: 8,
      },
];

const Product = () => {
    const [data, setData] = useState({name: '', initialPrice: '', price: '', image: [], description: '', category: '', type: '', color: '', size: [], location: 'Headquater'});
    const [products, setProducts] = useState([]);

    const handleChange = (e, i) => {
        const newData = { ...data };

        e?.target?.name && e.target.name === "image" ? 
            _.forEach(e.target.files, file => {
                newData['image'].push(file)
            }) 
        : e?.target?.name && e.target.name !== "image" ? 
            newData[e?.target?.name] = e?.target?.value 
        : newData.size[i] = e.value;

        setData(newData);
    }

    const addCountry = (e) => {
        e.preventDefault();
        const newSize = {...data};
        setData(newSize, ...newSize.size = [...newSize.size, ""]);
        console.log(data);
    }

    const handleRemove = (index) => {
        const newSize = {...data};
        
        newSize.size.splice(index, 1);
        setData(newSize);
        console.log(newSize);
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {data: product} = await sendProduct(data);
        console.log(product)
        window.location.reload();
    }

    useEffect(() => {
        (async () => {
            const {data: products} = await getProduct();
            setProducts(products);
        })();
    }, []);

    console.log(products);

    return (  
        <AdminLayout>
            <h5 className="mb-4"><span className="text-success">+</span> Create Product</h5>
            <div className="ml-4 my-4">
                <div className="media mb-3 align-items-center">
                    <div className="box">
                        1
                    </div>
                    <div className="media-body ml-2">
                        <span>Products Details</span>
                    </div>
                </div>
                <form>
                    <div className="card border-0 shadow-sm card-body">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="form-group">
                                    <label htmlFor=""><h6>Name:</h6></label>
                                    <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Product name" className="form-control" />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4">
                                <div className="form-group">
                                    <label htmlFor=""><h6>Price:</h6></label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white border-right-0" id="basic-addon1">$</span>
                                        </div>
                                        <input type="text" name="initialPrice" value={data.initialPrice} onChange={handleChange} className="form-control border-left-0" aria-label="Username" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="form-group">
                                    <label htmlFor=""><h6>Image:</h6></label>
                                    <input type="file" name="image" className="form-control" multiple onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label htmlFor=""><h6>Description:</h6></label>
                                    <textarea name="description" value={data.description} onChange={handleChange} rows="3" className="form-control" placeholder="Product Description"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="ml-4 my-4">
                <div className="media mb-3 align-items-center">
                    <div className="box">
                        2
                    </div>
                    <div className="media-body ml-2">
                        <span>Products Belongs</span>
                    </div>
                </div>
                <form>
                    <div className="card border-0 shadow-sm card-body">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="form-group">
                                    <label htmlFor=""><h6>Category:</h6></label>
                                    <select className="custom-select mr-sm-2" id="inlineFormCustomSelectPref" name="category" value={data.category?.label} onChange={handleChange}>
                                        <option selected>Choose...</option>
                                        {categories.map((category, key) => <option key={key} value={category.label}>{category.label}</option>)}
                                    </select>
                                </div>
                            </div>
                            {(data.category && data.category !== 'Clothing') && <div className="col-lg-3 col-md-6">
                                <div className="form-group">
                                    <label htmlFor=""><h6>Type:</h6></label>
                                    <select className="custom-select mr-sm-2" id="inlineFormCustomSelectPref" name="type" value={data.type?.label} onChange={handleChange}>
                                        <option selected>Choose...</option>
                                        {
                                            data.category === 'Property & Rent' ? 
                                                property.map((item, key) => <option key={key} value={item.label}>{item.label}</option>)
                                            : data.category === 'Cosmetics' ?
                                                cosmetics.map((item, key) => <option key={key} value={item.label}>{item.label}</option>)
                                            : data.category === 'Jewelry' ?
                                                jewelry.map((item, key) => <option key={key} value={item.label}>{item.label}</option>)
                                            : data.category === 'Rooms' ?
                                                rooms.map((item, key) => <option key={key} value={item.label}>{item.label}</option>)
                                            :
                                                other.map((item, key) => <option key={key} value={item.label}>{item.label}</option>)
                                        }
                                    </select>
                                </div>
                            </div>}
                        </div>
                    </div>
                    {(data.category && data.category === 'Clothing') && 
                        <div className="card card-body border-0 shadow-sm mt-4">
                            <div className="row align-items-center">
                                <div className="col-md-6 col-xl-4">
                                    <div className="form-group">
                                        <label htmlFor=""><h6>Colors:</h6></label>
                                        <input className="form-control" onChange={handleChange} name="color" value={data.color} />
                                    </div>
                                </div>
                                {Array.from(data?.size)?.map((size, i) => (
                                    <div key={i} className="col-xl-4 col-md-6 mt-3">
                                        <div className="input-group mb-3 mt-3">
                                            <input type="text" placeholder="Size" className="form-control" value={size} onChange={({target}) => handleChange(target, i)} />
                                            <div className="input-group-append">
                                                <button type="button" className="btn btn-danger px-3" onClick={() => handleRemove(i)}>X</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className="btn btn-success px-4 pt-2 pb-2 mt-3" onClick={addCountry}><span className="m-0 p-0">+ &nbsp; Add Size</span></button>
                            </div>
                        </div>
                    }
                    <button className="btn btn-info px-4 mt-3 mb-5 float-right rounded-pill" onClick={handleSubmit}>+ Create</button>
                </form>
            </div>
            <h5 className="pt-5 mt-5"><span className="text-success">+</span> List Product</h5>
            <div className="d-none d-lg-block mt-3">
                <table className="table table-borderless">
                    <thead className="bg-light">
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Product name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">User</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created At</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, i) => (
                            <tr key={i} className="bg-white border-bottom">
                                <th scope="row">
                                    <img src={product.image[0]} width="60" className="shadow-sm p-2" alt="" />
                                </th>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td><span className={`px-4 py-1 rounded-pill ${product.user.role === "Admin" ? "bg-light-success text-success" : product.user.role === "Assistant" ? "bg-light-primary text-primary" : "bg-light-warning text-warning"}`}>{product.user.role}</span></td>
                                <td><span className={`badge ${product.status === 'Pending' ? 'bg-warning' : product.status === 'Cancelled' ? 'badge-danger' : 'badge-success'} badge-primary`}>{product.status}</span></td>
                                <td>{product.dateCreated.slice(0, 12) + '...'}</td>
                                <td>{product.role !== 'User' ? <i className="fa fa-check-circle fa-2x text-success" /> : (
                                    <div class="btn-group">
                                        <button type="button" class="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fa fa-ellipsis-v" />
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right">
                                        <button class="dropdown-item d-flex align-items-center" type="button">
                                            <i className="fa fa-check-circle fa-2x text-success" /> &nbsp;&nbsp; <span>Approve</span>
                                        </button>
                                        <button class="dropdown-item d-flex align-items-center" type="button">
                                            <i className="fa fa-times-circle fa-2x text-danger" /> &nbsp;&nbsp; <span>Deny</span>
                                        </button>
                                        <button class="dropdown-item d-flex align-items-center" type="button" data-toggle="modal" data-target="#uploadModal">
                                            <i className="fa fa-cloud-upload fa-2x text-primary" /> &nbsp;&nbsp; <span>Re-Upload</span>
                                        </button>
                                        </div>
                                  </div>
                                )}</td>
                            </tr>
                        ))}
                                    
                    </tbody>
                </table>
            </div>
            <div className="modal fade" id="uploadModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0">
                        <div className="modal-header pb-0">
                            <h5 className="mb-4"><span className="text-success">+</span> &nbsp;Create Feedback</h5>
                        </div>
                        <div className="modal-body mt-2">
                            <form>
                                <div className="form-group">
                                    <label>Feedback</label>
                                    <textarea id="" className="form-control" placeholder="Give feedback" name="feedback" rows="5" />
                                </div>
                                <button className="btn btn-info btn-sm float-right mt-3 rounded-pill">Send Feedback</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
 
export default Product;