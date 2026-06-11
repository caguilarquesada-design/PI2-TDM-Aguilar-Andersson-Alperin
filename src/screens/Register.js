import { Text, View, Pressable, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { db, auth } from '../firebase/config';

function Register(props) {

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errores, setErrores] = useState('');

    function onSubmit(email, password, userName) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                db.collection('users').add({
                    email: email,
                    userName: userName,
                    createdAt: Date.now(),
                })
                    .then( () => props.navigation.navigate('Login'))
                    .catch(e => console.log(e))
            })
            .catch(error => {
                console.log(error)
                setErrores(error.message)
            })
    }; 

    return (
        <View style={styles.container}>
            <Text style={styles.titulo} >Formulario Register</Text>
            <View style={styles.containerFrom}>
                <TextInput style={styles.input}
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => setEmail(text)}
                    value={email} />

                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='userName'  
                    
                    onChangeText={text => setUserName(text)}
                    value={userName} />

                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password} />

                {
                    errores !== '' ? <Text style={styles.textoError}>{errores}</Text>
                        :
                        null
                }

                <Pressable onPress={() => onSubmit(email, password, userName)} style={styles.boton1}>
                    <Text style={styles.textoBoton} >Registrarse</Text>
                </Pressable>
            </View>

            <Pressable onPress={() => props.navigation.navigate('Login')} style={styles.boton}>
                <Text style={styles.textoBoton} >Ya tengo cuenta</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    boton: {
        backgroundColor: 'pink',
        padding: 14,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        marginTop: 15,
    },
    textoBoton: {
        fontSize: 17,
        color: 'black',
        fontWeight: '600',
    },
    containerFrom: {
        paddingHorizontal: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    input: {
        height: 20,
        margin: 5,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    boton1: {
        backgroundColor: '#a1d7f0e5',
        padding: 14,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        marginTop: 15,
    },
    textoError: {
        color: 'red',
        fontWeight: '600',
    }
});



export default Register; 