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
          labels: data_2.labels,
          datasets: [
            {
              data: data_2.data,
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

const data_2 = {
  labels: [0,1,2,3,4,5,6,7,8,9], // optional
  data: [0,2,2,3,4,3,4,2,4,5]
};

const data = {
  labels: ["Từ", "Câu", "Đoạn"], // optional
  data: [0.8, 0.6, 0.2]
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
      <Text style={styles.secondary}>Biểu đồ số sao của bé</Text>
      <StarChart starData={starData} starLabel={starLabel} />
      <Text style={styles.secondary}>Biểu đồ hoàn thiện nhóm trò chơi</Text>
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
    textAlign: 'center',
    color: '#F875AA'
  },
  content: {
    fontSize: 16,
  },
  secondary: {
    color: "#0dcaf0",
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "600",
    textAlign: 'center'
  },
});