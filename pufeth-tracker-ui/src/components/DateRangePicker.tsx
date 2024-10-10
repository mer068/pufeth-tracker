import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
    dateRange: [Date | null, Date | null];
    onDateChange: (dates: [Date | null, Date | null]) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ dateRange, onDateChange }) => {
    return (
            <DatePicker
                selected={dateRange[0]}
                onChange={(dates: [Date | null, Date | null]) => onDateChange(dates)}
                startDate={dateRange[0] ?? undefined}
                endDate={dateRange[1] ?? undefined}
                selectsRange
                placeholderText="Select a date range"
                dateFormat="yyyy/MM/dd"
                maxDate={new Date()}
                isClearable
            />
    );
};

export default DateRangePicker;
