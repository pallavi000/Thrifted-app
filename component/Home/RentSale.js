import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import bbstyles from "../Styles";
import axios from "axios";
import HomepagePosts from "./HomepagePosts";
import { AuthContext } from "../Context";
import { customSuccessNotification } from "../ErrorHandle";

const RentSale = ({ navigation, route }) => {
  const [loader, setLoader] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const data = useContext(AuthContext);
  const { token } = data;
  const { type, feedSetting } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: type,
    });
  }, []);

  // TODO: Change API
  const getProducts = async (currentPage, countPerPage) => {
    const config = {
      headers: {
        "access-token": token,
      },
    };
    const data = {
      activePage: currentPage,
      itemsCountPerPage: countPerPage,
      type: type.toLowerCase(),
      feedSetting: feedSetting || "followings",
    };
    try {
      const response = await axios.post(
        "/frontend/app/home/type",
        data,
        config
      );
      setProducts([...products, ...response.data.product]);
      if (response.data.product.length != itemsCountPerPage) {
        setHasNextPage(false);
      }
      if (!response.data.product.length) {
        setHasNextPage(false);
      }
      setLoader(false);
      setNextPage(false);
    } catch (error) {
      Alert.alert("Error", error.request.response);
      setLoader(false);
    }
  };

  useEffect(() => {
    getProducts(activePage, itemsCountPerPage);
  }, []);

  const GetNextPage = useCallback(() => {
    setActivePage(activePage + 1);
    if (!nextPage && hasNextPage) {
      setNextPage(true);
      getProducts(activePage + 1, itemsCountPerPage);
    }
  }, [nextPage, activePage]);

  const onRefresh = useCallback(async () => {
    setActivePage(1);
    await getProducts(1, itemsCountPerPage);
    customSuccessNotification("Page Refreshed.");
  });

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {loader ? (
        <View style={bbstyles.loaderContainer}>
          <ActivityIndicator size={"large"} color="#663399" />
        </View>
      ) : (
        <View style={{ paddingBottom: 0, height: "100%" }}>
          <HomepagePosts
            onRefresh={onRefresh}
            GetNextPage={GetNextPage}
            hasNextPage={hasNextPage}
            products={products}
            setProducts={setProducts}
            navigation={navigation}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default RentSale;

const styles = StyleSheet.create({});
