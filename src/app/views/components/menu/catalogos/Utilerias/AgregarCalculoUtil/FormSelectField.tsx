import { Grid, Select, Typography } from "@mui/material";

interface FormSelectedFieldProps {
  id: any;
  text: string;
  value: any;
  onChange: any;
  items: any;
}

export function FormSelectedField(props: FormSelectedFieldProps) {
  return (
    <>
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "Bold" }}>{props.text}:</Typography>
      </Grid>
      <Grid item xs={1.6} sx={{}}>
        <Select
          fullWidth
          value={props.value}
          onChange={props.onChange}
          inputProps={{ "aria-label": "Without label" }}
        >
          {props.items}
        </Select>
      </Grid>
      <Grid item xs={6}></Grid>
    </>
  );
}
