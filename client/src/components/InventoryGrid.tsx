import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';

import { randProductName, randNumber, randProductDescription } from '@ngneat/falso';


import { trpc } from '../utils/trpc';

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;
    const createMutation = trpc.inventoryItems.create.useMutation();

    const handleAddClick = () => {
        const id = '';
        setRows((oldRows) => [...oldRows, { id: '', name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    const handleRandomClick = async () => {
        const randoData = {
            name: randProductName(),
            serial: randNumber().toString(),
            description: randProductDescription(),
            quantity: randNumber(),
        }
        const response = await createMutation.mutateAsync(randoData);
        console.log(response[0]);
        const updatedRow = { ...randoData, ...response[0], isNew: true };
        setRows((oldRows) => [...oldRows, updatedRow]);
        return updatedRow;
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
                Add record
            </Button>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleRandomClick}>
                Add random item
            </Button>
        </GridToolbarContainer>
    );
}

export function InventoryGrid() {
    const { status, data } = trpc.inventoryItems.list.useQuery();
    const createMutation = trpc.inventoryItems.create.useMutation();
    const updateMutation = trpc.inventoryItems.update.useMutation();
    const deleteMutation = trpc.inventoryItems.delete.useMutation();

    const [rows, setRows] = useState<GridRowsProp>([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    useEffect(() => {
        if (status === 'success') {
            setRows(data);
        }
    }, [status, data]);

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => async () => {
        deleteMutation.mutate({ id: parseInt(id.toString()) });
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow: GridRowModel) => {
        let updatedRow: GridRowModel;

        if (newRow.id === '') {
            const response = await createMutation.mutateAsync({
                name: newRow.name,
                serial: newRow.serial,
                description: newRow.description,
                quantity: newRow.quantity,
            });
            updatedRow = { ...newRow, isNew: false, id: response[0].id, created_at: response[0].created_at };
        } else {
            await updateMutation.mutateAsync({
                id: newRow.id,
                name: newRow.name,
                serial: newRow.serial,
                description: newRow.description,
                quantity: newRow.quantity,
            });
            updatedRow = { ...newRow, isNew: false };
        }

        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150, editable: true },
        { field: 'serial', headerName: 'Serial', width: 150, editable: true },
        { field: 'description', headerName: 'Description', width: 300, editable: true },
        { field: 'quantity', headerName: 'Quantity', type: "number", width: 90, editable: true },
        { field: 'created_at', headerName: 'Created At', type: "number", width: 200 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </Box>
    );
}