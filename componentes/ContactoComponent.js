import React, { Component } from 'react';
import {  Button, Text} from 'react-native';
import { Card } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';
import { colorGaztaroaOscuro } from '../comun/comun';


class Contacto extends Component {
    enviarMail() {
        MailComposer.composeAsync({
            recipients: ['gaztaroa@gaztaroa.com'],
            subject: '',
            body: ''
        });
    }
    render() {
        return(
            <Card>
                <Card.Title>Información de contacto</Card.Title>
                <Card.Divider/>
                <Text style={{margin: 10}}>
                Kaixo Mendizale!{'\n'}{'\n'}
                Si quieres participar en las salidas de montaña que organizamos o quieres hacerte soci@ de Gaztaroa, puedes contactar con nosotros a través de diferentes medios. Puedes llamarnos por teléfono los jueves de las semanas que hay salida (de 20:00 a 21:00). También puedes ponerte en contacto con nosotros escribiendo un correo electrónico, o utilizando la aplicación de esta página web. Y además puedes seguirnos en Facebook.{'\n'}{'\n'}
                Para lo que quieras, estamos a tu disposición!{'\n'}{'\n'}
                Tel: +34 948 277151{'\n'}{'\n'}
                Email: gaztaroa@gaztaroa.com
                </Text>
                <Button
                    title='Enviar mail'
                    buttonStyle={{ backgroundColor: colorGaztaroaOscuro }}
                    onPress={this.enviarMail}
                />
            </Card>        
            );
    }
}

export default Contacto;