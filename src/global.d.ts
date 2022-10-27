declare namespace Menu {
    interface recordRaw {
        path?: string;
        meta: {
            title: string
            i18n?: string
            icon?: string
        };
        children?: recordRaw[];
    }
}
