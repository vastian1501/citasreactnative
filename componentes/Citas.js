import React, { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Communications from "react-native-communications";
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Linking,
    ScrollView,
    Alert,
} from "react-native";
import firebase from "../database/Firebase";

export default function Citas(props) {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        firebase.db.collection("citas").orderBy("hora","asc").onSnapshot((querySnapshot) => {
            const citas = [];

            querySnapshot.docs.forEach((doc) => {
                const {
                    nombre,
                    apellidos,
                    telefono,
                    manos,
                    pies,
                    fechaDb,
                    fecha,
                    hora,
                    comentarios,
                } = doc.data();

                citas.push({
                    id: doc.id,
                    nombre,
                    apellidos,
                    telefono,
                    manos,
                    pies,
                    fechaDb,
                    fecha,
                    hora,
                    comentarios,
                });
            });

            setCitas(citas);

            //Ordenar citas por fecha

            const sortByDate = () => {
                const sortFechas = [...citas].sort((a, b) => {
                    a = new Date(a.fechaDb);
                    b = new Date(b.fechaDb);
                    return b > a ? -1 : b < a ? 1 : 0;
                });
                setCitas(sortFechas);
            };
            sortByDate();
        });
    }, []);

    const eliminarCitas = async (id) => {
        //setLoading(true);
        const dbRef = firebase.db
            .collection("citas")
            .doc(id);
        await dbRef.delete();
        //props.navigation.navigate("listaUsuario");
    };

    const confirnmDelete = (id) => {
        Alert.alert(
            "Eliminar cita",
            "¿Desea eliminar la cita ?",
            [
                { text: "Eliminar", onPress: () => eliminarCitas(id) },
                { text: "No", onPress: () => console.log(false) },
            ]
        );
    };

    //Funcion para mandar Whatsapp
    const sendWhatsApp = (numero) => {
        let phoneWithCountryCode = numero;

        let mobile =
            Platform.OS == "ios"
                ? phoneWithCountryCode
                : "+34" + phoneWithCountryCode;
        if (mobile) {
            let url = "whatsapp://send?" + "phone=" + mobile;
            Linking.openURL(url)
                .then((data) => {})
                .catch(() => {
                    alert("Make sure WhatsApp installed on your device");
                });
        } else {
            alert("Please insert mobile no");
        }
    };

    return (
        <ScrollView>
            {citas.map((cita) => {
                return (
                    <View style={styles.cita} key={cita.id}>
                        <Text style={styles.listaTitulo}>Cliente:</Text>
                        <Text style={styles.lista}>
                            {cita.nombre} {cita.apellidos}
                        </Text>
                        <Text style={styles.listaTitulo}>Manos:</Text>
                        <Text style={styles.lista}>{cita.manos}</Text>
                        <Text style={styles.listaTitulo}>Pies:</Text>
                        <Text style={styles.lista}>{cita.pies}</Text>
                        <Text style={styles.listaTitulo}>
                            Fecha de la cita:
                        </Text>
                        <Text style={styles.lista}>{cita.fecha}</Text>
                        <Text style={styles.listaTitulo}>Hora:</Text>
                        <Text style={styles.lista}>{cita.hora}</Text>
                        <Text style={styles.listaTitulo}>Comentarios:</Text>
                        <Text style={styles.lista}>{cita.comentarios}</Text>
                        <View style={styles.contenedor}>
                            <Button
                                color={"red"}
                                buttonStyle={{
                                    backgroundColor: "#5D534A",
                                    margin: 0,
                                }}
                                icon={
                                    <Icon
                                        name="phone"
                                        size={20}
                                        color="white"
                                        style={{ marginRight: 5 }}
                                    />
                                }
                                onPress={() =>
                                    Communications.phonecall(
                                        cita.telefono,
                                        true
                                    )
                                }
                                title="Llamar"
                            />

                            <Button
                                color={"red"}
                                buttonStyle={{
                                    backgroundColor: "#69c269",
                                    margin: 0,
                                }}
                                icon={
                                    <Icon
                                        name="whatsapp"
                                        size={20}
                                        color="white"
                                        style={{ marginRight: 5 }}
                                    />
                                }
                                onPress={() => sendWhatsApp(cita.telefono)}
                                title="WhatsApp"
                            />
                            <Button
                                buttonStyle={{
                                    backgroundColor: "#FF6961",
                                    margin: 0,
                                }}
                                icon={
                                    <Icon
                                        name="trash"
                                        size={20}
                                        color="white"
                                        style={{ marginRight: 5 }}
                                    />
                                }
                                onPress={() => confirnmDelete(cita.id)}
                                title="Eliminar"
                            />
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    cita: {
        backgroundColor: "#fdffb6",
        marginTop: 20,
        marginHorizontal: 20,
        paddingTop: 15,
        textAlign: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
    },
    lista: {
        textAlign: "left",
        margin: 5,
        marginLeft: 25,
        fontWeight: "600",
        color: "#5D534A",
    },
    listaTitulo: {
        textAlign: "left",
        fontWeight: "700",
        fontSize: 18,
        color: "#5D534A",
        marginTop: 5,
        marginLeft: 20,
    },
    textoBtnEliminar: {
        color: "#EDF6E5",
        fontSize: 15,
        textAlign: "center",
    },
    contenedor: {
        paddingVertical: 15,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    btnLlamar: {},
    btnWhats: {},
});
