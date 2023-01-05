import React from "react";
import { useAppSelector } from '../../app/hooks';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomButtonWhite = styled(Button)`
height: 55px;
border: 1px solid #FFF;
color: #FFF;
margin-right:10px;
  &:hover{
    border: 1px solid gray;
  }
`;
const CustomButton = styled(Button)`
  height: 55px;
  border: 1px solid red;
  color: red;
`;

function Send() {
  const sheet = useAppSelector((state) => state.sheet);
  const [loadModal, setLoadModal] = React.useState(false);
  const [profilesModified, setProfilesModified] = React.useState(0);

  const handleSend = () => {
    console.log('im live')
    // we have to grab the sheet from redux
    const pass = handleErrors(sheet)
    if (!pass) return
    // Grab the data that has info in it
    const hasData = sheet.filter((d: any, i: number) => d.pdps2.length > 0)
    console.log(hasData)
    setProfilesModified(hasData.length)
    // create a modal to notify the user how many changes they are about to make
    setLoadModal(true)
  }

  return (
    <div className="Send">
      <div>
        <CustomButton
          variant="outlined"
          onClick={handleSend}>
          Send Data
        </CustomButton>
      </div>
      {loadModal &&
        <LoadModal
          loadModal={loadModal}
          setLoadModal={setLoadModal}
          profilesModified={profilesModified} />
      }
    </div>
  )
}

type ModalProps = {
  loadModal: boolean;
  profilesModified: number;
  setLoadModal: React.Dispatch<React.SetStateAction<boolean>>
}

function LoadModal({ loadModal, setLoadModal, profilesModified }: ModalProps) {
  /*  
    ****************************************************************
    * CRUD method to modified the database
    *  Let the user know changes have been made
    ****************************************************************
  */
  const handleYes = () => {
    alert('🙌 Yay! You have made some changes to the Database 😃')
    setLoadModal(false)
  }
  const handleNo = () => {
    alert('😀 Always good to double check 👍')
    setLoadModal(false)
  }
  return (
    <div className="Modal modal-style" >
      <div className="modal-margin">
        <div className="">
          <h2 className="modal-title">YOU ARE MODIFYING {profilesModified} PROFILE</h2>
          <h3 className="modal-title">Want to Send it?</h3>
        </div>
        <div className="modal-buttons">
          <CustomButtonWhite
            variant="outlined"
            onClick={handleYes}>
            Yes
          </CustomButtonWhite>
          <CustomButtonWhite
            variant="outlined"
            onClick={handleNo}>
            No
          </CustomButtonWhite>
        </div>
      </div>
    </div>
  )
}

function handleErrors(data: any) {
  if (data.length < 1) {
    alert('🙃 Oh my! Make sure you are sending data')
    return false
  }
  return true
}
export default Send;
