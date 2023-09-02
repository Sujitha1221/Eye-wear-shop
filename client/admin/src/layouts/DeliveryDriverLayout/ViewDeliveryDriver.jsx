import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const ViewDeliveryDriver = () => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#1d93bc',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }


    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];


    return (
        <>
            <div className='flex  justify-end'>
                <Link to="/delivery-driver/add-delivery-driver">
                    <button className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Add Delivery Driver
                    </button>
                </Link>
            </div>

            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Delivery ID</StyledTableCell>
                            <StyledTableCell align="right">Order ID</StyledTableCell>
                            <StyledTableCell align="right">Driver</StyledTableCell>
                            <StyledTableCell align="right">Address</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row"> row.name</StyledTableCell>
                            <StyledTableCell align="right">calories</StyledTableCell>
                            <StyledTableCell align="right">fat</StyledTableCell>
                            <StyledTableCell align="right">carbs</StyledTableCell>
                            <StyledTableCell align="right">protein</StyledTableCell>
                            <StyledTableCell align="right">
                                <Link to="/delivery/add-delivery">
                                    <button className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                        <ModeEditIcon />
                                    </button>
                                </Link>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <button className="bg-transparent text-red-600 border-red-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    <DeleteIcon />
                                </button>
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row"> row.name</StyledTableCell>
                            <StyledTableCell align="right">calories</StyledTableCell>
                            <StyledTableCell align="right">fat</StyledTableCell>
                            <StyledTableCell align="right">carbs</StyledTableCell>
                            <StyledTableCell align="right">protein</StyledTableCell>
                            <StyledTableCell align="right">
                                <Link to="/delivery/add-delivery">
                                    <button className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                        <ModeEditIcon />
                                    </button>
                                </Link>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <button className="bg-transparent text-red-600 border-red-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    <DeleteIcon />
                                </button>
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row"> row.name</StyledTableCell>
                            <StyledTableCell align="right">calories</StyledTableCell>
                            <StyledTableCell align="right">fat</StyledTableCell>
                            <StyledTableCell align="right">carbs</StyledTableCell>
                            <StyledTableCell align="right">protein</StyledTableCell>
                            <StyledTableCell align="right">
                                <Link to="/delivery/add-delivery">
                                    <button className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                        <ModeEditIcon />
                                    </button>
                                </Link>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <button className="bg-transparent text-red-600 border-red-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    <DeleteIcon />
                                </button>
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row"> row.name</StyledTableCell>
                            <StyledTableCell align="right">calories</StyledTableCell>
                            <StyledTableCell align="right">fat</StyledTableCell>
                            <StyledTableCell align="right">carbs</StyledTableCell>
                            <StyledTableCell align="right">protein</StyledTableCell>
                            <StyledTableCell align="right">
                                <Link to="/delivery/add-delivery">
                                    <button className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                        <ModeEditIcon />
                                    </button>
                                </Link>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <button className="bg-transparent text-red-600 border-red-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    <DeleteIcon />
                                </button>
                            </StyledTableCell>
                        </StyledTableRow>
                        
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ViewDeliveryDriver;
