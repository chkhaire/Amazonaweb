import React, { useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../statemanegement/actions/productActions';

export default function HomeScreen() {
 const dispatch= useDispatch();
 const productList=useSelector(state => state.productList);
 const {loading,error,products}=productList;
  useEffect(() => {
    dispatch(listProducts())
   }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((products) => (
            <Product key={products._id} product={products}></Product>
          ))}
        </div>
      )}
    </div>
  );
}
