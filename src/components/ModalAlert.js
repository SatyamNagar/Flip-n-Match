import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1F1C2C',
    color: '#d8d8d8',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalAlert(props) {
    const [realModal, setRealModal] = useState(false);

    const handleClose = () => {

        props.setModalOpen(false);
        setRealModal(false);
    }

    const handleRefresh = () => {
        window.location.reload();
    }

    useEffect(() => {
        if (props.modalOpen) {
            setTimeout(() => {

                setRealModal(true)
            }, 1000);
        }
    }, [props.modalOpen])


    return (
        <div>
            <Modal
                open={realModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Congrats!! 🎉✨
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        You Won!
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Total Steps: {props.steps}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Hint Used: {props.revealUsed}
                    </Typography>
                    <div className="button-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Button sx={{ mt: 2, fontWeight: 'bold', background: '#a55ebf', color: 'black' }} variant="contained" color='secondary' onClick={handleRefresh}>Restart</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}