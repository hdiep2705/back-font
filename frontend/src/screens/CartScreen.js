import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { addToCart } from '../actions/cartActions';

export default function CartScreen(props) {
	const productId = props.match.params.id;
	const qty = props.location.search
		? Number(props.location.search.split('=')[1])
		: 1;
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const dispatch = useDispatch();
	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);
	const remoFromCartHandler = (id) => {
		//delete actiom
		dispatch();
	};
	const loadItem = (cartItem) => {
		if (cartItem.length <= 0) return;

		let result = null
		result = cartItems.map((item) => {
			if (!item) {
				return;
			}
			return (
				<li key={item.product}>
					<div className="row">
						<div>
							<img src={item.image}
								alt={item.name}
								className="small"
							></img>
						</div>
						<div className="min-30">
							<Link to={`/product/${item.product}`}>{item.name}</Link>
						</div>
						<div>
							<select
								value={item.qty}
								onChange={(e) =>
									dispatch(
										addToCart(item.product,
											Number(e.target.value))
									)
								}
							>
								{[...Array(item.countInStock).keys()].map(
									(x) => (
										<option key={x + 1} value={x + 1}>
											{x + 1}
										</option>
									)
								)}
							</select>
						</div>
						<div>${item.price}</div>
						<div>
							<button type="button" onClick={() => remoFromCartHandler(item.product)}
							>
								Delete
</button>
						</div>
					</div>
				</li>

			)
		}
		)
		return result;
	}
	return (
		<div className="row top">
			<div className="col-2">
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<MessageBox>
						Cart is empty. <Link to="/">Go Shopping</Link>
					</MessageBox>
				) : (
						<ul>
							{
								loadItem(cartItems)

							}
						</ul>
					)
				}
			</div>
		</div>

	);
}
