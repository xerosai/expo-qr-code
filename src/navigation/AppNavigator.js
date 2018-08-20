import { createStackNavigator } from "react-navigation";
import QRScreen from "../screens/QRScreen";
import CodeDetailScreen from "../screens/CodeDetailScreen";

export default createStackNavigator({
    Home: QRScreen,
    CodeDetail: CodeDetailScreen
}, {
    lazy: true
});