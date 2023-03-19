import { Lightbulb } from "@mui/icons-material";
import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const createData = (combination: string, func: string) => ({ combination, func });

const rows = [createData("shift + >", "Increase video playback speed"), createData("shift + <", "Decrease video playback speed")];

export const Instructions = () => (
  <>
    <Chip icon={<Lightbulb />} label="Click the video player window before using keyboard shortcuts" variant="outlined" sx={{ marginTop: "20px" }} />
    <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Key combination</TableCell>
            <TableCell align="right">Function</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.combination} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.combination}
              </TableCell>
              <TableCell align="right">{row.func}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);
