import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItem: [
    // {
    //   name: { type: String, required: true },
    //   amount: { type: Number, required: true },
    //   image: { type: String, required: true },
    //   price: { type: Number, required: true },
    //   product: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Product",
    //     required: true,
    //   },
    // },
  ],
  shippingAddress: {
    // fullName: { type: String, required: true },
    // address: { type: String, required: true },
    // city: { type: String, required: true },
    // phone: { type: Number, required: true },
  },
  orderItemsSelected: [],
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
  isSuccessOrder: false,
};

export const orderSlide = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state?.orderItem?.find(
        (item) => item?.product === orderItem.product
      );
      if (itemOrder) {
        if (itemOrder.amount <= itemOrder.countInStock) {
          itemOrder.amount += orderItem?.amount;
          state.isSuccessOrder = true;
        } else {
          state.isErrorOrder = true
        }
      } else {
        state.orderItem.push(orderItem);
        state.isSuccessOrder = true;
      }
    },
    resetOrder: (state) => {
      state.isErrorOrder = false;
      state.isSuccessOrder = false;
    },

    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItem?.find(
        (item) => item?.product === idProduct
      );
      const itemOrderSelected = state?.orderItemsSelected?.find(
        (item) => item?.product === idProduct
      );
      itemOrder.amount++;
      if (itemOrderSelected) {
        itemOrderSelected.amount++;
      }
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItem?.find(
        (item) => item?.product === idProduct
      );
      const itemOrderSelected = state?.orderItemsSelected?.find(
        (item) => item?.product === idProduct
      );
      itemOrder.amount--;
      if (itemOrderSelected) {
        itemOrderSelected.amount--;
      }
    },
    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItem?.filter(
        (item) => item?.product !== idProduct
      );
      const itemOrderSelected = state?.orderItemsSelected?.filter(
        (item) => item?.product !== idProduct
      );
      state.orderItem = itemOrder;
      state.orderItemsSelected = itemOrderSelected;
    },
    removeAllOrderProduct: (state, action) => {
      const { listChecked } = action.payload;

      const itemOrders = state?.orderItem?.filter(
        (item) => !listChecked.includes(item.product)
      );
      const itemOrderSelected = state?.orderItemsSelected?.filter(
        (item) => !listChecked.includes(item.product)
      );
      state.orderItem = itemOrders;
      state.orderItemsSelected = itemOrderSelected;
    },
    selectedOrder: (state, action) => {
      const { listChecked } = action.payload;
      const orderSelected = [];
      state.orderItem.forEach((order) => {
        if (listChecked.includes(order.product)) {
          orderSelected.push(order);
        }
      });
      state.orderItemsSelected = orderSelected;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addOrderProduct,
  resetOrder,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeAllOrderProduct,
  selectedOrder,
} = orderSlide.actions;

export default orderSlide.reducer;
