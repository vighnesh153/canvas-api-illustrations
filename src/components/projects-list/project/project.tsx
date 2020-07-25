import * as React from 'react';
import './project.scss';

type Props = {
    title: string,
    imageSrc: string
};

function Project(props: Props) {
    return (
        <div className={ 'Project' } style={ style.ProjectRoot }>
            <div className="ProjectsList__image" style={ style.image }>
                <img src={ props.imageSrc } alt="Illustration snap"/>
            </div>
            <div className="ProjectsList__title" style={ style.title }>
                { props.title }
            </div>
        </div>
    );
}

export default Project;

const style = {
    ProjectRoot: {
        width: '100%',
        height: '200px',
        borderRadius: '10px',
        boxShadow: '0 0 10px #bbb',
        cursor: 'pointer'
    },
    image: {
        width: '90%',
        height: '60%',
        border: '1px solid #bbb',
        margin: '10px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5px',
    },
    title: {
        width: '90%',
        margin: 'auto',
        fontSize: '20px',
    },
};
