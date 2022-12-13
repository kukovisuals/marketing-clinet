import React from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const profileData = [
    'All Thongs Mix',
    'All Thongs Natural',
    'All Brief Mix',
    'All Brief Natural',
    'All Sheer Mix',
    'All Sheer Natural',
    'All Bralette Mix',
    'All Bralette Natural',
]

function Profile() {
    const sheet = useAppSelector((state) => state.sheet);

    return (
        <div className="Profile">
            <h2>Profile</h2>
            <div className="eby-wrapper">
                <div className="eby-container">
                    {sheet && sheet.map((profile: any) =>
                        <ListProfiles data={profile.name} key={profile.name} />
                    )}
                </div>
            </div>
            <div className="eby-pop">
                <div className="">
                    <div>
                        <span>Product name</span>

                    </div>

                </div>
            </div>
        </div>
    )
}

type ListProps = {
    data: string;
}

function ListProfiles(props: ListProps) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });


    const toggleDrawer =
        (anchor: string, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: string) => (
        <Box
            sx={{ width: 'auto' }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div>
                ALL BRIEFS  product
                <ul>
                    <li>xs</li>
                    <li>sm</li>
                    <li>md</li>
                    <li>lg</li>
                    <li>1x</li>
                    <li>2x</li>
                </ul>

            </div>
        </Box>
    );

    return (
        <div className="eby-list">
            <div>
                <span className='title-md'>{props.data}</span>
            </div>
            
            <div className="eby-bttm-abs">
                <Button variant="contained" onClick={toggleDrawer('bottom', true)}>ADD size</Button>
                <Drawer
                    anchor='bottom'
                    open={state['bottom']}
                    onClose={toggleDrawer('bottom', false)}
                >
                    {list('bottom')}
                </Drawer>
            </div>
        </div>
    )
}

function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}
export default Profile
