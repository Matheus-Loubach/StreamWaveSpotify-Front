export interface Track {
    name: string;
    album: {
        name: string,
        images: {
            url: string;
        }[];
    };
    artists: {
        name: string;
    }[];
    id: string;
    popularity: number;
}