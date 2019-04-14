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
                backgroundColor: '#145cc7',
            },
            usageDiaryContainer: {
                flex: Dimensions.get('screen').height < Dimensions.get('screen').width ? 0.8 : 0.4,
                paddingLeft: 15,
                paddingTop: Dimensions.get('screen').height < Dimensions.get('screen').width ? 5 : 20,
                backgroundColor: '#145cc7',
                flexDirection: 'row',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 4,
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
                backgroundColor: '#009fff',
                borderColor: '#FFF',
            },
            fontWhite: {
                color: '#FFF'
            },
            body: {
                flex: 7,
                backgroundColor: '#FFF'
            },
            bodyContainer: {
                flex: 1,
                paddingTop: 15,
                paddingLeft: '5%',
                paddingRight: '5%',
                backgroundColor: '#FFF',
                paddingBottom: 15
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
                borderWidth: 0.3,
                borderColor: '#FFF',
                backgroundColor: '#009fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 4,
            },
            borderTopLeftRadius: {
                borderTopLeftRadius: 8
            },
            borderTopRightRadius: {
                borderTopRightRadius: 8
            },
            borderRadiusLeft: {
                borderBottomLeftRadius: 8,
                borderTopLeftRadius: 8
            },
            borderRadiusRight: {
                borderBottomRightRadius: 8,
                borderTopRightRadius: 8
            },
            buttonsContainer: {
                flex: 0.05,
                marginTop: 20,
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            },
            notificationsContainerList: {
                flex: 2,
                backgroundColor: '#FFF',
                paddingBottom: 10,
                paddingLeft: '5%',
                paddingRight: '5%',
                borderTopColor: '#FFF',
                borderTopWidth: 1.8,
            },
            notificationsContainer: {
                flex: 1,
                backgroundColor: '#009fff',
                borderRadius: 8,
                paddingLeft: '5%',
                paddingRight: '5%',
                borderWidth: 1,
                borderColor: '#009fff',
                borderBottomWidth: 0,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 4,
            },
        });
    }

    notifications() {
        return StyleSheet.create({
            notificationsContainer: {
                flex: 1,
                backgroundColor: '#009fff',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#009fff',
                borderBottomWidth: 0,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 4,
            },
            fontWhite: {
                color: '#FFF'
            },
            notificationsContainerList: {
                flex: 1,
                backgroundColor: '#009fff',
                paddingBottom: 10,
                paddingLeft: '5%',
                paddingRight: '5%',
                borderTopColor: '#FFF',
                borderTopWidth: 1.8,
                borderBottomRightRadius: 8,
                borderBottomLeftRadius: 8
            },
            notificationsContainerHeader: {
                justifyContent: 'center',
                flex: Dimensions.get('screen').height < Dimensions.get('screen').width ? 0.2 : 0.1,
            },
            notificationsContainerListItem: {
                borderBottomColor: '#FFF',
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
                color: '#FFF',
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
                backgroundColor: '#00a7a7',
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
                flex: 1,
                backgroundColor: '#009fff',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#009fff',
                borderBottomWidth: 0,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 4,
            },
            fontWhite: {
                color: '#FFF'
            },
            notificationsContainerList: {
                flex: 1,
                backgroundColor: '#009fff',
                paddingBottom: 10,
                paddingLeft: '5%',
                paddingRight: '5%',
                borderTopColor: '#FFF',
                borderTopWidth: 1.8,
                borderBottomRightRadius: 8,
                borderBottomLeftRadius: 8
            },
            notificationsContainerHeader: {
                justifyContent: 'center',
                flex: Dimensions.get('screen').height < Dimensions.get('screen').width ? 0.2 : 0.1,
            },
            notificationsContainerListItem: {
                borderBottomColor: '#dfe8ff',
                borderBottomWidth: 1,
                paddingBottom: 8,
                paddingTop: 8
            },
            notificationsModalContainer: {
                flex: 1, paddingTop: 15, paddingLeft: '3%', paddingRight: '3%',
            },
            notificationsModalContainerHeader: {
                paddingLeft: '13%', paddingTop: 20, paddingRight: '13%', alignItems: 'center'
            },
            notificationsModalContainerHeaderIcon: {
                justifyContent: 'center', width: 150,  backgroundColor: '#009fff', height: 150, borderColor: '#FFF', borderWidth: 2, borderRadius: 8
            },
            notificationsModalContainerBody: {
                marginTop: 50, textAlignVertical: "center", textAlign: "center", paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', backgroundColor: '#008c40', borderRadius: 8, minHeight: '55%', maxHeight: '55%', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 1, elevation: 4
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
                color: '#FFF',
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
                backgroundColor: '#009a46',
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