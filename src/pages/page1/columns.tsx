import React from 'react';
import { DeleteIcon, EditIcon} from '@fluentui/react-icons-mdl2';
import { CheckBox } from 'devextreme-react/check-box';

export const MasterColumn: any[] = [
    {
        width: 50,
        allowSorting: false,
        allowResizing: false,
        allowEditing: false,
        dataField: 'edit',
        caption: 'Edit',
        cssClass: 'dx-datagrid-action',
        headerCellRender: () => <EditIcon />,
    },
    // {
    //     dataField: 'id',
    //     caption: 'ID',
    //     width: '5%',
    //     dataType: 'number',
    //     validationRules: [{ type: 'required' }],
    // },
    {
        dataField: 'productName',
        caption: 'Product Name',
        width: '15%',
        validationRules: [{ type: 'required' }],
    },
    {
        dataField: 'description',
        caption: 'Description',
        width: '20%',
    },
    {
        dataField: 'isActive',
        caption: 'Active',
        dataType: 'boolean',
        width: '10%',
        cssClass: 'row-data-center',
        cellRender: (cellData: any) => (
            <CheckBox defaultValue={cellData.data.isActive ?? false} disabled />
        ),
    },
    {
        dataField: 'price',
        caption: 'Price',
        dataType: 'number',
        width: '10%',
        format: '#,##0.00',
        validationRules: [{ type: 'required' }],
    },
    {
        dataField: 'quantity',
        caption: 'Quantity',
        dataType: 'number',
        width: '10%',
        validationRules: [{ type: 'required' }],
    },
    {
        dataField: 'category',
        caption: 'Category',
        width: '10%',
    },
    {
        dataField: 'rating',
        caption: 'Rating',
        dataType: 'number',
        width: '10%',
    },
    {
        dataField: 'manufacturer',
        caption: 'Manufacturer',
        width: '15%',
    },
    {
        dataField: 'sku',
        caption: 'SKU',
        width: '10%',
    },
    {
        dataField: 'releaseDate',
        caption: 'Release Date',
        dataType: 'date',
        width: '15%',
        format: 'dd/MM/yyyy',
    },
    {
        dataField: 'lastUpdated',
        caption: 'Last Updated',
        dataType: 'date',
        width: '15%',
        format: 'dd/MM/yyyy',
    },
    {
        dataField: 'isInStock',
        caption: 'In Stock',
        dataType: 'boolean',
        width: '10%',
        cssClass: 'row-data-center',
        cellRender: (cellData: any) => (
            <CheckBox defaultValue={cellData.data.isInStock ?? false} disabled />
        ),
    },
    {
        dataField: 'discount',
        caption: 'Discount',
        dataType: 'number',
        width: '10%',
        format: '#,##0.00',
    },
    {
        dataField: 'tags',
        caption: 'Tags',
        width: '20%',
        cellRender: (cellData: any) => (

            <div>{Array.isArray(cellData.data.tags) ? cellData.data.tags.join(', ') : ''}</div>
        ),
    },
    {
        dataField: 'warrantyPeriod',
        caption: 'Warranty Period',
        width: '15%',
    },
    {
        dataField: 'availableColors',
        caption: 'Available Colors',
        width: '20%',
        cellRender: (cellData: any) => (
            <div>{Array.isArray(cellData.data.availableColors) ? cellData.data.availableColors.join(', ') : ''}</div>
        ),
    },
    {
        dataField: 'stockLocation',
        caption: 'Stock Location',
        width: '15%',
    },
    {
        dataField: 'dimensions',
        caption: 'Dimensions',
        width: '25%',
        cellRender: (cellData: any) => (
            <div>
                {`L: ${cellData.data.dimensions.length}, W: ${cellData.data.dimensions.width}, H: ${cellData.data.dimensions.height}, Wt: ${cellData.data.dimensions.weight}`}
            </div>
        ),
    },
    {
        width: 50,
        allowSorting: false,
        allowResizing: false,
        allowEditing: false,
        dataField: 'delete',
        caption: 'Delete',
        cssClass: 'dx-datagrid-action',
        headerCellRender: () => <DeleteIcon className="text-red-600" />,
        showInColumnChooser: false,
    },
];


export const MasterDetailColumn: any[] = [
    {
        width: 50,
        allowSorting: false,
        allowResizing: false,
        allowEditing: false,
        dataField: 'edit',
        caption: 'Edit',
        cssClass: 'dx-datagrid-action',
        headerCellRender: () => <EditIcon className="text-brickworx-link" />,
      },
    {
        dataField: 'featureName',
        caption: 'Feature Name',
        width: '15%',
        validationRules: [{ type: 'required' }],
    },
    {
        dataField: 'isEnabled',
        caption: 'Enabled',
        dataType: 'boolean',
        width: '10%',
        cssClass: 'row-data-center',
        cellRender: (cellData: any) => (
            <CheckBox defaultValue={cellData.data.isEnabled ?? false} disabled />
        ),
    },
    {
        dataField: 'version',
        caption: 'Version',
        dataType: 'number',
        width: '10%',
        validationRules: [{ type: 'required' }],
    },
    {
        dataField: 'createdBy',
        caption: 'Created By',
        width: '15%',
    },
    {
        dataField: 'createdOn',
        caption: 'Created On',
        dataType: 'date',
        width: '15%',
        format: 'dd/MM/yyyy',
    },
    {
        dataField: 'lastUpdatedBy',
        caption: 'Last Updated By',
        width: '15%',
    },
    {
        dataField: 'lastUpdatedOn',
        caption: 'Last Updated On',
        dataType: 'date',
        width: '15%',
        format: 'dd/MM/yyyy',
    },
    {
        dataField: 'compatibility',
        caption: 'Compatibility',
        width: '15%',
    },
    {
        dataField: 'supportedLanguages',
        caption: 'Supported Languages',
        width: '20%',
        cellRender: (cellData: any) => (
            <div>{cellData.data.supportedLanguages.join(', ')}</div>
        ),
    },
    {
        dataField: 'isDeprecated',
        caption: 'Deprecated',
        dataType: 'boolean',
        width: '10%',
        cssClass: 'row-data-center',
        cellRender: (cellData: any) => (
            <CheckBox defaultValue={cellData.data.isDeprecated ?? false} disabled />
        ),
    },
    {
        width: 50,
        allowSorting: false,
        allowResizing: false,
        allowExporting:false,
        dataField: 'delete',
        caption: 'Delete',
        allowEditing: false,
        cssClass: 'dx-datagrid-action',
        headerCellRender: () => <DeleteIcon className="text-red-600" />,
        showInColumnChooser: false,
      },
];
