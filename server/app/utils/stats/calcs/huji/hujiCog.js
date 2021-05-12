import { hujiInitial as std } from './standardization'

const {
    bagrut: bagrutCof,
    psycho: psychoCof,
    intercept
} = std

export const hujiCog = ({ bagrut, psycho }) => {
    return bagrutCof*bagrut + psychoCof*psycho + intercept
}

export const hujiCogRevBagrut = ({ psycho, cog }) => {
    return (cog - intercept - psychoCof*psycho) / bagrutCof
}

export const hujiCogRevPsycho = ({ bagrut, cog }) => {
    return (cog - intercept - bagrutCof*bagrut) / psychoCof
}