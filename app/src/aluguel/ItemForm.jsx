import { Grid } from "@mui/material";


export function ItemForm({label, value, set}) {


    return (
        <>
            <Grid item xs={4} style={{textAlign:'right'}}>
                {label}
            </Grid>
            <Grid item xs={8} style={{textAlign:'left'}}>
                <input style={{width:'100%'}} type='text' value={value} onChange={e => set(e.target.value)} ></input><br></br>
            </Grid>
        </>
    )
}