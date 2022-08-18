import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function DropShipTable({userId}) {
const [orders,setOrders]= React.useState([])
  const showOrder = async () => {
    let response = await fetch("http://localhost:5000/api/drop/getDrop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ userId}),
    });
    let result = await response.json();
    setOrders(result.message)
    console.log(result.message);
  };
  React.useEffect(() => {
    showOrder()
  },[]);


let ordersMap = orders || [];

const deleteHelper = async (id, userId,instaLink) => {
  console.log("deleteHelper", id, userId);
  let response = await fetch("http://localhost:5000/api/drop/deleteLink", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ id, userId,instaLink }),
  });
  let result = await response.json();
  console.log(result)
  showOrder()
 
};

  console.log(orders);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">id </TableCell>
            <TableCell align="right">Дата </TableCell>
            <TableCell align="right">цена клик </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersMap.map((row) => (
            <TableRow
              // onClick={() => navigate(`/OrderDetails/id:`+ row._id + ':'+ row.userId)}
              style={
                row.arrived === true
                  ? { backgroundColor: "grey" }
                  : { backgroundColor: "white" }
              }
              key={Math.random()}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.numberId} </TableCell>
              <TableCell align="right">{row.time} </TableCell>
              <TableCell align="right">
                <a href={row.instaLink}>{row.priceBuy}</a> /
                <a href={row.instaSupplier}>{row.priceSell}</a> /
                {row.courier}
                <span onClick={()=>deleteHelper(row.numberId, row.owner, row.instaLink)}>  X </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

