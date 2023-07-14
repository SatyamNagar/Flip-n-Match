import React, { useEffect, useState } from 'react'
import './home.css'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Socials from './Socials';
import ModalAlert from './ModalAlert';

const images = [
    require('../images/1.png'),
    require('../images/1.png'),
    require('../images/p2.png'),
    require('../images/p2.png'),
    require('../images/p3.png'),
    require('../images/p3.png'),
    require('../images/p4.png'),
    require('../images/p4.png'),
    require('../images/p5.png'),
    require('../images/p5.png'),
    require('../images/p6.png'),
    require('../images/p6.png'),
    require('../images/p7.png'),
    require('../images/p7.png'),
    require('../images/p8.png'),
    require('../images/p8.png'),
    require('../images/p9.png'),
    require('../images/p9.png'),
    require('../images/p10.png'),
    require('../images/p10.png'),
    require('../images/p11.png'),
    require('../images/p11.png'),
    require('../images/p12.png'),
    require('../images/p12.png'),
    require('../images/p13.png'),
    require('../images/p13.png'),
    require('../images/p14.png'),
    require('../images/p14.png')
]

export default function Home() {
    const [shuffledImages, setShuffledImages] = useState('');
    const [clicks, setClicks] = useState(0);
    const [prevElm, setPrevElm] = useState([]);
    const [stepCount, setStepCount] = useState(0)
    const [modalOpen, setModalOpen] = useState(false);
    const [revealUsed, setRevealUsed] = useState('No');

    const containerStyle = {
        margin: '3rem auto',
        padding: '1rem',
        borderRadius: 1,
        boxShadow: '0px 0px 10px 1px rgb(69, 69, 69)',
        width: '70vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        background: '#928DAB'
    }

    useEffect(() => {
        // Function to shuffle the array using Fisher-Yates algorithm
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // Shuffle the images array
        setShuffledImages(shuffleArray(images))
    }, [])

    useEffect(() => {
        if (stepCount > 15) {
            const cells = document.querySelectorAll('.flipped');
            let allFlipped = false;

            if (cells.length === 28) {
                allFlipped = true;

                if (allFlipped) {
                    setModalOpen(true);
                }
            }
        }
    }, [stepCount])


    const handleFlip = (element, src) => {
        setStepCount(prev => prev + 1)
        setClicks(prev => prev + 1);
        element.currentTarget.style.transform = 'rotateY(180deg)';
        element.currentTarget.style.pointerEvents = 'none';


        if (clicks === 0) {
            setPrevElm([element, src]);

        } else if (clicks === 1) {
            if (src === prevElm[1]) {
                element.currentTarget.className = 'flip-container flipped'
                prevElm[0].target.className = 'flip-container flipped'
                setClicks(0);

            }
            else {
                setTimeout(() => {
                    element.target.style.transform = 'rotateY(0deg)'
                    element.target.style.pointerEvents = 'auto'

                    prevElm[0].target.style.transform = 'rotateY(0deg)'
                    prevElm[0].target.style.pointerEvents = 'auto'
                }, 1000);
                setClicks(0);
            }
        }
    }

    const handleReveal = (elm) => {
        elm.currentTarget.style.pointerEvents = 'none'
        elm.currentTarget.style.background = '#e7a4ff'
        elm.currentTarget.style.opacity = '.6'
        setRevealUsed('Yes');
        const gItems = document.querySelectorAll('.flip-container');
        gItems.forEach((item) => {
            item.style.transform = 'rotateY(180deg)'
        });
        setTimeout(() => {
            gItems.forEach((item) => {
                if (item.classList.contains('flipped')) {
                    return;
                }
                item.style.transform = 'rotateY(0deg)'
            });
        }, 1600);
    }

    return (
        <div className='home-body'>
            <Socials />
            <ModalAlert revealUsed={revealUsed} steps={stepCount} modalOpen={modalOpen} setModalOpen={setModalOpen} />

            <h1 className='title-h1'>Flip 'n Match 🤔🤯</h1>
            <p className='subtitle'>Match 'em fast, memory will last!. (made by: Satyam Nagar)</p>

            <Container className='tab-menu' sx={containerStyle}>

                <span className='score'>Steps: {stepCount}</span>
                <Button id='reveal-btn' onClick={(elm) => { handleReveal(elm) }} sx={{ fontWeight: 'bold', background: '#a55ebf', color: 'black' }} variant="contained" color='secondary'>
                    Reveal
                </Button>
                <Button sx={{ fontWeight: 'bold', background: '#a55ebf', color: 'black' }} variant="contained" color='secondary' onClick={() => window.location.reload()}>Clear</Button>

            </Container>

            <div className="container">
                <div className="grid-container">

                    {shuffledImages && shuffledImages.map((src, key) => {
                        return (
                            <div key={`${src}${key}`} className="grid-item">
                                <div
                                    onClick={(element) => { handleFlip(element, src) }}
                                    className="flip-container">
                                    <div className="item-front">

                                    </div>
                                    <div className="item-back">
                                        <img src={src} alt="" />
                                    </div>
                                </div>
                            </div>)
                    })}

                </div>
            </div>
        </div>
    )
}
