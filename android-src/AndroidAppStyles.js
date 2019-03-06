import { StyleSheet, Dimensions } from 'react-native';

export default class AndroidAppStyles {

    constructor(props) {
        this.state = {
            screen: {
                height: Dimensions.get('screen').height,
                width: Dimensions.get('screen').width
            }
        };
    };

    index() {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#008317',
            },
            usageDiaryContainer: {
                flex: 0.4,
                paddingLeft: 15,
                paddingTop: 20,
                backgroundColor: '#008317',
                flexDirection: 'row',
            },
            usageDiary: {
                textAlign: 'left',
            },
            usageDiaryTitle: {
                marginRight: 10,
            },
            usageDiarySelectedDate: {
                textAlign: 'center',
                width: 85,
                height: 20,
                borderColor: '#FFF',
            },
            usageDiaryStatus: {
                marginTop: 5,
                marginLeft: 10,
                borderRadius: 50,
                borderWidth: 1,
                height: 10,
                width: 10,
                backgroundColor: '#71c733',
                borderColor: '#71c733',
            },
            body: {
                flex: 7,
                backgroundColor: '#fff'
            },
            bodyContainer: {
                flex: 1,
                backgroundColor: '#FFF'
            },
            footer: {
                borderTopColor: '#FFF',
                borderTopWidth: 1,
                backgroundColor: '#008317',
                flex: 1,
            },
            footerCalendar: {
                fontSize: 40,
                color: '#FFF',
                textAlign: 'center',
                fontWeight: 'bold',
            },
            fontPattern: {
                color: '#FFF',
                fontWeight: 'bold',
                fontFamily: 'Merriweather Sans'
            },
            alignCenter: {
                textAlign: 'center',
            },
            mt10: {
                marginTop: 10
            },
            inline: {
                flexDirection: 'row'
            },
            buttonTop: {
                paddingTop: 8,
                height: 40,
                width: '30%',
                color: '#FFF',
                borderWidth: 1,
                borderColor: '#008317',
                backgroundColor: '#008317'
            },
            buttonsContainer: {
                flex: 0.05,
                marginTop: 20,
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            },
            notificationsContainerList: {
                flex: 0.8,
                backgroundColor: '#FFF',
                paddingBottom: 10,
                paddingLeft: '5%',
                paddingRight: '5%',
                borderTopColor: '#d0d0d0',
                borderTopWidth: 1.8,
            },
        });
    }

    notifications() {
        return StyleSheet.create({
            notificationsContainer: {
                flex: 0.8,
                backgroundColor: '#FFF'
            },
            notificationsContainerList: {
                flex: 0.8,
                backgroundColor: '#FFF',
                paddingBottom: 10,
                paddingLeft: '5%',
                paddingRight: '5%',
                borderTopColor: '#d0d0d0',
                borderTopWidth: 1.8,
            },
            notificationsContainerHeader: {
                paddingTop: 5,
                paddingLeft: '5%',
                flex: Dimensions.get('screen').height < Dimensions.get('screen').width ? 0.2 : 0.1,
            },
            notificationsContainerListItem: {
                borderBottomColor: '#dfe8ff',
                borderBottomWidth: 1,
                paddingBottom: 8,
                paddingTop: 8
            },
            notificationsContainerListItemIcon: {
                height: 40,
                width: 40
            },
            notificationsContainerListItemName: {
                marginTop: 10,
                marginLeft: 8
            },
            fontPattern: {
                fontSize: 24,
                color: '#112c71',
                fontFamily: 'Merriweather Sans'
            },
            inline: {
                flexDirection: 'row'
            },
            notificationsIconContainer: {
                maxHeight: 40,
                minHeight: 40,
                maxWidth: 45,
                minWidth: 45,
                backgroundColor: '#112c71',
                padding: 10,
                marginRight: 15,
                borderRadius: 3
            },
            notificationsIcon: {
                fontSize: 20,
                color: '#FFF',
                textAlign: 'center',
                fontWeight: 'bold',
            },
        });
    }

    prizes() {
        return StyleSheet.create({
            notificationsContainer: {
                flex: 0.8,
                backgroundColor: '#FFF'
            },
            notificationsContainerList: {
                flex: 0.8,
                backgroundColor: '#FFF',
                paddingBottom: 10,
                paddingLeft: '5%',
                paddingRight: '5%',
                borderTopColor: '#d0d0d0',
                borderTopWidth: 1.8,
            },
            notificationsContainerHeader: {
                paddingTop: 5,
                paddingLeft: '5%',
                flex: Dimensions.get('screen').height < Dimensions.get('screen').width ? 0.2 : 0.1,
            },
            notificationsContainerListItem: {
                borderBottomColor: '#dfe8ff',
                borderBottomWidth: 1,
                paddingBottom: 8,
                paddingTop: 8
            },
            notificationsContainerListItemIcon: {
                height: 40,
                width: 40
            },
            notificationsContainerListItemName: {
                marginTop: 10,
                marginLeft: 8
            },
            fontPattern: {
                fontSize: 24,
                color: '#112c71',
                fontFamily: 'Merriweather Sans'
            },
            inline: {
                flexDirection: 'row'
            },
            notificationsIconContainer: {
                maxHeight: 40,
                minHeight: 40,
                maxWidth: 45,
                minWidth: 45,
                backgroundColor: '#43692b',
                padding: 10,
                marginRight: 15,
                borderRadius: 3
            },
            notificationsIcon: {
                fontSize: 20,
                color: '#FFF',
                textAlign: 'center',
                fontWeight: 'bold',
            },
            mT5: {
                marginTop: 5
            }
        });
    }
};