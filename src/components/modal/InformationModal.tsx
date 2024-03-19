import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { datavisSpecification } from '../../../globals';
import { Table } from '@mui/joy';

export default function InformationModal({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: Function }) {
  return (
    <>
      <Modal open={modalVisible} onClose={() => setModalVisible(false)}>
        <ModalDialog sx={{ overflowY: 'scroll' }}>
          <Typography level="h1">
            {datavisSpecification.name} @ {datavisSpecification.version}
          </Typography>
          <Typography id="nested-modal-description" textColor="text.tertiary">
            {datavisSpecification.description}
          </Typography>
          <Typography level="title-lg">
            Dependencies
          </Typography>
          <Table>
            <thead>
              <tr>
                <th style={{ width: '50%' }}>Name</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(datavisSpecification.dependencies).map((e, i) => (
                  <tr key={i}>
                    <td>{e}</td>
                    <td>{datavisSpecification.dependencies[e]}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </ModalDialog>
      </Modal>
    </>
  );
}
