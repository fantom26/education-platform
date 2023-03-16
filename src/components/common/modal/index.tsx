import { FC, ReactNode } from "react";

import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export interface ModalTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const ModalStyled = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

export const ModalTitle = (props: ModalTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface ModalProps {
  children: ReactNode;
  handleClose: () => void;
  open: boolean;
}

export const Modal: FC<ModalProps> = ({ children, handleClose, open }) => (
  <ModalStyled onClose={handleClose} open={open}>
    {children}
  </ModalStyled>
);
