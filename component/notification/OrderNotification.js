import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { imageLink } from "../ImageLink";
import { format } from "timeago.js";
import { AuthContext } from "../Context";

export default function OrderNotification(props) {
  const item = props.item;
  const navigation = props.navigation;

  const data = useContext(AuthContext);
  const { decode } = data;

  return props.item.type == "order" ? (
    props.item.user_id._id == decode._id ? (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Order Track", item.order_id)}
          style={styles.wrapper}
        >
          <Image
            source={{ uri: imageLink + item.user_id.image }}
            style={styles.userImage}
          ></Image>
          <View style={styles.detailView}>
            <Text style={styles.detail}>
              <Text style={styles.userName}>{item.post_id.name}</Text> has been
              ordered.
            </Text>
            <Text style={styles.time}>{format(item.createdAt)}</Text>
          </View>
          <View>
            <Image
              source={{ uri: imageLink + item.post_id.image }}
              style={styles.postImage}
            ></Image>
          </View>
        </TouchableOpacity>
      </View>
    ) : (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Product Detail", item.post_id)}
          style={styles.wrapper}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("My Closet", item.user_id)}
          >
            <Image
              source={{ uri: imageLink + item.user_id.image }}
              style={styles.userImage}
            ></Image>
          </TouchableOpacity>
          <View style={styles.detailView}>
            <Text style={styles.detail}>
              <Text style={styles.userName}>{item.user_id.name}</Text> has order{" "}
              {item.post_id.name}.
            </Text>
            <Text style={styles.time}>{format(item.createdAt)}</Text>
          </View>
          <View>
            <Image
              source={{ uri: imageLink + item.post_id.image }}
              style={styles.postImage}
            ></Image>
          </View>
        </TouchableOpacity>
      </View>
    )
  ) : props.item.type == "shipped" ? (
    item.user_id._id == decode._id ? (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Order Track", item.order_id)}
          style={styles.wrapper}
        >
          <Image
            source={{ uri: imageLink + item.user_id.image }}
            style={styles.userImage}
          ></Image>
          <View style={styles.detailView}>
            <Text style={styles.detail}>
              <Text style={styles.userName}>{item.post_id.name}</Text> has
              shipped.
            </Text>
            <Text style={styles.time}>{format(item.createdAt)}</Text>
          </View>
          <View>
            <Image
              source={{ uri: imageLink + item.post_id.image }}
              style={styles.postImage}
            ></Image>
          </View>
        </TouchableOpacity>
      </View>
    ) : null
  ) : (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Order Track", item.order_id)}
        style={styles.wrapper}
      >
        {item.user_id._id == decode._id ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("My Closet", item.seller_id)}
          >
            <Image
              source={{ uri: imageLink + item.seller_id.image }}
              style={styles.userImage}
            ></Image>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate("My Closet", item.user_id)}
          >
            <Image
              source={{ uri: imageLink + item.user_id.image }}
              style={styles.userImage}
            ></Image>
          </TouchableOpacity>
        )}

        <View style={styles.detailView}>
          <Text style={styles.detail}>
            Your order is complete. (
            <Text style={styles.userName}>{item.post_id.name}</Text>)
          </Text>
          <Text style={styles.time}>{format(item.createdAt)}</Text>
        </View>
        <View>
          <Image
            source={{ uri: imageLink + item.post_id.image }}
            style={styles.postImage}
          ></Image>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    color: "#262626",
    paddingLeft: 10,
    paddingTop: 10,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "rgba(60, 60, 67, 0.18)",
    borderBottomWidth: 0.5,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "#c4c4c4",
  },
  postImage: {
    height: 50,
    width: 50,
    resizeMode: "cover",
  },
  detail: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "Raleway_400Regular",
    color: "#262626",
  },
  userName: {
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    color: "#262626",
  },
  detailView: {
    flex: 1,
    marginHorizontal: 10,
  },
  category: {
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    borderBottomWidth: 0.4,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  normal: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
  },
  order: {
    fontFamily: "Raleway_600SemiBold",
    fontWeight: "600",
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.4)",
  },
  time: {
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
    color: "rgba(0, 0, 0, 0.3)",
    marginRight: 5,
  },
  mention: {
    color: "#663399",
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
  },
  replyWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  replyText: {
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    color: "rgba(0, 0, 0, 0.4)",
    marginLeft: 10,
  },
  message: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    color: "#262626",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(60, 60, 67, 0.18)",
    borderRadius: 5,
  },
});
