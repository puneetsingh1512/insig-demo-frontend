import { Box, useTheme } from "@mui/material";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Desk1 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme.palette.mode, //let's use the same dark/light mode as the global theme

          primary: theme.palette.primary, //swap in the secondary color as the primary for the table

          info: {
            main: "rgb(104, 188, 227)", //add in a custom color for the toolbar alert background stuff
          },

          background: {
            default:
              theme.palette.mode === "light"
                ? "#000" //random light yellow color for the background in light mode
                : "#000", //pure black table in dark mode for fun
          },
        },

        typography: {
          button: {
            textTransform: "none", //customize typography styles for all buttons in table by default

            fontSize: "1.2rem",
          },
        },

        components: {
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                fontSize: "1.1rem", //override to make tooltip font size larger
              },
            },
          },

          MuiSwitch: {
            styleOverrides: {
              thumb: {
                color: "pink", //change the color of the switch thumb in the columns show/hide menu to pink
              },
            },
          },
        },
      }),

    [theme]
  );
  const columns1 = useMemo(
    () => [
      { header: "Basket ID", accessorKey: "OMS_BASKET_ID" },
      { header: "Order ID", accessorKey: "ORDER_ID" },
      { header: "Client ID", accessorKey: "CLIENT_ID" },
      { header: "Sender", accessorKey: "CLIENT_EMAIL" },
      {
        header: "Email",
        // accessorFn: (row) => `${row.CORRESPONDENCE_SUBJECT}`,
        // Cell: ({ renderedCellValue, row }) => (
        //   <Link to={`${row.USER_LINK}`}>{`${row.original.Sender}`}</Link>
        // ),
        accessorFn: (row) => row,
        Cell: ({ cell }) => {
          const row = cell.getValue();
          return (
            <Link
              to={`${row.EMAIL_LINK}`}
              target="_blank"
            >{`${row.CORRESPONDENCE_SUBJECT}`}</Link>
          );
        },

        // accessorKey: "CORRESPONDENCE_SUBJECT"
      },
      { header: "Date", accessorKey: "ORDER_INCEPTION_DATE" },
      { header: "Share", accessorKey: "CUSIP" },
      { header: "Qty", accessorKey: "NO_OF_SHARES" },
      { header: "Buy/Sell", accessorKey: "BUY_OR_SELL" },
      { header: "Price", accessorKey: "ORDER_PRICE" },
      { header: "Status", accessorKey: "STATUS_NAME" },
      { header: "Status Group", accessorKey: "STATUS_GROUP" },
    ],
    []
  );

  // const data = useMemo(() => mockData1, []);

  const [data, dataChange] = useState([]);

  useEffect(() => {
    fetch("https://insigeno-latest-fx.azurewebsites.net/api/orderdetails")
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
    renderTopToolbar: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: colors.rowColor[1000],
        }}
      >
        <Box sx={{ display: "flex", gap: "1rem", ml: "40px" }}>
          <h2>
            <font color="white">OMS Blotter</font>
          </h2>
        </Box>
        <Box sx={{ display: "flex", gap: "1rem", mr: "40px" }}>
          <Button
            size="small"
            sx={{
              backgroundColor: colors.rowColor[500],
            }}
            onClick={() => {
              alert("Add Order");
            }}
            variant="contained"
          >
            ADD ORDER
          </Button>
          <Button
            size="small"
            sx={{
              backgroundColor: colors.rowColor[500],
            }}
            onClick={() => {
              alert("Assign Order");
            }}
            variant="contained"
          >
            ASSIGN
          </Button>
          <Button
            size="small"
            sx={{
              backgroundColor: colors.rowColor[500],
            }}
            onClick={() => {
              alert("Take Ownership");
            }}
            variant="contained"
          >
            TAKE OWNERSHIP
          </Button>
        </Box>
      </Box>
    ),
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
    enableTopToolbar: true,
    positionToolbarAlertBanner: "none",
    enableColumnResizing: true,
    groupedColumnMode: "reorder",
    initialState: {
      density: "compact",
      expanded: true, //expand all groups by default
      grouping: ["STATUS_GROUP"], //an array of columns to group by by default (can be multiple)
      pagination: { pageIndex: 0, pageSize: 20 },
      sorting: [{ id: "STATUS_GROUP", desc: true }],
    },
    muiTableHeadRowProps: {
      sx: (theme) => ({
        backgroundColor: colors.rowColor[900],
      }),
    },
    muiColumnActionsButtonProps: {
      sx: (theme) => ({
        backgroundColor: colors.rowColor[900],
      }),
    },
    muiBottomToolbarProps: {
      sx: (theme) => ({
        backgroundColor: colors.rowColor[900],
      }),
    },
    muiTableBodyRowProps: ({ row }) => ({
      sx: (theme) => ({
        backgroundColor:
          row.depth === 0
            ? colors.rowColor[900]
            : row.id % 2 === 0
            ? colors.grey[900]
            : colors.grey[1000],
      }),
    }),
  });

  return (
    <Box m="20px">
      <Header title="Desk 1" />
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable table={table} />
      </ThemeProvider>
    </Box>
  );
};

export default Desk1;
