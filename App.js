import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ViewComponent } from "react-native";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button, Avatar } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Principal from './screens/Principal';
import Formulario from './screens/Formulario';
const Tab = createBottomTabNavigator();

export default function App() {
    const fecha = Date.now();
    const hoy = new Date(fecha);
    const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
    };
    const hoyFecha = hoy.toLocaleDateString("es-ES", options);
    const dias = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
    ];
    const fechaNueva =
        dias[hoy.getDay()] +
        " " +
        hoy.getDate() +
        "/" +
        (hoy.getMonth() + 1) +
        "/" +
        hoy.getFullYear();
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="citas"
                    component={Principal}
                    options={{
                        headerRight: () => (
            <View style={{marginRight:20,}}>
                <Text>{fechaNueva}</Text>
            </View>),
                        headerTitle: "Lulys Nails",
                        tabBarLabel: "Citas",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="calendar"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Nueva Cita"
                    component={Formulario}
                    options={{
                        tabBarLabel: "Nueva cita",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="note-plus"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}


