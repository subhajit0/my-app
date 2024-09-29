import * as React from 'react';
import {
  IDataGridOptions,
  Column,
  Selection,
  ISelectionProps,
  Pager,
  Paging,
  Editing,
  Lookup,
  CustomRule,
  Export,
  ColumnChooser,
  GroupPanel,
  Grouping,
  MasterDetail,
  RequiredRule,
  RowDragging,
  Summary, 
  GroupItem,
} from 'devextreme-react/data-grid';
import DataGrid from 'devextreme-react/data-grid';
import { CheckBox } from 'devextreme-react/check-box';
import LookupBox from './LookupBox';
import DatePickerCell from './date-picker-cell';
//import { useNotification } from 'context/notification';

export interface DataTableProps extends IDataGridOptions, ISelectionProps {
  isEditMode?: boolean;
  groupIndex?: number;
  masterDetailComponent?: React.ComponentType<any>;
  reference?: any;
  loading?: boolean;
  masterTable?: boolean;
  pageSize?: number;
  selectAll?: boolean;
  isProject?: boolean;
  isReOrdering?: boolean;
  exportToPdf?: boolean;
  enableExport?: boolean;
  pagerVisible?: boolean;
  showPageSizeSelector?: boolean;
  displayMode?: string;
  exportToExcel?: boolean;
  exportFileName?: string;
  autoExpandAll?: boolean;
  selectedRowKeys?: any[];
  showGroupPanel?: boolean;
  showColumnChooser?: boolean;
  enableMasterDetail?: boolean;
  exportSelectionOnly?: boolean;
  newRowPosition?:string;
  allowedPageSizes?: any[];
  onReorder?: (v: any) => void;
  mode?: string;
  selectAllMode?: string;
  groupItemColumnName?: string;
}

const EditableDataTable: React.FC<DataTableProps> = ({
  isEditMode,
  reference,
  columns,
  isProject = false,
  isReOrdering,
  loading,
  masterTable,
  pageSize,
  allowedPageSizes = [],
  showPageSizeSelector = true,
  exportToPdf,
  enableExport,
  pagerVisible,
  displayMode,
  exportToExcel,
  exportFileName,
  autoExpandAll,
  //selectedRowKeys,
  showGroupPanel,
  showColumnChooser,
  enableMasterDetail,
  exportSelectionOnly,
  newRowPosition,
  mode,
  onReorder,
  masterDetailComponent,
  selectAllMode,
  selectAll,
  groupItemColumnName,
  ...props
}) => {
  //const { notify } = useNotification();
  const dataGridRef = React.useRef<any>(null);
  const dataGrid = reference ? reference : dataGridRef;
  const DEFAULT_PAGESIZE = [pageSize ?? 25, 'all'];
  const setAllowedPageSize = !!allowedPageSizes.length
    ? allowedPageSizes
    : DEFAULT_PAGESIZE;

  const performLongOperation = React.useCallback(
    (loading: boolean) => {
      if (dataGrid?.current?.instance) {
        if (loading) {
          dataGrid.current.instance.beginCustomLoading();
        } else {
          dataGrid.current.instance.endCustomLoading();
        }
      }
    },
    [dataGrid]
  );

  React.useEffect(() => {
    if (loading !== undefined) {
      performLongOperation(loading);
    }
  }, [loading, performLongOperation]);

  React.useEffect(() => {
    if (dataGrid?.current?.instance && showColumnChooser) {
      dataGrid?.current?.instance.showColumnChooser();

      let columnChooserView =
        dataGrid?.current?.instance.getView('columnChooserView');

      if (!columnChooserView._popupContainer) {
        columnChooserView._initializePopupContainer();
        columnChooserView.render();
      }

      columnChooserView._popupContainer.option('position', {
        of: dataGrid?.current?.instance.element(),
        my: 'right top',
        at: 'right top',
        offset: '0 75',
      });
    }
  }, [showColumnChooser, dataGrid]);

  React.useEffect(() => {
    if (dataGrid?.current?.instance && exportToExcel) {
      //const selected = dataGrid?.current?.instance?.getSelectedRowsData();
      //if (!selected.length)
      //return notify({ type: 'info', message: 'No Data Selected!' });
      dataGrid?.current?.instance.exportToExcel(exportSelectionOnly);
    }
  }, [exportToExcel, dataGrid, exportSelectionOnly]);

  React.useEffect(() => {
    if (dataGrid?.current?.instance && selectAll) {
      return dataGrid?.current?.instance.selectAll();
    }
  }, [selectAll, dataGrid]);

  return (
    <DataGrid
      ref={dataGrid}
      dataSource={props.dataSource}
      showRowLines={true}
      showColumnLines={true}
      showBorders={true}
      height="auto"
      highlightChanges={true}
      columnResizingMode="widget"
      width={props.width ?? "100%"}
      // onExporting={onExportExcel}
      {...props}
    >
      <Export
        allowExportSelectedData={true}
        enabled={enableExport}
        // fileName={`BrickWorx-${exportFileName ?? 'Export'}`}
      />
      <ColumnChooser mode="select" />
      <GroupPanel visible={showGroupPanel} />
      <Grouping autoExpandAll={false} />
      <Selection selectAllMode={selectAllMode??"page"} showCheckBoxesMode="always" mode={mode} />
      <Paging defaultPageSize={pageSize ?? 25} />
      <Pager
        visible={pagerVisible}
        allowedPageSizes={setAllowedPageSize}
        displayMode={displayMode ?? 'full'}
        showPageSizeSelector={!!showPageSizeSelector}
        showInfo={true}
        showNavigationButtons={true}
      />
      {columns?.map((column: any, idx) => {
        if (column?.type === 'action' && column?.cellRender) {
          return (
            <Column
              key={idx}
              caption={column.caption}
              dataField={column.dataField}
              cssClass={column.cssClass ?? 'dx-datagrid-text'}
              cellRender={(cellData: any) => column.cellRender(cellData)}
              allowResizing={
                column.allowResizing === undefined ? true : column.allowResizing
              }
            />
          );
        } else if (column.hasLookup) {
          return (
            <Column
              {...column}
              allowEditing={column.allowEditing}
              key={idx}
              editCellRender={(cell) => {
                if (column.hasLookup) {
                  return <LookupBox {...cell} />;
                }
              }}
              cssClass={column.cssClass ?? 'dx-datagrid-text'}
              allowResizing={
                column.allowResizing === undefined ? true : column.allowResizing
              }
            >
              {column.required ? <RequiredRule /> : null}
              {isEditMode && column.validation && (
                <CustomRule {...column.validation} />
              )}
              {column.hasLookup && (
                <Lookup
                  dataSource={column.lookupDataSource}
                  valueExpr="value"
                  displayExpr={column.displayExpr ?? 'text'}
                  allowClearing={true}
                />
              )}
            </Column>
          );
        } else if (column.isDate) {
          return (
            <Column
              {...column}
              key={idx}
              allowEditing={true}
              cssClass={column.cssClass ?? 'dx-datagrid-text'}
              editCellRender={(cell) => (
                <DatePickerCell {...cell} setMin={column?.setMin} />
              )}
              allowResizing={
                column.allowResizing === undefined ? true : column.allowResizing
              }
            />
          );
        } else if (column.isBoolean) {
          return (
            <Column
              {...column}
              key={idx}
              allowEditing={true}
              cssClass={column.cssClass ?? 'dx-datagrid-text'}
              editCellRender={(cell) => (
                <CheckBox
                  value={cell.value}
                  onValueChange={(e) => cell.setValue(e)}
                />
              )}
              allowResizing={
                column.allowResizing === undefined ? true : column.allowResizing
              }
            />
          );
        }
        return (
          <Column
            {...column}
            key={idx}
            cssClass={column.cssClass ?? 'dx-datagrid-text damy'}
            groupIndex={column.groupIndex}
            allowResizing={
              column.allowResizing === undefined ? true : column.allowResizing
            }
          >
            {column.required ? <RequiredRule /> : null}
            {isEditMode && column.validation && (
              <CustomRule {...column.validation} />
            )}
            {column.hasLookup && (
              <Lookup
                dataSource={column.lookupDataSource}
                valueExpr="value"
                displayExpr="text"
                allowClearing={true}
              />
            )}
          </Column>
        );
      })}
      {isProject ? (
            <Editing
              mode="row"
              allowUpdating={true}
              allowDeleting={true}
              allowAdding={true}
            />
          ) : (
            <Editing
              mode="cell"
              allowUpdating={true}
              refreshMode="reshape"
              newRowPosition={newRowPosition ?? 'first'}
            />
          )}
      {/* {isEditMode && (
        <>
          {isProject ? (
            <Editing
              mode="row"
              allowUpdating={true}
              allowDeleting={true}
              allowAdding={true}
            />
          ) : (
            <Editing
        mode="cell"
        allowUpdating={true}
        refreshMode="reshape"
      />
          )}
        </>
      )} */}
      {isReOrdering && (
        <RowDragging
          allowReordering={isReOrdering}
          showDragIcons={false}
          onReorder={onReorder}
        />
      )}
      
      {masterDetailComponent ? (
        <MasterDetail
          enabled={enableMasterDetail}
          autoExpandAll={autoExpandAll}
          component={masterDetailComponent}
        />
      ) : null}
      
      {groupItemColumnName ? (
        <Summary>
        <GroupItem
          column={groupItemColumnName}
          summaryType="count"
          displayFormat="{0} items"
        />
      </Summary>
      ) : null
      }
    </DataGrid>
  );
};

export default EditableDataTable;