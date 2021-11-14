import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, ScrollView, Dimensions } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const backgrounds = ["#00b894", "#00cec9", "#0984e3", "#e17055", "#2d3436"];

const Container = styled(View)`
  flex: 1;
  background-color: ${backgrounds[Math.floor(Math.random() * backgrounds.length)]};
`;

const TopContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Region = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  color: white;
`;

const City = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  color: white;
  margin-top: 7px;
`;

const BottomContainer = styled(ScrollView)`
  flex: 3;
`;

const WeatherContainer = styled(View)`
  justify-content: center;
  align-items: center;
  width: ${width}px;
`;

const Dates = styled(Text)`
  font-size: 30px;
  color: white;
  margin-top: 20px;
`;

const WeatherMain = styled(Text)`
  font-size: 50px;
  color: white;
  margin-top: 10px;
  margin-bottom: 2px;
`;

const WeatherDesc = styled(Text)`
  font-size: 30px;
  color: white;
`;

const Temp = styled(Text)`
  font-size: 75px;
  color: white;
  margin-top: 20px;
`;

export default function App() {
  const API_KEY = "ff26d804d0d9d838fc3e57227eed4bcc";
  const [location, setLocation] = useState([]);
  const [daily, setDaily] = useState([]);
  const [error, setError] = useState(null);
  const weatherIcons = {
    Clear: "day-sunny",
    Clouds: "cloudy",
    Rain: "rain",
    Atmosphere: "cloudy-gusts",
    Snow: "snow",
    Drizzle: "day-rain",
    Thunderstorm: "lightning",
  };

  const handleGetWeather = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return setError("Permission to access location was denied.");
    } else {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
      const data = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
      const json = await data.json();
      setLocation(location[0]);
      setDaily(json.daily);
    }
  };

  useEffect(() => {
    handleGetWeather();
  }, []);

  return (
    <>
      {error ? (
        <Text>Permission to access location was denied.</Text>
      ) : (
        <>
          <StatusBar style="light" />
          <Container>
            <TopContainer>
              <Region>{location?.region}</Region>
              <City>
                {location?.city} {location?.district}
              </City>
            </TopContainer>
            <BottomContainer horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} indicatorStyle="black">
              {daily?.length === 0 ? (
                <ActivityIndicator size="large" color="white" style={{ width: width, marginBottom: 200 }}></ActivityIndicator>
              ) : (
                <>
                  {daily?.length > 0 &&
                    daily?.map((daily, index) => (
                      <WeatherContainer key={index}>
                        <Fontisto
                          name={weatherIcons[daily?.weather[0].main] ? weatherIcons[daily?.weather[0].main] : "cloudy-gusts"}
                          size={150}
                          color="white"
                        />
                        <Dates>{new Date(daily?.dt * 1000).toString().substring(0, 10)}</Dates>
                        <WeatherMain>{daily?.weather[0].main}</WeatherMain>
                        <WeatherDesc>{daily?.weather[0].description}</WeatherDesc>
                        <Temp>{Math.ceil(daily?.temp.max)}°</Temp>
                      </WeatherContainer>
                    ))}
                </>
              )}
            </BottomContainer>
          </Container>
        </>
      )}
    </>
  );
}
