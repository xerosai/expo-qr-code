import PropTypes from 'prop-types';

import React from 'react'
import { View } from 'react-native'
import {Text} from 'react-native-elements';

/**
 * @class CodeDetailScreen
 * @description Class-based component that displays details of the code object scanned from the QR Screen
 */
class CodeDetailScreen extends React.Component {

    static navigationOptions = {
        headerLabel: 'Bar / QR Code Detail'
    };

    state = {
        barCode: {data: 'n/a', type: 'n/a'}
    };

    componentDidMount() {
        const {navigation} = this.props;

        this.setState(() => {
            return {...this.state, barCode: navigation.getParam('barCode', {data: 'n/a', type: 'n/a'})}
        });
        console.log('mounted detail screen with props: ', this.props);
    }

    render() {

        const {barCode} = this.state;

        console.log('render with barcode: ', barCode);

        return (
            <View style={styles.containerStyle}>
                <Text h2>Code Detail</Text>
                <Text h4 style={styles.headerTextStyle}>Type</Text>
                <Text style={styles.detailTextStyle}>{barCode.type ? barCode.type : 'Unknown Type'}</Text>
                <Text h4 style={styles.headerTextStyle}>Data</Text>
                <Text ellipsizeMode="tail" numberOfLines={2} style={styles.detailTextStyle}>{barCode.data ? barCode.data : 'Unknown Data'}</Text>
            </View>
        );
    }
}

CodeDetailScreen.propTypes = {
    barCode: PropTypes.object
};

const styles = {
    containerStyle: {
        flex: 1,
        padding: 24
    },
    headerTextStyle: {
        color: '#999',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 8
    },
    detailTextStyle: {
        color: '#666',
        fontSize: 18,
        fontWeight: '400',
    }
};

export default CodeDetailScreen