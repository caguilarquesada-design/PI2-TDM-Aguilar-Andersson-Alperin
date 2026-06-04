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
                    email: auth.currentUser.email,
                    userName: auth.currentUser.userName,
                    createdAt: Date.now(),
                })
                    .then( () => props.navigation.navigate('Login'))
                    .catch(e => console.log(e))
            })
            .catch(error => {
                console.log(error)
                setErrores('Fallo en el registro.')
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

                <Pressable onPress={() => onSubmit(email, password)} style={styles.boton1}>
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
        padding: 25,
        width: '100%',
        backgroundColor: '#f2f2f2',
    },
    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    boton: {
        backgroundColor: '#4db6e8',
        padding: 13,
        borderRadius: 5,
        marginBottom: 12,
        alignItems: 'center',
    },
    textoBoton: {
        color: '#fff',
        fontWeight: '600',
    },
    containerFrom: {
        paddingHorizontal: 10,
        marginTop: 20,
    },
    input: {
        height: 20,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
    },
    boton1: {
        backgroundColor: '#28a745',
        paddingVertical: 6,
        paddingHorizontal: 10,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#28a745',
        borderRadius: 4,
    },
    textoError: {
        color: 'red',
        fontWeight: '600',
    }
});



export default Register; 