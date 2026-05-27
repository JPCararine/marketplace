import { View, Text } from "react-native";
import OrderView from "../../../viewModels/Order/Order.view";
import useOrderViewModel from "../../../viewModels/Order/Order.viewModel";

export default function Orders() {
    const props = useOrderViewModel();
    return (
        <OrderView {...props} />
    )
}