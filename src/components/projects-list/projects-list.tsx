import React from 'react';
import './projects-list.scss';

import Project from './project';

type propsType = {

};

function ProjectsList(props: propsType) {
    return (
        <div className={ 'ProjectsList' } style={ style.ProjectsListRoot }>
            <Project title={ 'Title' } imageSrc={ '' } />
            <Project title={ 'Title' } imageSrc={ '' } />
            <Project title={ 'Title' } imageSrc={ '' } />
            <Project title={ 'Title' } imageSrc={ '' } />
            <Project title={ 'Title' } imageSrc={ '' } />
            <Project title={ 'Title' } imageSrc={ '' } />
            <Project title={ 'Title' } imageSrc={ '' } />
            <Project title={ 'Title' } imageSrc={ '' } />
            <Project title={ 'Title' } imageSrc={ '' } />
            <Project title={ 'Title' } imageSrc={ '' } />
            <Project title={ 'Title' } imageSrc={ '' } />
            <Project title={ 'Title' } imageSrc={ '' } />
        </div>
    );
}

export default ProjectsList;

const style = {
    ProjectsListRoot: {
        width: '90%',
        margin: '10px auto 10px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, 180px)',
        gridGap: '20px',
        justifyContent: 'center',
        alignContent: 'start'
    },
};
