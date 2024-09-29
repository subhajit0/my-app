import React from 'react';
import DataSource from 'devextreme/data/data_source';
import { SelectBox } from 'devextreme-react/select-box';
const LookupBox: React.FC<any> = (cell) => {
  const selectBoxData = new DataSource({
    store: cell.column?.lookup?.dataSource,
    paginate: true,
    pageSize: 10,
  });

  const handleValueChange = React.useCallback(
    (e: any) => {
      cell.setValue(e?.value||null);
    },
    [cell]
  );

  const dropDownOptions = {
    minWidth:cell.column?.colSelectWidth ?? '100%',
  };

  const itemRender = React.useCallback((data:any) => {
    if (data != null) {
      const showData = cell.column?.lookup?.displayExpr==='listvalue'?data.listvalue:data.value;
      return (
        <div>
          <span className="middle">{showData}</span>
        </div>
      );
    } else {
      return <span>(All)</span>;
    }
  }, [cell]);

  const data = cell.column?.lookup?.dataSource.find(
    (x: any) => x.value === cell.value?.toString()
  );
  return (
    <SelectBox
      searchEnabled
      displayExpr="value"
      defaultValue={data}
      displayValue="value"
      itemRender={itemRender}
      dataSource={selectBoxData}
      onValueChange={(e) => handleValueChange(e)}
      dropDownOptions={dropDownOptions}
    />
  );
};

export default LookupBox;
