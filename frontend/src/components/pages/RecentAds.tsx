// React & React Router
import { useParams } from 'react-router'

// Hooks & States
import { useState, useEffect } from 'react'

// Axios
import axios from 'axios'

// Components
import AdCard from '../reusable/AdCard.tsx';

// Types
import { AdCardProps } from '../../interfaces/ShareInterfaces.tsx';

export default function RecentAds() {
    const { id } = useParams();
    const [ total, setTotal ] = useState(0)
    const [ ads, setAds ] = useState<AdCardProps[]>([])

        const fetchAds = async () => {
            try {
                const result = await axios.get(`http://localhost:3000/ads/category/${id}`)
                setAds(result.data)
            } catch (error) {
                console.error
            }
        }

        const fetchData = async () => {
            const result = await axios.get("http://localhost:3000/ads")
            setAds(result.data)
        }

    useEffect(() => {
        if (id) {
            fetchAds()
        } else {
            fetchData()
        }
    }, [id])

    return (
        <>
            <main className="main-content">
                <h2>Annonces récentes</h2>
                <h3>Total: {total} €</h3>
                <section className="recent-ads">
                    {ads.map((ad) => (
                        <div key={ad.id}>
                            <AdCard title={ad.title}
                                pictureUrl={ad.pictureUrl}
                                price={ad.price}
                                link={ad.link} />
                                <button className='button' onClick={() => setTotal(total + ad.price)}>
                                    Ajouter le prix au total
                                </button>
                        </div>
                    ))}
                </section>
            </main>
        </>
    )
}
