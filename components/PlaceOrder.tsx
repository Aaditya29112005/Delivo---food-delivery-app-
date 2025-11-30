// components/OrderFooter.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { cleanCart } from '../redux/CartReducer';

interface OrderFooterProps {
  total: number;
  name: string | string[];
  deliveryOption: "standard" | "premium";
}

const PlaceOrder: React.FC<OrderFooterProps> = ({ total, name, deliveryOption }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    total > 0 && (
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerText}>Pay Using Cash</Text>
          <Text style={styles.footerSubText}>Cash on Delivery</Text>
        </View>
        <Pressable
          onPress={() => {
            console.log("Navigating to Order with:", { name, deliveryOption });
            dispatch(cleanCart());
            router.replace({
              pathname: "/order",
              params: { name, deliveryOption },
            });
          }}
          style={styles.placeOrderButton}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View >
              <Text style={styles.orderAmount}>₹{total + 90}</Text>
              <Text style={styles.orderTotal}>TOTAL</Text>
            </View>
            <Text style={styles.placeOrderText}>Place Order</Text>
          </View>
        </Pressable>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
    padding: 15,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  footerSubText: {
    fontSize: 12,
    color: "#ffffffb3",
  },
  placeOrderButton: {
    backgroundColor: "#fd5c63",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 15,
    minWidth: 150,
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  orderTotal: {
    fontSize: 12,
    color: "#ffffffb3",
  },
  placeOrderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default PlaceOrder;
