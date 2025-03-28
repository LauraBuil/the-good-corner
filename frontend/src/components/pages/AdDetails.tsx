// React & React Router
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'

// Librairies
import { toast } from 'react-toastify';

// Axios
import axios from 'axios'

// Types
import { AdCardProps } from '../../interfaces/ShareInterfaces.tsx';

export default function AdDetails() {
    const { id } = useParams();
    const [ ad, setAd ] = useState<AdCardProps>()
    const navigate = useNavigate()

    const fetchAd = async () => {
        try {
            const result = await axios.get(`http://localhost:3000/ads/${id}`)
            setAd(result.data)
        } catch (err) {
            console.log(err)
        }
    }

    const delAds = async (id: number) => {
        try {
            const result = await axios.delete(`http://localhost:3000/ads/${id}`)
            setAd(result.data)
            navigate("/")
            toast.success(`L'annonce a été supprimée`)
        } catch (error) {
            console.error
            toast.error(`L'annonce n'a pas pu être supprimée`)
        }
    }

    // new Date(ad.createdAt).toLocaleString("fr-FR", {
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    //     hour: "2-digit",
    //     minute: "2-digit",
    //   })

    useEffect(() => {
        fetchAd()
    }, [id])

    return (
        <>
            {ad === undefined ? 
                <p>La page se charge</p>
                : 
                <>
                    <h2>{ad.title}</h2>
                    <section className="ad-details">
                        <div className="ad-details-image-container">
                        <img className="ad-details-image" src={ad.pictureUrl} />
                        </div>
                        <div className="ad-details-info">
                        <div className="ad-details-price">{ad.price} €</div>
                        <div className="ad-details-description">
                        {ad.description}
                        </div>
                        <hr className="separator" />
                        <div className="ad-details-owner">
                            Annoncée publiée par <b>{ad.author}</b> {ad.createdAt}.
                        </div>
                        <a href="mailto:serge@serge.com" className="button button-primary link-button">
                            Envoyer un email
                        </a>
                        <button className='button' onClick={() => delAds(ad.id)}>
                            Supprimer
                        </button>
                        <button className='button' onClick={() => navigate(`/ads/modify/${ad.id}`)}>
                            Modifier
                        </button>
                        </div>
                    </section>
                </>
            }
        </>
    )
}
