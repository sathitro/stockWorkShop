import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { imageUrl } from "./../../constrant/Constrant";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import * as stockActions from "./../../actions/stock.action";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function Stock(props) {

    React.useEffect(() => {
        dispatch(stockActions.getProducts());
    }, []);

    const dispatch = useDispatch();
    const stockReducer = useSelector(({ stockReducer }) => stockReducer);

    const columnsSimple = [
        {
            title: "Id",
            field: "id",
        },
        {
            title: "Name",
            field: "name",
        },
        {
            title: "Image",
            field: "image",
        },
        {
            title: "price",
            field: "price",
            type: "numeric"
        },
    ];

    const columns = [
        {
            title: "Id",
            //Typography -> fornt
            render: (item) => <Typography variant="body1">{item.id}</Typography>,
        },
        {
            title: "Image",
            cellStyle: { padding: 0 },
            render: (item) => (
                <img
                    src={`${imageUrl}/images/${item.image}?dummy=${Math.random()}`}
                    style={{ width: 70, height: 70, borderRadius: "5%" }}
                    alt={item.image}
                />
            ),
        },
        {
            title: "Name",
            cellStyle: { minWidth: 700 },
            render: (item) => <Typography variant="body1">{item.name}</Typography>,
        },

        {
            title: "Price",
            render: (item) => (
                <Typography variant="body1">
                    <NumberFormat
                        value={item.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        prefix={"฿"}
                    />
                </Typography>
            ),
        },
        {
            title: "Stock",
            render: (item) => (
                <Typography variant="body1">
                    <NumberFormat
                        value={item.stock}
                        displayType={"text"}
                        thousandSeparator={true}
                        decimalScale={0}
                        fixedDecimalScale={true}
                        suffix={" pcs"}
                    />
                </Typography>
            ),
        },
        {
            title: "Updated",
            render: (item) => (
                <Typography>
                    <Moment format="DD/MM/YYYY">{item.updatedAt}</Moment>
                </Typography>
            ),
        },
    ];

    const useStyles = makeStyles((theme) => ({
        root: {
            width: "700",
            marginTop: 0,
        },
    }));

    const actions = [
        {
            icon: () => <Edit />,
            iconProps: { color: "primary" },
            tooltip: "Edit",
            onClick: (event, rowData) => {
                props.history.push("/stockEdit/" + rowData.id);
            },
        },
        {
            icon: () => <DeleteOutline />,
            iconProps: { color: "action" },
            tooltip: "Delete",
            onClick: (event, rowData) => {
                handleClickOpen(rowData);
            },
        },
    ];
    
    // ************************ Dialog ************************** //
    const [open, setOpen] = React.useState(false);
    //ไว้เก็บ id เวลากด Delete
    const [selectedItem, setSelectedItem] = React.useState(null);
    const handleClickOpen = (item) => {
        //เก็บ id ไว้ในตัวแปรระดับ State
        setSelectedItem(item);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const showDeletionConfirmDlg = () => {
        return selectedItem 
        ? (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >   
                {/* Title of Dialog */}
                <DialogTitle id="alert-dialog-title">
                    Are you sure to delete this item Id : {selectedItem.id}?
                </DialogTitle>
                {/* Picture */}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {/* Picture of Deleting -> selectedItem.image */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={`${imageUrl}/images/${selectedItem.image}`}
                                style={{ width: 50, height: 50, borderRadius: "5%" }}
                                alt=""
                            />
                            <span style={{ marginLeft: 20 }}>{selectedItem.name}</span>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => {
                            handleClose();
                            setSelectedItem(null);
                        }} 
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(stockActions.deleteProduct(selectedItem.id));
                            setSelectedItem(null);
                            handleClose();
                        }}
                        color="secondary"
                        autoFocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        ) 
        : null;
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MaterialTable
                icons={tableIcons}
                columns={columns}
                data={stockReducer.result ? stockReducer.result : []} // value or null
                title="Stock"
                // ยัดปุ่ม action ลงแต่ละ row
                actions={actions}
                // ยัด component เช่นปุ่ม
                components={{
                    Toolbar: (props) => (
                        <div>
                            <MTableToolbar {...props} />

                            {/* Create button */}
                            <div style={{ padding: "0px 10px" }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to="/stockCreate"
                                >
                                    Create
                                </Button>
                            </div>

                        </div>
                    ),
                    // Shadows ให้ Table ดูมีมิติ
                    Container: (props) => <Paper {...props} elevation={10} />
                }}
                options={{
                    //จำนวน row
                    pageSize: 8,
                    //search field
                    search: true,
                    rowStyle: (rowData, index) => ({
                        //สลับสีแต่ละ row
                        backgroundColor: (index % 2 === 0) ? "#f8faf9" : "#fff",
                    }),
                }}
            />

            {showDeletionConfirmDlg()}
        </div>
    );
}
