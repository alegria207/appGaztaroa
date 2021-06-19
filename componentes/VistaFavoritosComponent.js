import React, { Component } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { SafeAreaView, FlatList, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';
import Swipeout from 'react-native-swipeout';
import {borrarFavorito} from '../redux/ActionCreators'

const mapStateToProps = state => {
    return {
      excursiones: state.excursiones,
      favoritos: state.favoritos
    }
  }

  const mapDispatchToProps = dispatch => ({
    borrarFavorito: (excursionId) => dispatch(borrarFavorito(excursionId)),
})


class VistaFavoritos extends Component {

    mostrarAlerta = (item) =>
        Alert.alert(
            "Borrar excursión favorita?",
            "Confirme que desea borrar la excursión: " + item.nombre,
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log(item.nombre + ' Favorito no borrado'),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.props.borrarFavorito(item.id) }
            ],
            { cancelable: false }
        );

    render(){

        const { navigate } = this.props.navigation;    

        const renderFavoritoItem = ({item, index}) => {
            
            const rightButton = [
                {
                    text: 'Borrar', 
                    type: 'delete',
                    onPress: () => {this.mostrarAlerta(item)}
                }
            ];
        
            return (
                <Swipeout right={rightButton} autoClose={true}>
            
                    <ListItem
                        key={index}
                        onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                        onLongPress={() => {this.mostrarAlerta(item)}}
                        bottomDivider>
                        <Avatar source={{uri: item.imagen}} />
                        <ListItem.Content>
                            <ListItem.Title>{item.nombre}</ListItem.Title>
                            <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem> 
                </Swipeout>
            );
        };

        if (this.props.excursiones.isLoading) {
            return(
                <IndicadorActividad />
            );
        }

        else if (this.props.excursiones.errMess) {
            return(
                <View> 
                    <Text>{props.errMess}</Text>
                </View>
            );
        }
        
        else { 
            let excursiones_favoritas = [];
            for (var i = 0; i < this.props.favoritos.length; i++) {
                excursiones_favoritas.push(this.props.excursiones.excursiones[this.props.favoritos[i]]);
            }
            return (
                <SafeAreaView>
                    <FlatList 
                        data={excursiones_favoritas}
                        renderItem={renderFavoritoItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </SafeAreaView>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VistaFavoritos);