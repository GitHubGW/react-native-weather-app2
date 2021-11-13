import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("window");
console.log("Dimensions", width, height);

const Container = styled(View)`
  border: 8px solid red;
  flex: 1;
`;

const TopContainer = styled(View)`
  border: 8px solid blue;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const City = styled(Text)`
  font-size: 25px;
  font-weight: bold;
`;

const BottomContainer = styled(ScrollView)`
  border: 8px solid green;
  flex: 3;
`;

const WeatherContainer = styled(View)`
  border: 5px solid orange;
  justify-content: center;
  align-items: center;
  width: ${width}px;
`;

const Temp = styled(Text)`
  font-size: 150px;
`;

const Weather = styled(Text)`
  font-size: 50px;
`;

export default function App() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleRequestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return setError("Permission to access location was denied.");
    } else {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
      setLocation(location[0]);
      console.log("location", location[0]);
    }
  };

  useEffect(() => {
    handleRequestPermission();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Container>
        <TopContainer>
          <City>
            {location.region} {location.city} {location.district}
          </City>
        </TopContainer>
        <BottomContainer horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} indicatorStyle="black">
          <WeatherContainer>
            <Temp>27</Temp>
            <Weather>Sunny</Weather>
          </WeatherContainer>
          <WeatherContainer>
            <Temp>20</Temp>
            <Weather>Rain</Weather>
          </WeatherContainer>
          <WeatherContainer>
            <Temp>18</Temp>
            <Weather>Storm</Weather>
          </WeatherContainer>
          <WeatherContainer>
            <Temp>23</Temp>
            <Weather>Sunny</Weather>
          </WeatherContainer>
          <WeatherContainer>
            <Temp>33</Temp>
            <Weather>Snow</Weather>
          </WeatherContainer>
        </BottomContainer>
      </Container>
    </>
  );
}
