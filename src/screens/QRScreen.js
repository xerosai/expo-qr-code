import React from 'react';
import {StyleSheet, Text, Vibration, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {BarCodeScanner, Permissions} from 'expo';

/**
 * @class QRScreen
 * @description Class-based component that represents a screen showing the Barcode / QR Code reader. On successfully reading a code, app will navigate to details screen
 */
class QRScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Code Reader',
        headerRight: (
            <Button 
                backgroundColor={navigation.getParam('getHeaderButtonColor')}
                onPress={navigation.getParam('requestPermissions')}
                title="Allow Camera" 
            />
        ) 
    });

    state = {
        permissionGranted: null,
        scanned: false
    };

    async componentDidMount() {
        // Ask for permissions
        this.props.navigation.setParams({requestPermissions: this._requestPermissions, getHeaderButtonColor: this._getHeaderButtonColor});

        try {
            await this._requestPermissions();
        } catch (e) {
            console.log('nothing to worry about... ', e);
        }
    }

    _resetScanner = () => {
        this.setState({scanned: false});
    }

    _requestPermissions = async () => {

        if (this.state.permissionGranted) {
            console.log('access already granted. early exit');
            return Promise.resolve('early-exit');
        };

        try {
            const {status} = await Permissions.askAsync(Permissions.CAMERA);

            this.setState(() => {
                return {...this.state, permissionGranted: status === 'granted'}
            }, () => {
                console.log('permission set to: ', status);
            });
        
        return Promise.resolve();

        } catch (e) {
            throw new Error(e);
        }
        
    }

    _getHeaderButtonColor = !this.state.permissionGranted ? '#434A54' : '#0092EF';
    
    _onBarCodeRead = data => {
        console.log('barcode read with data: ', data);
        this.setState(() => {
            return {...this.state, scanned: true}
        })
        Vibration.vibrate(500);
        this.props.navigation.navigate('CodeDetail', {barCode: data});
    }

    render () {

        const {permissionGranted, scanned} = this.state;
        const buttonBackgroundColor = permissionGranted ? '#434A54' : '#0092EF';

        let readerJSX;

        if (permissionGranted === null) {
            readerJSX = (
                <Text
                    style={[styles.contentTextStyle, styles.defaultTextStyle]}
                >
                    Waiting for permissions to access the camera
                </Text>
            );
        } else if (permissionGranted === false) {
            readerJSX = (
                <Text
                    style={[styles.contentTextStyle, styles.warningTextStyle]}
                >
                    Camera access was not granted. Click the button to request permissions again
                </Text>
            );
        } else {
            readerJSX = (
                <View style={{flex: 1, width: '100%'}}>
                    <BarCodeScanner 
                        onBarCodeRead={!scanned ? this._onBarCodeRead : () => {}}
                        style={StyleSheet.absoluteFill}
                    />
                </View>
            );
        }

        const readerContainerStyleEx = {};

        if (scanned) readerContainerStyleEx.borderColor = '#E22531';

        return (
            <View style={styles.containerStyle}>
                {
                    scanned ? (
                        <Button 
                            onPress={this._resetScanner}
                            title="Reset Scanner"
                        />
                    ) : undefined
                }
                <View
                    style={[styles.readerContainerStyle, readerContainerStyleEx]}
                >
                    {readerJSX}
                </View>
                <Text
                    style={[styles.contentTextStyle, styles.infoTextStyle]}
                >
                    Position the Bar / QR code within the square above to scan it and see the details
                </Text>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        display: 'flex',
        flex: 1,
        padding: 24
    },
    readerContainerStyle: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        marginTop: 8,
        padding: 16,
        width: '100%',
        borderWidth: 2,
        borderColor: '#0092EF'
    },
    contentTextStyle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center'
    },
    defaultTextStyle: {
        color: '#666666'
    },
    warningTextStyle: {
        color: '#E7402A'
    },
    infoTextStyle: {
        color: '#42C1ED',
        fontSize: 13,
        fontWeight: '300',
        letterSpacing: 1.15,
        marginTop: 8
    }
}

export default QRScreen;