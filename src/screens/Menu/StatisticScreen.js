import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import HistoryServices from '../../services/firebase/HistoryServices'

function StarChart({ starData, starLabel }) {
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // Độ rộng của đường biểu đồ
  };

  return (
    <View>
      <LineChart
        data={{
          labels: starLabel,
          datasets: [
            {
              data: starData,
            },
          ],
        }}
        width={350}
        height={200}
        chartConfig={chartConfig}
      />
    </View>
  );
}

const data = {
  labels: ["game1", "game2", "game3"], // optional
  data: [0.4, 0.6, 0.8]
};

export default function StatisticScreen() {
  const [histories, setHistories] = useState([])
  useEffect (() => {
    async function fetchData() {
      try {
        const histories = await HistoryServices.getHistoryByUserId()
        setHistories(histories)
      } catch (error) {
        setHistories([])
      }
    }

    fetchData()
  }, [])

  const starData = histories.map((history, index) => {
    return (
      history.stars
    )
  })

  const starLabel = histories.map((history, index) => {
    return (
      index
    )
  })


  const chartConfig= {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Thống kê</Text>
      <Text style={styles.content}>Số sao của người chơi mỗi màn</Text>
      <StarChart starData={starData} starLabel={starLabel} />
      <Text style={styles.content}>Điểm mạnh yếu của người chơi</Text>
      <ProgressChart
        data={data}
        width={350}
        height={200}
        strokeWidth={20}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
});