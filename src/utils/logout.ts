import {destroyCookie} from 'nookies';
import Router from 'next/router'

export function handleLogout() {
    destroyCookie(undefined, 'helpdeskauth.token')
    Router.push('/login')
}