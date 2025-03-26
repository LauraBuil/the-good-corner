// Hooks & States
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

// Axios
import axios from 'axios'

// Types
import { Category, AdCardProps } from '../../interfaces/ShareInterfaces.tsx'

export default function FilteredByCategory() {
    const { id } = useParams();
    const [ categoryName, setCategoryName ] = useState<Category[]>([])
    const [ ads, setAds ] = useState<AdCardProps[]>([])

    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const result = await axios.get("http://localhost:3000/categories/")
            setCategoryName(result.data)
        } catch (error) {
            console.error(error)
        }
    }
    fetchCategories()
    }, [])

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const result = await axios.get(`http://localhost:3000/ads/category/${id}`)
                setAds(result.data)
            } catch (error) {
                console.error
            }
        }

        if (id) {
            fetchAds()
        }
    }, [id])

    // const getCategoryNameById = (id: string | undefined) => {
    //     const category = categoryName.find(cat => cat.id === id);
    //     return category ? category.title : 'Inconnue';
    //   };
    console.log(ads)

    return (
        <>
            <h1>Catégorie sélectionnée: 
                {/* {getCategoryNameById(id)} */}
            </h1>
            <div>
                {ads.length > 0 ? (
                    ads.map((ad) => (
                        <div key={ad.id}>{ad.title}</div>
                    ))
                ) : (
                    <div>Aucune annonce ne correspond à la catégorie 
                        {/* {getCategoryNameById(id)} */}
                    </div>
                )}
            </div>
        </>
    )
}
