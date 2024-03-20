import { Box, Grid, GridProps, styled } from "@mui/joy";

export default styled((props: GridProps) => <Grid sx={{ padding: 2 }} {...props}><Box sx={{ minHeight: 30, backgroundColor: 'background.surface', borderColor: 'background.level1', borderWidth: 1, borderStyle: 'solid', borderRadius: 5 }}>{props.children}</Box></Grid>)((() => ({
})))
