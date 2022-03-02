
interface usePlugin  {
    [name: string]:boolean[]
}

interface Plugins  {
    [name: string] : usePlugin[]
}

export type {Plugins}
