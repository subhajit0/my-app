import React, { useState } from "react";
import EditableDataTable from "component/EditableDataTable";
import { MasterColumn } from "./columns";
import { data } from "./data";
import { Button } from "devextreme-react/button";
import ChildOne from "./child";

interface DemoPageOneProps { }

const DemoPageOne: React.FC<DemoPageOneProps> = () => {
    const dataGrid = React.useRef<any>(null);
    const [editing, setEditing] = React.useState(false);

    const [selectedParentKeys, setSelectedParentKeys] = useState<number[]>([]);
    const [selectedChildKeys, setSelectedChildKeys] = useState<{
        [key: number]: number[];
    }>({});

    // Handle parent selection
    const handleParentSelectionChange = (e: any) => {
        const newSelectedKeys = e.selectedRowKeys;
        const deselectedKeys = e.currentDeselectedRowKeys;

        const updatedSelectedChildKeys = { ...selectedChildKeys };

        // When parent is selected, select all child rows for that parent
        newSelectedKeys.forEach((parentId: number) => {
            const childIds =
                data
                    .find((item: any) => item.id === parentId)
                    ?.features?.map((feature: any) => feature.cId) || [];
            updatedSelectedChildKeys[parentId] = childIds;
        });
        // When parent is deselected, deselect all child rows for that parent
        deselectedKeys.forEach((parentId: number) => {
            delete updatedSelectedChildKeys[parentId];
        });

        setSelectedParentKeys(newSelectedKeys);
        setSelectedChildKeys(updatedSelectedChildKeys);
    };

    // Handle child selection change
    const handleChildSelectionChange = (
        parentId: number,
        selectedChildRowKeys: number[]
    ) => {
        const updatedSelectedChildKeys = {
            ...selectedChildKeys,
            [parentId]: selectedChildRowKeys,
        };

        // If any child row is selected, select parent; if no child rows are selected, deselect parent
        const removeIdFromSelectedParentKeys = (idToRemove: number) => {
            setSelectedParentKeys((prevSelectedParentKeys) => {
                return prevSelectedParentKeys.filter((id) => id !== idToRemove);
            });
        };
        const addIdToSelectedParentKeys = (newId: number) => {
            setSelectedParentKeys((prevSelectedParentKeys) => {
                if (!prevSelectedParentKeys.includes(newId)) {
                    return [...prevSelectedParentKeys, newId];
                }
                return prevSelectedParentKeys;
            });
        };
        if (selectedChildRowKeys.length > 0) {
            addIdToSelectedParentKeys(parentId);
        } else {
            removeIdFromSelectedParentKeys(parentId);
        }

        setSelectedChildKeys(updatedSelectedChildKeys);
    };

    MasterColumn.forEach((e) => {
        if (e.dataField === "edit") {
            e.cellRender = (cellData: any) => (
                <Button
                    icon={cellData?.row?.isEditing ? "save" : "edit"}
                    onClick={() => {
                        dataGrid.current.instance.editRow(cellData.rowIndex);
                        if (cellData?.row?.isEditing) {
                            dataGrid.current.instance.saveEditData();
                        }
                    }}
                />
            );
        } else if (e.dataField === "delete") {
            e.cellRender = (cellData: any) => (
                <Button
                    icon={cellData?.row?.isEditing ? "revert" : "trash"}
                    onClick={() => {
                        if (cellData?.row?.isEditing) {
                            dataGrid.current.instance.cancelEditData();
                        } else {
                        }
                    }}
                />
            );
        }
    });

    return (
        <>
            <EditableDataTable
                selectedRowKeys={selectedParentKeys}
                onSelectionChanged={handleParentSelectionChange}
                width={"100%"}
                columnAutoWidth={true}
                reference={dataGrid}
                dataSource={data}
                columns={MasterColumn}
                keyExpr="id"
                isEditMode={editing}
                isProject={true}
                onSaved={() => setEditing(false)}
                showGroupPanel
                mode="multiple"
                enableMasterDetail={true}
                masterDetailComponent={(v) => (
                    <ChildOne
                        data={v}
                        handleChildSelectionChange={handleChildSelectionChange}
                        selectedChildKeys={selectedChildKeys}
                    />
                )}
            />
        </>
    );
};

export default DemoPageOne;
