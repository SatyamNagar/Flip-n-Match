import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ShareIcon from '@mui/icons-material/Share';
const actions = [
    { icon: <LinkedInIcon />, name: 'LinkedIn', url: 'https://www.linkedin.com/in/satyamnagar/' },
    { icon: <InstagramIcon />, name: 'Instagram', url: 'https://www.instagram.com/urstrulysatyam_/' },
    { icon: <GitHubIcon />, name: 'GitHub', url: 'https://github.com/SatyamNagar/' },
];

export default function Socials() {
    return (
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', right: 0, bottom: 0, zIndex: 300 }}>
            <SpeedDial
                ariaLabel="socials"
                className='dialer'
                sx={{ position: 'absolute', bottom: 20, right: 20 }}
                icon={<ShareIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={<a className='social-anchor' href={action.url} target="_blank" rel="noopener noreferrer">{action.icon}</a>}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}