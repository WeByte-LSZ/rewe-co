import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';

export default function BasicModalDialog() {
    const [open, setOpen] = React.useState<boolean>(false);
    return (
        <React.Fragment>
            <Button
                variant="outlined"
                color="neutral"
                startDecorator={<Add />}
                onClick={() => setOpen(true)}
            >
                Neuer Report
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <DialogTitle>Erstelle einen neuen Report.</DialogTitle>
                    <DialogContent>Fülle die benötigten Daten dafür aus.</DialogContent>
                    <form
                        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            setOpen(false);
                        }}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input autoFocus required />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input required />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Litres of fuel</FormLabel>
                                <Input type="number" required />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Truck cooling co2</FormLabel>
                                <Input required />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input required />
                            </FormControl>
                            <Button type="submit">Erstellen</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
