import React from 'react';

import './nav-bar.scss';

function NavBar() {

    return (
        <div style={ style.navRoot }>
            <div style={ style.content }>
                <div style={ style.title }>Canvas Illustrations</div>
                <div className={ 'NavBar__back-btn' }
                     style={ style.backBtn }
                >Back</div>
            </div>
        </div>
    );
}

export default NavBar;

const style = {
    navRoot: {
        height: '10vh',
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white'
    },
    title: {
        fontSize: '20px'
    },
    backBtn: {
        padding: '5px 15px',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '5px',
        cursor: 'pointer'
    },
};
