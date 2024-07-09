import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONT_FAMILY } from '@constants/theme';
import { useAuthStore } from '@stores/auth';

constSplashScreen = () => {
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const setLoggedInUser = useAuthStore(state => state.login)


    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'Urbanist-Black': require('@assets/fonts/Urbanist/Urbanist-Black.ttf'),
                'Urbanist-Bold': require('@assets/fonts/Urbanist/Urbanist-Bold.ttf'),
                'Urbanist-ExtraBold': require('@assets/fonts/Urbanist/Urbanist-ExtraBold.ttf'),
                'Urbanist-ExtraLight': require('@assets/fonts/Urbanist/Urbanist-ExtraLight.ttf'),
                'Urbanist-Light': require('@assets/fonts/Urbanist/Urbanist-Light.ttf'),
                'Urbanist-Medium': require('@assets/fonts/Urbanist/Urbanist-Medium.ttf'),
                'Urbanist-Regular': require('@assets/fonts/Urbanist/Urbanist-Regular.ttf'),
                'Urbanist-SemiBold': require('@assets/fonts/Urbanist/Urbanist-SemiBold.ttf'),
                'Urbanist-Thin': require('@assets/fonts/Urbanist/Urbanist-Thin.ttf'),
            });
            setFontsLoaded(true);
        }
        loadFonts();
    }, []);

    useEffect(() => {
        async function checkUserData() {
            const storedUserData = await AsyncStorage.getItem('userData');
            if (storedUserData) {
                const userData = JSON.parse(storedUserData);
                setLoggedInUser(userData);
                // Reset the navigation stack to prevent going back to the splash screen
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AppNavigator' }],
                });
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }],
                });
            }
        }
        if (fontsLoaded) {
            const timeout = setTimeout(() => {
                checkUserData()
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [fontsLoaded, navigation]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('@assets/images/Splash/splash.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.versionText}>Version 1.0.2</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    versionText: {
        position: 'absolute',
        bottom: 30,
        fontSize: 16,
        marginTop: 20,
        color: COLORS.primaryThemeColor,
        fontFamily: FONT_FAMILY.urbanistBold,
    },
});

export default SplashScreen;
