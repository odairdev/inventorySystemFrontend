import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import styles from './styles.module.scss'

export const SideBarData = [
    {
        title: 'Início',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
        className: styles.navText
    },
    {
        title: 'Produtos',
        path: '/products',
        icon: <FaIcons.FaCartPlus />,
        className: styles.navText
    },
    {
        title: 'Estoque',
        path: '/inventory',
        icon: <FaIcons.FaBoxes />,
        className: styles.navText
    }
]