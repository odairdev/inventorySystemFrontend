

import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface MainContainerProps {
    children: ReactNode;
}

export function MainContainer({children}: MainContainerProps) {
    return (
        <div className={styles.mainContainer}>
            {children}
        </div>
    )
}