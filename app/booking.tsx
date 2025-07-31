
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const serviceDetailImage = require('../assets/images/service-image.png');

const BookingScreen = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 13)); // July 2025
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots = [
    '10:00 Pm to 1:00 Pm',
    '1:00 Pm to 4:00 Pm',
    '4:00 Pm to 7:00 Pm',
    '7:00 Pm to 10:00 Pm',
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const blanks = [];
    for (let i = 0; i < firstDay; i++) {
      blanks.push(<View key={`blank-${i}`} style={styles.dateCellEmpty} />);
    }

    const dates = [];
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    for (let day = 1; day <= daysInMonth; day++) {
      const isPastDate = (
        year < currentYear ||
        (year === currentYear && month < currentMonth) ||
        (year === currentYear && month === currentMonth && day < currentDay)
      );

      dates.push(
        <TouchableOpacity
          key={day}
          style={styles.dateCell}
          onPress={() => {
            if (!isPastDate) {
              setSelectedDate(day);
              setSelectedTime(null); // Reset selected time when date changes
            }
          }}
          disabled={isPastDate}
        >
          <View
            style={[
              styles.dateCellInner,
              selectedDate === day && styles.selectedDateCellInner,
              isPastDate && styles.dateCellDisabled,
            ]}
          >
     
            <Text
              style={[
                styles.dateText,
                selectedDate === day && styles.selectedDateText,
                isPastDate && styles.dateTextDisabled,
              ]}
            >
              {day}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return [...blanks, ...dates];
  };

  const isCurrentMonth = () => {
    const today = new Date();
    return (
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details And Time</Text>
        <View style={styles.stepIndicatorContainer}>
          <View style={styles.stepIndicatorActive} />
          <View style={styles.stepIndicatorActive} />
          <View style={styles.stepIndicatorInactive} />
        </View>
      </View>

      <ScrollView>
        <View style={styles.serviceInfoContainer}>
          <Image source={serviceDetailImage} style={styles.serviceImage} />
          <View style={styles.serviceDetails}>
            <Text style={styles.serviceName}>Car Wash</Text>
            <Text style={styles.serviceType}>Eco Wash Exterior</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>AED 300.00</Text>
            <Text style={styles.oldPrice}>AED 300.00</Text>
          </View>
        </View>

        <View style={styles.calendarTop}>

          <View style={styles.monthSelector}>
            <TouchableOpacity
              onPress={handlePrevMonth}
              style={[styles.arrowButton, isCurrentMonth() && styles.arrowButtonDisabled]}
              disabled={isCurrentMonth()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.monthText}>
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </Text>
            <TouchableOpacity onPress={handleNextMonth} style={styles.arrowButton}>
              <Ionicons name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          </View>
<View style={styles.calendarContainer}>
          <View style={styles.weekdaysContainer}>
            {weekdays.map((day) => (
              <Text key={day} style={styles.weekdayText}>{day}</Text>
            ))}
          </View>

          <View style={styles.dateGrid}>{renderCalendar()}</View>
       </View>

        {selectedDate && (
          <View style={styles.timeSlotContainer}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[styles.timeSlot, selectedTime === time && styles.selectedTimeSlot]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[styles.timeText, selectedTime === time && styles.selectedTimeText]}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.confirmButton} onPress={() => router.push('/addon')}>
        <Text style={styles.confirmButtonText}>Confirm Booking And Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingVertical: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    gap: 5,
  },
  stepIndicatorActive: {
    width: 40,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#FF7D2E',
    marginHorizontal: 2,
  },
  stepIndicatorInactive: {
    width: 40,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#FF7D2E40',
    marginHorizontal: 2,
  },
    backButton: {
    position: 'absolute',
    alignSelf: 'center',
    left: 16,
    top: 40,
  },
  serviceInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  serviceDetails: {
    flex: 1,
    marginLeft: 15,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceType: {
    color: '#888',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF7D2E',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  calendarTop: {
    marginHorizontal: 20,
  },
  calendarContainer: {
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#FF7D2E1A',
    
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrowButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 8,
  },
  arrowButtonDisabled: {
    backgroundColor: '#888',
  },
  weekdaysContainer: {
    flexDirection: 'row',
  },
  weekdayText: {
    width: '14.2%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#888',
  },
  dateGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginHorizontal: 'auto',
  padding: 2,
},

dateCell: {
  flexBasis: '14.28%',
  aspectRatio: 1,
  padding: 4, // for internal spacing
  
},

dateCellInner: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffffffff',
  borderRadius: 6,
  paddingVertical: 11,
  paddingHorizontal: 12,
},

selectedDateCellInner: {
  backgroundColor: '#FF7D2E',
},

  dateCellEmpty: {
    width: '14.28%',
    aspectRatio: 1,
  },
  selectedDateCell: {
    backgroundColor: '#FF7D2E',
  },
  dateText: {
    color: '#000',
  },
  dateTextDay: {
    color: '#000',
    fontSize: 12,
  },
  selectedDateText: {
    color: '#fff',
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  timeSlot: {
    width: '48%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedTimeSlot: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  timeText: {
    color: '#000',
  },
  selectedTimeText: {
    color: '#fff',
  },
  confirmButton: {
    backgroundColor: '#FF7D2E',
    padding: 20,
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dateCellDisabled: {
  backgroundColor: '#ffffff60',
},
dateTextDisabled: {
  color: '#A0A0A0',
},
});

export default BookingScreen;
