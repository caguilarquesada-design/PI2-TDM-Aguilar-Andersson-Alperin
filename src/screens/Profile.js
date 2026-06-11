import { Text, View, Pressable, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import Post from '../components/Post';

function Profile(props) {

    const [usuario, setUsuario] = useState(null);
    const [posteos, setPosteos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        db.collection("users")
            .where("email", "==", auth.currentUser.email)
            .onSnapshot(docs => {
                docs.forEach(doc => {
                    setUsuario({
                        id: doc.id,
                        data: doc.data()
                    });
                });
            });

        db.collection("posts")
            .where("email", "==", auth.currentUser.email)
            .onSnapshot(docs => {
                let posts = [];

                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });

                setPosteos(posts);
                setLoading(false);
            });
    }, []);

    function logout() {
        auth.signOut()
            .then(() => {
                props.navigation.navigate("Login");
            })
            .catch(error => console.log(error));

    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Mi Perfil</Text>

            {
                usuario !== null ?
                    <View style={styles.datosUsuario}>
                        <Text style={styles.nombreUsuario}>{usuario.data.userName}</Text>
                        <Text style={styles.emailUsuario}>{usuario.data.email}</Text>
                    </View>

                    :

                    <View style={styles.datosUsuario}>
                        <Text style={styles.nombreUsuario}>Usuario</Text>

                        <Text style={styles.emailUsuario}>{auth.currentUser.email}</Text>
                    </View>
            }
            <Text style={styles.subtitulo}>Últimos posteos</Text>

            {
                loading ?
                    <Text>Cargando posteos...</Text>

                    :
                    <FlatList
                        data={posteos}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Post
                                post={item}
                                navigation={props.navigation}
                            />
                        )}
                    />
            }

            <Pressable onPress={() => logout()} style={styles.botonLogout}>
                <Text style={styles.textoLogout}>Cerrar sesión</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },

    titulo: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        color: 'black',
    },

    datosUsuario: {
        backgroundColor: 'white',
        padding: 18,
        borderRadius: 15,
        marginBottom: 20,
    },

    nombreUsuario: {
        fontSize: 22,
        fontWeight: "bold",
        paddingBottom: 10
    },

    emailusuario: {
        fontSize: 15,
        color: 'grey',
    },

    subtitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    botonLogout: {
        backgroundColor: "pink",
        padding: 14,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        marginTop: 15,
        position: 'bottom'

    },
    textoLogout: {
        fontSize: 17,
        fontWeight: 'bold',
    },

})

export default Profile;
