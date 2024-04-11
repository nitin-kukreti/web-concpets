import { Fab, FabProps } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

export const FabButton = (props:FabProps) => {
  return (
    <Fab  {...props}>
      <AddIcon />
    </Fab>
  )
}
