import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useNavigate } from "react-router-dom";

console.log(Math.random());

const deleteHelper = async (id, userId) => {
  console.log("deleteHelper", id);
  let response = await fetch("http://localhost:5000/api/deleteOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ id, userId }),
  });
};

const detailPage = async (_id, userId) => {
  console.log("detailPageHelper", _id, userId);
  let response = await fetch("http://localhost:5000/api/detailOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ _id, userId }),
  });
};

export default function AddOrderTable({ orders }) {
  let navigate = useNavigate();



  let ordersMap = orders || [];

  console.log(typeof ordersMap);
  console.log(orders);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Имя фамилия</TableCell>

            <TableCell align="right"> Опл.  Дост.</TableCell>

            <TableCell align="right"> Цена</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {ordersMap.map((row) => (
            <TableRow 
              onClick={() => navigate(`/OrderDetails/id:`+ row._id + ':'+ row.userId)}
              style={row.arrived ===true?{backgroundColor: "grey" }: {backgroundColor: "white"}}
              key={Math.random()}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >

              
              <TableCell
                component="th"
                scope="row"
              >
                {row.firstName} {row.lastName} {row.city} <br/>{row.time}
              </TableCell>

              <TableCell align="right">{row.payed && "Опл."} {row.arrived && "Дост."} </TableCell>
              <TableCell align="right">{row.price}   </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// onClick={()=>deleteHelper(row.id, row.userId, row.instaLinkCustomer, row.instaLinkGoods)}
