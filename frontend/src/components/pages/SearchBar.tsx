// React & React Router
import { useParams } from 'react-router'

// Hooks & States
import { useState, useEffect } from 'react'

// Components
import AdCard from '../reusable/AdCard';

// Axios
import axios from 'axios'

// Types
import { AdCardProps } from '../../interfaces/ShareInterfaces.tsx';

export default function SearchBar() {
    const { keyword } = useParams()
    const [ ads, setAds ] = useState<AdCardProps[]>([])

    const fetchData = async () => {
        try {
                const result = await axios.get(`http://localhost:3000/ads/search/${keyword}`)
                setAds(result.data)
        } catch (error) {
            console.error(error)
        }
    }

    console.log(ads)

useEffect(() => {
        fetchData()
}, [keyword])

    return(
        <>
            {ads.length > 0 ? (
                <>
                    {ads.map((ad) => (
                            <AdCard key={ad.id} id={ad.id} pictureUrl={ad.pictureUrl} price={ad.price} title={ad.title} link={`/ads/${ad.id}`}/>
                    ))}
                </>
                ) : (
                <>
                    <p>Aucune annonce ne correspond à votre recherche</p>
                </>
                )}
        </>
    )
}
