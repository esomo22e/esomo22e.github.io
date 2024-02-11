import React from "react";
import styled from "styled-components";

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

function Popup({ onClose, children }) {
  return (
    <PopupWrapper>
      <PopupContent>
        <CloseButton onClick={onClose}>Close</CloseButton>
        {children}
      </PopupContent>
    </PopupWrapper>
  );
}

export default Popup;
