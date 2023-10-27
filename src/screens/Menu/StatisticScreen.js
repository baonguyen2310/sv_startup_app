import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart, ProgressChart } from 'react-native-chart-kit';

function ScoreChart({ data }) {
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
          labels: ['1', '2', '3', '4', '5', '6'], // Các nhãn trên trục x
          datasets: [
            {
              data: data, // Dữ liệu điểm số
            },
          ],
        }}
        width={320} // Chiều rộng của biểu đồ
        height={220} // Chiều cao của biểu đồ
        chartConfig={chartConfig}
      />
    </View>
  );
}


const scoreData = [80, 85, 90, 75, 95, 88];
const data = {
  labels: ["game1", "game2", "game3"], // optional
  data: [0.4, 0.6, 0.8]
};

export default function StatisticScreen() {
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
      <Text style={styles.content}>Số điểm của người chơi</Text>
      <ScoreChart data={scoreData} />
      <Text style={styles.content}>Điểm mạnh yếu của người chơi</Text>
      <ProgressChart
        data={data}
        width={300}
        height={220}
        strokeWidth={16}
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