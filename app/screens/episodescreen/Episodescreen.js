import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppStyles from '../../utils/AppStyles';
import Icon from 'react-native-vector-icons/Fontisto';
import ClearIcon from 'react-native-vector-icons/MaterialIcons';
import StarIcon from 'react-native-vector-icons/FontAwesome';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import moment from 'moment';
import {Picker} from '@react-native-community/picker';
import {color} from 'react-native-reanimated';
import ModalComponent from '../../components/Modal';

class EpisodeScreen extends Component {
  constructor(props) {
    super(props);

    console.log(JSON.stringify(props), 'constructor');
    this.state = {
      getSeriesItem: props.route.params.item.item,
      showLoader: false,
      seriesBanner: props.route.params.item.item.show.image.original,
      episodeData: [],
      selectedSeason: 'Select Season',
      scaleAnimationDialog: false,
      getEpisodeModalData: [],
    };
    console.log('getSeriesItem', this.state.getSeriesItem);
  }

  static getDerivedStateFromProps(props) {
    console.log('check props data', props);
    return {
      // data: props,
    };
  }

  getEpisodeModalData = (item) => {
    this.setState({
      scaleAnimationDialog: true,
      getEpisodeModalData: item,
    });
  };

  renderItem = ({item, index}) => {
    console.log('render item', item);
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.getEpisodeModalData({item: item})}>
          <View
            style={{
              height: hp('20%'),
              backgroundColor: AppStyles.color.COLOR_GREY,
              marginBottom: 4,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <Image
                source={{
                  uri: item.image.original,
                }}
                style={{
                  width: wp('50%'),
                  height: hp('25%'),
                  marginRight: 10,
                  marginLeft: 5,
                  borderRadius: 2,
                  alignItems: 'center',
                  resizeMode: 'center',
                }}
              />
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontFamily: AppStyles.fonts.REGULAR,
                    fontSize: 16,
                    color: AppStyles.color.COLOR_LIGHTWHITE,
                    fontWeight: 'bold',
                    paddingLeft: 10,
                    paddingVertical: 5,
                    width: wp('58%'),
                  }}
                  numberOfLines={1}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: AppStyles.fonts.REGULAR,
                    fontSize: 14,
                    color: AppStyles.color.COLOR_PISTA,
                    fontWeight: '900',
                    paddingLeft: 10,
                    paddingVertical: 5,
                  }}>
                  {moment(item.airdate, 'YYYY MM DD').format('YYYY') ==
                  'Invalid date'
                    ? 2000
                    : moment(item.airdate, 'YYYY MM DD').format('YYYY')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: AppStyles.fonts.REGULAR,
                    fontSize: 13,
                    color: AppStyles.color.COLOR_LIGHTWHITE,

                    paddingLeft: 10,
                  }}
                  numberOfLines={1}>
                  Episode {item.id}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                <Text
                  style={{
                    fontFamily: AppStyles.fonts.REGULAR,
                    fontSize: 13,
                    color: AppStyles.color.COLOR_LIGHTWHITE,

                    paddingLeft: 10,
                    paddingVertical: 5,
                  }}
                  numberOfLines={1}>
                  {moment(item.airdate, 'YYYY MM DD').format('YYYY')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                <Text
                  style={{
                    fontFamily: AppStyles.fonts.REGULAR,
                    fontSize: 13,
                    color: AppStyles.color.COLOR_PISTA,
                    fontWeight: '900',
                    paddingLeft: 10,
                    paddingVertical: 5,
                  }}>
                  {item.runtime + ' ' + 'Mins'}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  onChangeSeason = (item) => {
    console.log('onChangeSeason', item);
    this.setState({
      selectedSeason: item,
      showLoader: true,
    });

    try {
      fetch('http://api.tvmaze.com/seasons/1/episodes', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('serachresult', JSON.stringify(responseJson));
          if (responseJson) {
            this.setState({
              episodeData: responseJson,
            });
          } else {
          }
        });
    } catch (err) {
      console.log(TAG, 'ERROR = ' + err);
    } finally {
      this.setState({showLoader: false});
    }
  };

  cancelModal = () => {
    console.log('has been called');
    this.setState({scaleAnimationDialog: false});
  };

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{backgroundColor: Colors.lighter}}> */}
        <View
          style={{
            backgroundColor: AppStyles.color.COLOR_LIGHT_BLACK,
            width: wp('100%'),
            height: hp('100%'),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 15,
            }}>
            <Image
              source={{
                uri: this.state.seriesBanner,
              }}
              style={{
                width: wp('95%'),
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
                color: AppStyles.color.COLOR_LIGHTWHITE,
              }}
              numberOfLines={1}>
              Title : {this.state.getSeriesItem.show.name}{' '}
            </Text>
            <Text
              style={{
                fontFamily: AppStyles.fonts.REGULAR,
                fontSize: 16,
                color: AppStyles.color.COLOR_LIGHTWHITE,
              }}
              numberOfLines={3}>
              Description : {this.state.getSeriesItem.show.summary}{' '}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              marginHorizontal: 15,
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontFamily: AppStyles.fonts.REGULAR,
                fontSize: 17,
                color: AppStyles.color.COLOR_LIGHTWHITE,
              }}
              numberOfLines={1}>
              Season :
            </Text>
            <Picker
              selectedValue={this.state.selectedSeason}
              style={{
                height: hp('4%'),
                width: wp('40%'),
                color: AppStyles.color.COLOR_PISTA,
                marginLeft: 5,
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.onChangeSeason(itemValue)
              }>
              <Picker.Item label="Select Season " value="Select Season " />
              <Picker.Item label="Season 1" value="Season 1" />
              <Picker.Item label="Season 2" value="Season 2" />
            </Picker>
          </View>

          <View>
            <FlatList
              data={this.state.episodeData}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => item + index}
              //   onEndReached={this.handleLoadMore}
              // onEndReachedThreshold={0.3}
              // onRefresh={() => this.onRefresh()}
              // refreshing={this.state.isFetching}
              extraData={this.state.episodeData}
            />
          </View>
          {this.state.showLoader && <Loader />}
          {this.state.scaleAnimationDialog && (
            <ModalComponent
              scaleAnimationDialog={this.state.scaleAnimationDialog}
              cancelModal={this.cancelModal}
              {...this.state.getEpisodeModalData}
            />
          )}
        </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    );
  }
}

export default EpisodeScreen;
