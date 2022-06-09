import React from 'react'
import { IInterval, intervals } from 'constants/timeIntervals'

export const TimePicker = (
    { onChange, value }: {
        onChange: (value: IInterval) => void,
        value: IInterval
    }) => {
    return (
        <div className="time-picker">
            {
                intervals.map(interval => (
                    <button
                        key={interval.value}
                        onClick={() => onChange(interval)}
                        className={`time-picker_button ${value.value === interval.value ? 'time-picker_button_selected' : ''}`}
                    >
                        {interval.label}
                    </button>
                ))
            }
        </div>
    )
}