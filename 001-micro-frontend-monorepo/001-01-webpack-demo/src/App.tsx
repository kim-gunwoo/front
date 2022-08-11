// import './styles/App.css';
// import './styles/App.scss';

import React from 'react';

import AppInner from './AppInner.page';
// import styles from './styles/App.module.css';
import styles from './styles/App.module.scss';

function App() {
    // console.log(process.env.TEST);

    // return (
    //     <div>
    //         backoffice onboarding <div className="inner">hello</div>
    //         <AppInner />
    //     </div>
    // );
    // css module
    // return (
    //     <div className={styles.body}>
    //         backoffice onboarding
    //         <div className="inner">hello</div>
    //         <AppInner />
    //     </div>
    // );
    // scss module
    return (
        <div className={styles.body}>
            backoffice onboarding
            <div className={styles.inner}>hello</div>
            <AppInner />
        </div>
    );
}

export default App;
