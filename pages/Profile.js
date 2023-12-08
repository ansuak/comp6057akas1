import { StyleSheet, Text, TextInput, View} from 'react-native';
import ChangePasswordScreen from "./ChangePasswordScreen";
import {useState} from "react";

export default function Profile({route}) {
    const [email, setEmail] = useState('');
    const user = route.params.username;
    return(
        <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>
            <Text style={styles.sub_header}>{user}</Text>
            <Text >Bio</Text>
            <TextInput style={styles.input}
                       placeholder="Email:">
            </TextInput>
            <ChangePasswordScreen></ChangePasswordScreen>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15
    },
    header: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#088F8F',
        fontSize: 20,
        margin: 5
    },
    sub_header: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#088F8F',
        fontSize: 15,
        margin: 5
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 5
    },
    button: {
        color: '#FF5733',
        padding: 5,
        margin: 10,
    }
});