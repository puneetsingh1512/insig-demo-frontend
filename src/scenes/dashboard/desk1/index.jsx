import { Box, useTheme, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import { mockData1 } from "../../../data/mockData";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ExpandAllButton,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

const Desk1 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "order_id", headerName: "Order ID", flex: 1 },
    { field: "basket_id", headerName: "Basket ID", flex: 1 },
    { field: "sender", headerName: "Email", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  const columns1 = useMemo(
    () => [
      { header: "Order ID", accessorKey: "OMS_ORDER_ID" },
      { header: "Basket ID", accessorKey: "OMS_BASKET_ID" },
      { header: "Email", accessorKey: "EMAIL_MESSAGE_ID" },
      { header: "Subject", accessorKey: "CORRESPONDENCE_SUBJECT" },
      { header: "Date", accessorKey: "ORDER_INCEPTION_DATE" },
      // { header: "Status", accessorKey: "stage" },
    ],
    []
  );

  // const data = useMemo(() => mockData1, []);

  const [data, dataChange] = useState([]);

  useEffect(() => {
    fetch("https://insig-function-app.azurewebsites.net/api/orderdetails")
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        dataChange(resp["orders"]);
        console.log(resp);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const table = useMaterialReactTable({
    columns: columns1,
    data,
    // displayColumnDefOptions: {
    //   "mrt-row-expand": {
    //     Header: () => (
    //       <Stack direction="row" alignItems="center">
    //         <MRT_ExpandAllButton table={table} />
    //         <Box>Stage</Box>
    //       </Stack>
    //     ),
    //     GroupedCell: ({ row, table }) => {
    //       const { grouping } = table.getState();
    //       return row.getValue(grouping[grouping.length - 1]);
    //     },
    //     enableResizing: true,
    //     muiTableBodyCellProps: ({ row }) => ({
    //       sx: (theme) => ({
    //         color:
    //           row.depth === 0
    //             ? theme.palette.primary.main
    //             : row.depth === 1
    //             ? theme.palette.secondary.main
    //             : undefined,
    //       }),
    //     }),
    //     size: 200,
    //   },
    // },
    enableGrouping: true,
    enableColumnResizing: true,
    groupedColumnMode: "reorder",
    initialState: {
      density: "compact",
      expanded: true, //expand all groups by default
      // grouping: ["stage"], //an array of columns to group by by default (can be multiple)
      pagination: { pageIndex: 0, pageSize: 20 },
      // sorting: [{ id: "stage", desc: true }],
    },
  });

  return (
    <Box m="20px">
      <Header title="Desk 1" />
      <MaterialReactTable table={table} />
    </Box>
  );

  return (
    <Box m="20px">
      <Header title="Desk 1" />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScrollerContent": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockData1}
          columns={columns}
          getRowId={(row) => row.sender + row.subject}
        />
      </Box>
    </Box>
  );
};

export default Desk1;
