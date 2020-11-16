import * as actionsType from './actionsTypes';
import axios from '../../axios-orders';

export const purchaseBugerSucess = (id, orderData) => {
    return {
        type: actionsType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionsType.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBugerStart = () => {
    return {
        type: actionsType.PURCHASE_BURGER_START
    }
}

export const purchaseBuger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBugerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBugerSucess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionsType.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionsType.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionsType.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionsType.FETCH_ORDERS_START
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    };
};
