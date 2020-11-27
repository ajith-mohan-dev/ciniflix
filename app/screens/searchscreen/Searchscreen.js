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

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    console.log(this.constructor.name, 'constructor');
    this.state = {
      searchVal: '',
      showLoader: false,
      seriesData: [],
      noDataAvailable: ' Search Your Movie ',
    };
  }

  searchSeries = () => {
    if (this.state.searchVal.length === 0) {
      this.setState({
        noDataAvailable: 'Please Enter Something To Search',
      });
    } else {
      this.setState({showLoader: true});
      try {
        fetch('http://api.tvmaze.com/search/shows?q=' + this.state.searchVal, {
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
            if (Array.isArray(responseJson) && responseJson.length > 0) {
              this.setState({
                seriesData: responseJson,
              });
            } else {
              this.setState({
                seriesData: [],
                noDataAvailable: 'No Movies Available',
              });
            }
          });
      } catch (err) {
        console.log(TAG, 'ERROR = ' + err);
      } finally {
        this.setState({showLoader: false});
      }
    }
  };

  navigateToNext = (item, index) => {
    console.log('home index =' + JSON.stringify(item));
    this.props.navigation.navigate('EpisodeScreen', {
      item: item,
      index: index,
    });
  };

  renderItem = ({item, index}) => {
    console.log('render item', item.show.image);
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.navigateToNext({item: item, index: index})}>
          <View
            style={{
              height: hp('20%'),
              // width: wp('100%'),
              backgroundColor: AppStyles.color.COLOR_GREY,
              // marginHorizontal: 5,
              // borderRadius: 2,
              marginBottom: 4,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              // alignItems: 'center',
            }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              {item.show.image != null ? (
                <Image
                  source={{
                    uri: item.show.image.original,
                  }}
                  style={{
                    width: wp('20%'),
                    height: hp('24%'),
                    marginHorizontal: 10,
                    borderRadius: 2,
                    alignItems: 'center',
                    resizeMode: 'contain',
                  }}
                />
              ) : (
                <View
                  style={{
                    width: wp('20%'),
                    height: hp('24%'),
                    marginHorizontal: 10,
                  }}
                />
              )}
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
                  {item.show.name}
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
                  {moment(item.show.premiered, 'YYYY MM DD').format('YYYY') ==
                  'Invalid date'
                    ? 2000
                    : moment(item.show.premiered, 'YYYY MM DD').format('YYYY')}
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
                    // paddingVertical: 5,
                    // width: wp('58%'),
                  }}
                  numberOfLines={1}>
                  {item.show.genres + '  '}
                </Text>
                {/* <Text
                  style={{
                    fontFamily: AppStyles.fonts.REGULAR,
                    fontSize: 13,
                    color: AppStyles.color.COLOR_PISTA,
                    fontWeight: '900',
                    paddingLeft: 10,
                    // paddingVertical: 5,
                  }}>
                  {item.show.runtime + ' ' + 'Mins'}
                </Text> */}
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
                    // width: wp('58%'),
                  }}
                  numberOfLines={1}>
                  {item.show.language}
                </Text>
                <Text
                  style={{
                    fontFamily: AppStyles.fonts.REGULAR,
                    fontSize: 13,
                    color: AppStyles.color.COLOR_PISTA,
                    fontWeight: '900',
                    paddingLeft: 10,
                    paddingVertical: 5,
                  }}>
                  {/* {item.show.rating.average + ' ' + 'IMDB'} */}

                  {item.show.runtime + ' ' + 'Mins'}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                {item.show.rating.average >= 7 ? (
                  <StarIcon
                    name="star"
                    size={15}
                    color={AppStyles.color.COLOR_PISTA}
                    style={{alignSelf: 'center', marginLeft: 10}}
                  />
                ) : (
                  <StarIcon
                    name="star-half-o"
                    size={15}
                    color={AppStyles.color.COLOR_PISTA}
                    style={{alignSelf: 'center', marginLeft: 10}}
                  />
                )}
                <Text
                  style={{
                    fontFamily: AppStyles.fonts.REGULAR,
                    fontSize: 13,
                    color: AppStyles.color.COLOR_PISTA,
                    fontWeight: '900',
                    paddingLeft: 10,
                    paddingVertical: 5,
                  }}>
                  {item.show.rating.average == null
                    ? 5
                    : item.show.rating.average + ' ' + 'IMDB'}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    console.log('check state Loader', this.state.seriesData);
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
              justifyContent: 'flex-start',
              alignItems: 'center',
              borderWidth: 0.8,
              borderColor: AppStyles.color.COLOR_WHITE,
              borderRadius: 5,
              marginHorizontal: wp('8%'),
              marginVertical: hp('8%'),
              height: hp('8%'),
              backgroundColor: AppStyles.color.COLOR_PISTA,
            }}>
            <TouchableOpacity onPress={this.searchSeries}>
              <Icon
                name="search"
                size={23}
                color={AppStyles.color.COLOR_BLACK}
                style={{
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </TouchableOpacity>
            <TextInput
              style={{
                height: hp('8%'),
                width: wp('63%'),
                paddingHorizontal: 8,
                fontSize: 16,
                color: AppStyles.color.COLOR_BLACK,
                fontFamily: AppStyles.fonts.REGULAR,
                // backgroundColor: AppStyles.color.COLOR_PISTA,
              }}
              onChangeText={(username) => this.setState({searchVal: username})}
              value={this.state.searchVal}
              placeholder={'Search'}
              returnKeyType="search"
              autoFocus={true}
              onSubmitEditing={this.searchSeries}
              clearButtonMode="while-editing"
              //   autoCapitalize={false}
            />
            {this.state.searchVal.length != 0 && (
              <TouchableOpacity onPress={() => this.setState({searchVal: ''})}>
                <ClearIcon
                  name="clear"
                  size={25}
                  color={AppStyles.color.COLOR_BLACK}
                />
              </TouchableOpacity>
            )}
          </View>

          <View>
            {this.state.seriesData.length <= 0 && (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: AppStyles.fonts.REGULAR,
                    color: AppStyles.color.COLOR_PISTA,
                    fontSize: 16,
                  }}>
                  {this.state.noDataAvailable}
                </Text>
              </View>
            )}
            {this.state.seriesData.length > 0 ? (
              <FlatList
                data={this.state.seriesData}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => item + index}
                //   onEndReached={this.handleLoadMore}
                // onEndReachedThreshold={0.3}
                // onRefresh={() => this.onRefresh()}
                // refreshing={this.state.isFetching}
                extraData={this.state.seriesData}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: AppStyles.fonts.REGULAR,
                    color: AppStyles.color.COLOR_PISTA,
                    fontSize: 16,
                  }}>
                  {this.state.noDataAvailable}
                </Text>
              </View>
            )}
          </View>
        </View>
        {/* </ScrollView> */}
        {this.state.showLoader && <Loader />}
      </SafeAreaView>
    );
  }
}

export default SearchScreen;
