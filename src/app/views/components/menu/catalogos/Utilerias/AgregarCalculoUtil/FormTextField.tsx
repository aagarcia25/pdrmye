import { Grid, Input, Typography } from "@mui/material";

interface FormTextFieldProps {
  text: string;
  inputPlaceholder: string;
  id: any;
}

export function FormTextField(props: FormTextFieldProps) {
  return (
    <>
      <Grid item xs={3} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ fontWeight: "Bold" }}>{props.text}:</Typography>
      </Grid>
      <Grid item xs={3}>
        <Input placeholder={props.inputPlaceholder}></Input>
      </Grid>
      <Grid item xs={6}></Grid>
    </>
  );
}
