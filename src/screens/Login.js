import { Text, View, Pressable, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { auth } from '../firebase/config';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errores, setErrores] = useState('');

    function onSubmit(email, password) {
        if (!email.includes('@')) {
            setErrores("Email mal formateado")
            return
        }
        if (password.length < 6) {
            setErrores("La password debe tener una longitud mínima de 6 caracteres")
            return 
        } 

        auth.signInWithEmailAndPassword(email, password)
            .then((response) => {
                props.navigation.navigate('HomeMenu');
            })
            .catch(error => {
                const errorparseado = JSON.parse(error.message)
                console.log('ERRROR', errorparseado)
                setErrores(errorparseado.error.message)
            });
    }
    
    auth.onAuthStateChanged(user => {
        if (user) {
            props.navigation.navigate('HomeMenu')
        }
    });

// esto para ver que en la consola las cosas se guarden bien.

return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Ingresar</Text>
        <Text style={styles.texto}>Esta es la pantalla que debe ir el formulario de Login.</Text>

        <View style={styles.containerFrom}>
            <TextInput style={styles.input}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => setEmail(text)}
                value={email} />
            
            <TextInput style={styles.input}
                keyboardType='default'
                placeholder='password'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password} />

            {
                errores !== '' ?
                    <Text style={styles.textoError}>{errores}</Text>
                    :
                    null
            }

            <Pressable onPress={() => onSubmit(email, password)} style={styles.boton3}>
                <Text style={styles.textoBoton} >Ingresar</Text>
            </Pressable>
        </View>



        <Pressable onPress={() => props.navigation.navigate('Register')} style={styles.boton1}>
            <Text style={styles.textoBoton}>No tengo cuenta</Text>
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
    texto: {
        fontSize: 15,
        padding: 10,
    },
    boton1: {
        backgroundColor: '#a1d7f0e5',
        padding: 14,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        marginTop: 15
    },
    boton2: {
        backgroundColor: '#a1d7f0e5',
        padding: 14,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        marginTop: 15
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
    boton3: {
        backgroundColor: 'pink',
        padding: 14,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        marginTop: 15
    }, 
    textoError: {
        color: 'red',
        fontWeight: '600',
    }
});


export default Login;
