import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React from 'react'
import Footer from './Footer'
import MenuItem from './MenuItem'
import Profile from './Profile'

interface SidebarProps {
    activeMenu: 'overview' | 'transactions' | 'settings'
}
export default function Sidebar(props: SidebarProps) {
    const { activeMenu } = props;
    const router = useRouter()

    const onLogout = async () => {
        Cookies.remove('token')
        router.push('/sign-in')
    }

    return (
        <div>
            <section className="sidebar">
                <div className="content pt-50 pb-30 ps-30">
                    <Profile />
                    <div className="menus">
                        <MenuItem title='Overview' icon='ic-menu-overview' active={activeMenu === 'overview'} href='/member' />
                        <MenuItem title='Transactions' icon="ic-menu-transaction" active={activeMenu === 'transactions'} href='/member/transactions' />
                        <MenuItem title='Messages' icon='ic-menu-messages' href='/member/messages' />
                        <MenuItem title='Card' icon='ic-menu-card' href='/member/messages' />
                        <MenuItem title='Rewards' icon='ic-menu-rewards' href='/member/rewards' />
                        <MenuItem title='Settings' icon='ic-menu-settings' active={activeMenu === 'settings'} href='/member/edit-profile' />
                        <MenuItem title='Log Out' icon='ic-menu-logout' onClick={onLogout} />
                    </div>
                    <Footer />
                </div>
            </section>
        </div>
    )
}
