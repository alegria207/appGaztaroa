import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Button, Modal, } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import {postFavorito, postComentario} from '../redux/ActionCreators'
import { colorGaztaroaOscuro } from '../comun/comun';

const mapStateToProps = state => {
    return {
      excursiones: state.excursiones,
      comentarios: state.comentarios,
      favoritos: state.favoritos,
    }
  }

function RenderExcursion(props) {

    const excursion = props.excursion;
    
        if (excursion != null) {
            return(
            <Card>
              <Card.Image source = {{ uri: excursion.imagen }}>
                <Card.Title style={styles.cardTitleStyle}>{excursion.nombre}</Card.Title>
              </Card.Image>
              <Text style={{margin: 20}}>
                {excursion.descripcion}
              </Text>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Icon
                  raised
                  reverse
                  name={ props.favorita ? 'heart' : 'heart-o'}
                  type='font-awesome'
                  color='#f50'
                  onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                  />
                <Icon
                  raised
                  reverse
                  name= 'pencil'
                  type='font-awesome'
                  color={colorGaztaroaOscuro}
                  onPress={() => props.toggleModal()}
                />
              </View>

            </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComentario(props) {

  const comentarios = props.comentarios;
          
  const renderCommentarioItem = ({item, index}) => {
      
      return (
          <View key={index} style={{margin: 10}}>
              <Text style={{fontSize: 14}}>{item.comentario}</Text>
              <Text style={{fontSize: 12}}>{item.valoracion} Stars</Text>
              <Text style={{fontSize: 12}}>{'-- ' + item.autor + ', ' + item.dia} </Text>
          </View>
      );
  };
  
  return (
      <Card>
        <Card.Title>Comentarios</Card.Title>
        <Card.Divider/>
        <FlatList 
            data={comentarios}
            renderItem={renderCommentarioItem}
            keyExtractor={item => item.id.toString()}
            />
      </Card>
  );
}

const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario)),
})


class DetalleExcursion extends Component {

  constructor(props) {
    super(props);
    this.state = {
        showModal: false,
        valoracion:3,
        autor: '',
        comentario:'',
    }
  }

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal});
  }

  resetModal() {
    this.setState({
        showModal: false,
        valoracion: 3,
    });
  }

  gestionarComentario(excursionId) {
    this.props.postComentario(excursionId, this.state.valoracion, this.state.autor, this.state.comentario);
    this.resetModal();
  }


  render(){
    const {excursionId} = this.props.route.params;

    return(
        <ScrollView>

            <RenderExcursion
                excursion={this.props.excursiones.excursiones[+excursionId]}
                favorita={this.props.favoritos.some(el => el === excursionId)}
                toggleModal={() => this.toggleModal()}
                onPress={() => this.marcarFavorito(excursionId)}
            />

            <RenderComentario
              comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
            />

            <Modal 
                animationType = {"slide"} 
                transparent = {false}
                visible = {this.state.showModal}
                onDismiss = {() => {this.toggleModal(); this.resetModal();}}
                onRequestClose = {() => {this.toggleModal(); this.resetModal();}}>
                <View style = {styles.modal}>
                    <Rating showRating fractions={0} 
                    startingValue={this.state.valoracion} 
                    onFinishRating={valoracion => this.setState({ valoracion: valoracion })}
                    />
                    <Input
                      placeholder="Autor"
                      leftIcon={{ type: 'font-awesome', name: 'user-o',  margin: 10 }}
                      onChangeText={autor => this.setState({ autor: autor })}
                    />
                    <Input
                      placeholder="Comentario"
                      leftIcon={{ type: 'font-awesome', name: 'comment-o',  margin: 10  }}
                      onChangeText={comentario => this.setState({ comentario: comentario })}
                    />

                    <Button
                        onPress = {() =>{this.gestionarComentario(excursionId);}}
                        title="Enviar" 
                        color={colorGaztaroaOscuro}
                    />
                    <Text> </Text>
                    <Button 
                        onPress = {() =>{this.toggleModal(); this.resetModal();}}
                        title="Cancelar" 
                        color={colorGaztaroaOscuro}
                    />
                </View>
              </Modal>

        </ScrollView>
    );
  } 
}

const styles = StyleSheet.create({
    cardTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
    },
    modal: {
      justifyContent: 'center',
      margin: 20
  },
  });

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);