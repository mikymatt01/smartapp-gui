import React, { useContext } from "react"
import { TranslationContext } from "../hooks/translation"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const Maintenance = () => {
    const { translate } = useContext(TranslationContext)
    function BasicCard() {
        return (
            <Card sx={{ minWidth: 275, borderRadius: 5 }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                    benev
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
            </Card>
        );
        }
    return (
        <div style={{padding: 10}}>
            <h3>ciao</h3>
            <BasicCard />
        </div>
    )
}

export default Maintenance