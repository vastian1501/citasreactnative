import React from 'react';
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Communications from "react-native-communications";
import { StyleSheet, Text, View, TouchableHighlight, Linking} from 'react-native';

export default function Citas({item, eliminarCitas}) {
    const dialogoEliminar = id => {
        console.log('Eliminando...', id);
        eliminarCitas(id);
    }
    
    //Funcion para mandar Whatsapp
    const sendWhatsApp = () => {
        let phoneWithCountryCode = item.cliente.numero ;
        
        let mobile = Platform.OS == 'ios' ? phoneWithCountryCode : '+34' + phoneWithCountryCode;
        if (mobile) {
            let url = 'whatsapp://send?' + 'phone=' + mobile;
            Linking.openURL(url).then((data) => {
            }).catch(() => {
                alert('Make sure WhatsApp installed on your device');
            });
        } else {
            alert('Please insert mobile no');
        }
    }
    
    const fechaNuevaCita= new Date(item.fechaCita);
    
    return (
        <View style={styles.cita}>
            <Text style={styles.listaTitulo}>Cliente:</Text>
            <Text style={styles.lista}>{item.cliente.nombre}</Text>
            <Text style={styles.listaTitulo}>Manos:</Text>
            <Text style={styles.lista}>{item.manos}</Text>
            <Text style={styles.listaTitulo}>Pies:</Text>
            <Text style={styles.lista}>{item.pies}</Text>
            <Text style={styles.listaTitulo}>Fecha de la cita:</Text>
            <Text style={styles.lista}>
                {fechaNuevaCita.getDate() +
                    "/" +
                    (fechaNuevaCita.getMonth() + 1) +
                    "/" +
                    fechaNuevaCita.getFullYear()}
            </Text>
            <Text style={styles.listaTitulo}>Hora:</Text>
            <Text style={styles.lista}>{item.hora}</Text>
            <Text style={styles.listaTitulo}>Comentarios:</Text>
            <Text style={styles.lista}>{item.comentarios}</Text>
            <View style={styles.contenedor}>
                <Button
                    color={"red"}
                    buttonStyle={{ backgroundColor: "#5D534A", margin: 0 }}
                    icon={
                        <Icon
                            name="phone"
                            size={20}
                            color="white"
                            style={{ marginRight: 5 }}
                        />
                    }
                    onPress={() =>
                        Communications.phonecall(item.numeroCliente, true)
                    }
                    title="Llamar"
                />

                <Button
                    color={"red"}
                    buttonStyle={{ backgroundColor: "#69c269", margin: 0 }}
                    icon={
                        <Icon
                            name="whatsapp"
                            size={20}
                            color="white"
                            style={{ marginRight: 5 }}
                        />
                    }
                    onPress={() => sendWhatsApp()}
                    title="WhatsApp"
                />
                <Button
                    buttonStyle={{ backgroundColor: "#FF6961", margin: 0 }}
                    icon={
                        <Icon
                            name="trash"
                            size={20}
                            color="white"
                            style={{ marginRight: 5 }}
                        />
                    }
                    onPress={() => dialogoEliminar(item.id)}
                    title="Eliminar"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cita: {
        backgroundColor: "#FFF5DA",
        marginTop: 20,
        marginHorizontal: 20,
        paddingTop:15,
        textAlign: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8
    },
    lista: {
        textAlign: "left",
        margin: 5,
        marginLeft: 25,
        color: "#5D534A",
    },
    listaTitulo: {
        textAlign: "left",
        fontWeight: "bold",
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
    contenedor:{
        paddingVertical: 15,
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    btnLlamar:{

    },
    btnWhats:{

    }
});