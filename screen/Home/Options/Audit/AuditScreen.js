import React, { useEffect, useCallback } from 'react';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { fetchAuditing } from '../../../../api/services/generalApi';
import AuditList from './AuditList';
import { useDataFetching } from '../../../../hooks';

const AuditScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { data, loading, fetchData, fetchMoreData } = useDataFetching(fetchAuditing);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const handleLoadMore = () => {
    fetchMoreData();
  };

  const renderItem = ({ item }) => {
    if (item.empty) {
      return <EmptyItem />;
    }
    return <AuditList item={item} />;
  };

  const renderContent = () => (
    <FlashList
      data={formatData(data, 1)}
      numColumns={1}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ padding: 10, paddingBottom: 50 }}
      onEndReached={handleLoadMore}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.2}
      estimatedItemSize={100}
    />
  );

  const renderAuditing = () => {
    if (data.length === 0 && !loading) {
      return renderEmptyState();
    }
    return renderContent();
  };

  return (
    <SafeAreaView>
      <NavigationHeader
        title="Transaction Auditing"
        onBackPress={() => navigation.goBack()}
      />
      {/* <SearchContainer placeholder="Search Products" onChangeText={handleSearchTextChange} /> */}
      <RoundedContainer>
        {renderAuditing()}
        <FABButton onPress={() => navigation.navigate('AuditForm')} />
      </RoundedContainer>
    </SafeAreaView>
  );
};

export default AuditScreen;
