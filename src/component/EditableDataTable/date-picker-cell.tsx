import React from 'react';
import DateBox from 'devextreme-react/date-box';

const DatePickerCell: React.FC<any> = (cell, setMin) => {
  return (
    <DateBox
      // height={22}
      showClearButton={false}
      defaultValue={cell.value}
      //min={setMin ? cell.data['requestDate'] : undefined}
      min={setMin ? cell['setMin'] : undefined}
      onValueChanged={(e) => cell.setValue(e.value)}
    />
  );
};

export default DatePickerCell;
