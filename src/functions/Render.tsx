import React, { useContext } from "react";
import { View } from 'react-native'
import { Avatar, Icon, ListItem } from "react-native-elements";
import { AppContext } from "../hooks/Context";
import mainStyles, { colors } from "../styles";

export const renderCrypto = (item: string) => {
    const { context } = useContext(AppContext);
    let object: any = search(item, context.currencies, "id")
    let currency: any = {
        name: object?.name || "",
        symbol: object?.symbol || "",
        price_usd: object?.metrics.market_data.price_usd || "",
        percent_24_hours: object?.metrics.market_data.percent_change_usd_last_24_hours || ""
    }
    return (
        <ListItem
            key={item}
            underlayColor={"transparent"}
            containerStyle={{
                backgroundColor: colors.complementary + "20",
                borderRadius: 10,
                marginBottom: 5,
            }}
        >
            <Avatar source={{ uri: `https://messari.io/asset-images/${item}/64.png` }} />
            <ListItem.Content>
                <ListItem.Title style={mainStyles.listTitle}>{currency.name}</ListItem.Title>
                <ListItem.Subtitle style={mainStyles.listSubtitle}>{currency.symbol}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content right>
                <ListItem.Title style={mainStyles.listTitle}>{(currency.price_usd).toLocaleString('en-US',{style:'currency', currency:'USD', maximumFractionDigits:2})}</ListItem.Title>
                <View style={{ flexDirection: 'row', alignItems:'center' }}>
                    <Icon
                        name={currency.percent_24_hours > 0 ? "arrow-up-right" : "arrow-down-right"}
                        type='feather'
                        color={currency.percent_24_hours > 0 ? colors.success : colors.danger}
                        size={16}
                    />
                    <ListItem.Subtitle style={[mainStyles.listSubtitle,{color:currency.percent_24_hours > 0 ? colors.success : colors.danger}]}>
                        {(currency.percent_24_hours).toLocaleString()} %</ListItem.Subtitle>
                </View>
            </ListItem.Content>
        </ListItem>
    )
}


const search = (nameKey: string, myArray: [], arrayKey: string) => {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i][arrayKey] === nameKey) {
            return myArray[i];
        }
    }
}
