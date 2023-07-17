import {Socket, io} from 'socket.io-client'
import {API_URL} from '../constants/Constants'

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : API_URL
export const socket: Socket = io(API_URL)
