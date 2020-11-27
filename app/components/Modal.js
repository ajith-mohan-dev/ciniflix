import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppStyles from '../utils/AppStyles';

class ModalComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.constructor.name, 'constructor');

    this.state = {};
  }

  clocePopUp = () => {
    console.log('modal close called');
    this.props.cancelModal;
  };

  render() {
    console.log('check modal item', this.props);
    return (
      <Dialog
        visible={this.props.scaleAnimationDialog}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        dialogStyle={{backgroundColor: AppStyles.color.COLOR_GREY_ROUND}}
        onTouchOutside={this.clocePopUp}>
        <DialogContent style={{width: wp('90%')}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity onPress={this.clocePopUp}>
              <Icon
                name="close"
                size={19}
                color={AppStyles.color.COLOR_TEXT_BLACK}
                style={{marginRight: -10, marginTop: 3}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 15,
            }}>
            <Image
              source={{
                uri: this.props.item.image.original,
              }}
              style={{
                width: wp('75%'),
                height: hp('30%'),
                borderRadius: 4,
                resizeMode: 'stretch',
                alignItems: 'center',
                // resizeMode: 'contain',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginHorizontal: 15,
            }}>
            <Text
              style={{
                fontFamily: AppStyles.fonts.REGULAR,
                fontSize: 16,
                color: AppStyles.color.COLOR_TEXT_BLACK,
              }}
              numberOfLines={1}>
              Title : {this.props.item.name}{' '}
            </Text>
            <Text
              style={{
                fontFamily: AppStyles.fonts.REGULAR,
                fontSize: 16,
                color: AppStyles.color.COLOR_TEXT_BLACK,
              }}
              numberOfLines={3}>
              Description : {this.props.item.summary}{' '}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginHorizontal: 15,
            }}>
            <Text
              style={{
                fontFamily: AppStyles.fonts.REGULAR,
                fontSize: 16,
                color: AppStyles.color.COLOR_TEXT_BLACK,
              }}
              numberOfLines={1}>
              Episode {this.props.item.id}
            </Text>
            <Text
              style={{
                fontFamily: AppStyles.fonts.REGULAR,
                fontSize: 16,
                color: AppStyles.color.COLOR_TEXT_BLACK,
              }}>
              {this.props.item.runtime + ' ' + 'Mins'}
            </Text>
          </View>
        </DialogContent>
      </Dialog>
    );
  }
}

export default ModalComponent;
