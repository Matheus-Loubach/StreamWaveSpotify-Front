import '../../ComponentsCSS/ListBest.css'

const ListBest = ({ music }: { music: any }) => {
    return (
        <div className='container_listBest'>
            <section>
                <div>
                <h1>Melhor resultado</h1>
                    <img
                        src={music.album.images[0].url}
                        alt={`Capa do álbum ${music.album.name}`}
                    />
                </div>
                <div>
                    <p>{music.artists[0].name}</p>
                    <p>{music.name}</p>
                </div>
            </section>
        </div>
    )
}

export default ListBest
