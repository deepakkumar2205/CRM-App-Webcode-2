import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function Cardbody({emp}) {
    return <Card key={emp._id} sx={{ maxWidth: 345 ,margin:'15px',boxShadow:'2px 2px 10px'}}>
      <CardMedia
        component="img"
        alt="green iguana"
        // height="140"
        width='100%'
        src={emp.imageUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {emp.firstName}
        </Typography>
        <Typography  color="text.secondary" variant='h6'>
         <div><b><u>Role Id :</u></b> {emp.roleId}</div>
        </Typography>
      </CardContent>
         </Card>;
  }