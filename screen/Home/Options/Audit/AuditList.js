import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { format } from "date-fns";

const AuditList = ({ item, onPress }) => {

    const formattedDate = format(new Date(item?.date), 'dd MMMM yyyy');

    let customerName = truncateString(item?.customer_name || "", 15);
    let collectionType = truncateString(item?.collection_type_name || "", 15);
    let supplierName = truncateString(item?.supplier_name || "", 15);

    return (
        <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
            <View style={styles.leftColumn}>
                <Text style={styles.supplierid}>{item?.supplier_id}</Text>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                    <Text style={styles.names}>{customerName || collectionType || supplierName}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
                <Text style={styles.invsequence}>{item?.inv_sequence_no || 'N/A'}</Text>
            </View>
            <View style={styles.rightColumn}></View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 5,
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 15,
        ...Platform.select({
            android: {
                elevation: 4,
            },
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
            },
        }),
        padding: 20,
    },
    leftColumn: {
        flex: 1,
    },
    rightColumn: {
        flex: 1,
        alignItems: 'flex-end',
    },
    supplierid: {
        fontFamily: FONT_FAMILY.urbanistBold,
        fontSize: 17,
        marginBottom: 5,
    },
    names: {
        color: '#666666',
        marginBottom: 5,
        fontSize: 15,
        fontFamily: FONT_FAMILY.urbanistSemiBold,
    },
    invsequence: {
        marginBottom: 5,
        fontSize: 14,
        fontFamily: FONT_FAMILY.urbanistBold,
        color: '#666666',
    },
    date: {
        color: '#666666',
        fontFamily: FONT_FAMILY.urbanistMedium,
    },
});

export default AuditList;