import React from "react";
import EditableDataTable from "component/EditableDataTable";
import { MasterDetailColumn } from "./columns";
import { Button } from "devextreme-react/button";

interface IChildOneProps {
    data: any;
    handleChildSelectionChange: (
        parentId: number,
        selectedChildRowKeys: number[]
    ) => void;
    selectedChildKeys: { [key: number]: number[] };
}

const ChildOne: React.FC<IChildOneProps> = ({
    data,
    handleChildSelectionChange,
    selectedChildKeys,
}) => {
    const dataGridChild = React.useRef<any>(null);
    const [editing, setEditing] = React.useState(false);

    MasterDetailColumn.forEach((e) => {
        if (e.dataField === "edit") {
            e.cellRender = (cellData: any) => (
                <Button
                    icon={cellData?.row?.isEditing ? "save" : "edit"}
                    onClick={() => {
                        dataGridChild.current.instance.editRow(cellData.rowIndex);
                        if (cellData?.row?.isEditing) {
                            dataGridChild.current.instance.saveEditData();
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
                            dataGridChild.current.instance.cancelEditData();
                        } else {
                        }
                    }}
                />
            );
        }
    });

    return (
        <>
            <Button
                text="Add New"
                icon="add"
                type="default"
                stylingMode="contained"
                onClick={() => {
                    dataGridChild.current.instance.addRow();
                    setEditing(true);
                }}
            />
            <EditableDataTable
                toolbar={{
                    items: [
                        {
                            widget: "dxButton",
                            options: {
                                icon: "add",
                                text: "Add New",
                                onClick: () => {
                                    dataGridChild.current.instance.addRow();
                                    setEditing(true);
                                },
                            },
                            visible: false,
                        },
                    ],
                }}
                selectedRowKeys={selectedChildKeys[data.data.key] || []}
                onSelectionChanged={(e) =>
                    handleChildSelectionChange(data.data.key, e.selectedRowKeys)
                }
                width={"80%"}
                columnAutoWidth={true}
                showColumnChooser={false}
                groupPanel={{ visible: false }}
                reference={dataGridChild}
                dataSource={data.data.data.features}
                columns={MasterDetailColumn}
                keyExpr="cId"
                isEditMode={editing}
                isProject={true}
                onSaved={() => setEditing(false)}
                showGroupPanel
                mode="multiple"
            />
        </>
    );
};

export default React.memo(ChildOne);
