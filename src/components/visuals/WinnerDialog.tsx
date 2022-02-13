import { Button, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import TwitterIcon from '@mui/icons-material/Twitter';
export const WinnerDialog = (props: {
    open: boolean;
    handleClose: () => void;
  
}) => {
    const { open, handleClose } = props;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>

                {open ? (
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme: any) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
                ¡Enhorabuena!
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    ¡Felicidades! ¡Has ganado este juego! ¿Quieres compartirlo en redes sociales?
                </DialogContentText>
                <Button href="https://twitter.com/intent/tweet?text=%C2%A1Acabo%20de%20encontrar%20todos%20los%20tesoros!%20%C2%BFY%20t%C3%BA%3F%20%C2%BFTe%20atreves%3F" variant="contained" endIcon={<TwitterIcon />}>
                    Tuips
                </Button>




            </DialogContent>
        </Dialog>
    );
};