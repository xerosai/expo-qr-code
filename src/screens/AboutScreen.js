import React from 'react';
import {Linking, ScrollView} from 'react-native';
import {SocialIcon, Text} from 'react-native-elements';

/**
 * @class AboutScreen
 * @description Class-based component that displays app details
 */
class AboutScreen extends React.Component {

    navigationOptions = {
        headerLabel: 'About App'
    }

    _openGithub = () => {
        const url = 'https://github.com/xerosai';
        Linking.canOpenURL(url).then(canOpen => {
            if (!canOpen) {
                console.log('Unable to open url: ', url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.log('Failed to open link with error: ', err));
    }

    render () {
        return (
            <ScrollView contentContainerStyle={styles.containerStyle}>
                <Text h1 style={{marginTop: 16}}>About</Text>

                <Text style={styles.normalTextStyle}>
                    I made this project because I was bored and had nothing better to do on a Sunday afternoon. Expo is pretty neat in terms of what it makes available
                    for developers to use in their apps.
                </Text>

                <Text style={styles.normalTextStyle}>
                    In reality, this is a subset of an app I was supposed to build for a client however, that has not happened yet.
                </Text>

                <Text h3 style={{marginBottom: 8}}>Additional Packages Used</Text>

                <Text style={styles.normalTextStyle}>React Navigation</Text>

                <Text style={styles.normalTextStyle}>React Native Elements</Text>

                <SocialIcon 
                    button
                    onPress={this._openGithub}
                    raised
                    style={{width: '100%'}}
                    title="I'm on Github"
                    type="github"
                />

            </ScrollView>
        );
    }
}

const styles = {
    containerStyle: {
        alignItems: 'center',
        flex: 1,
        padding: 24
    },
    normalTextStyle: {
        color: '#666',
        fontSize: 13,
        letterSpacing: 1.05,
        lineHeight: 18,
        marginBottom: 12
    }
}

export default AboutScreen;