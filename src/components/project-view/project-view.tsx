import * as React from 'react';
import './project-view.scss';

import Data from './data';
import Canvas from './canvas';

type Props = {
    title: string,
    infoText: string,
};

function ProjectView(props: Props) {
    return (
        <div style={ style.ProjectViewRoot }>
            <div className="ProjectView__title" style={ style.title }>
                { props.title }
            </div>
            <Data />
            <Canvas infoText={ props.infoText }/>
        </div>
    );
}

export default ProjectView;

const style = {
    ProjectViewRoot: {
        width: '90%',
        minWidth: '900px',
        margin: '10px auto',
        border: '1px solid red',
    },
    title: {
        marginBottom: '10px',
        fontSize: '20px',
    },
};
