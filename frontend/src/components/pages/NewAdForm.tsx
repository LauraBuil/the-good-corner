// Librairies
import { useForm, SubmitHandler } from "react-hook-form"

// Hooks & States
import { useState, useEffect } from 'react'

// Axios
import axios from 'axios'

// Types
import { CategoryProps, AdCardProps } from '../../interfaces/ShareInterfaces.tsx';

// Components
// import InputNewAd from '../reusable/InputNewAd.tsx'

export default function NewAdForm() {
    const [ categories, setCategories ] = useState<CategoryProps[]>([])

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()

    //     const form = e.target
    //     const formData = new FormData(form as HTMLFormElement)

    //     const formJson = Object.fromEntries(formData.entries())
    //     console.log(formJson)

    //     await axios.post("http://localhost:3000/ads", formJson)
    // }

    useEffect(() => {
        try {
            const fetchData = async ()=> {
            const result = await axios.get("http://localhost:3000/categories/")
            setCategories(result.data)
        }
        fetchData()
        } catch (error) {
            console.error(error)
        }
        
    }, [])

    const { register, handleSubmit } = useForm<AdCardProps>()
      const onSubmit: SubmitHandler<AdCardProps> = (async(data) => {
        await axios.post("http://localhost:3000/ads", data)
        })

    return (
        <>
            <h1 className='form-title'>Créer une nouvelle annonce</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <div className='form-input'>
                    <label className="text-field">Titre
                        <input {...register("title")} className="text-field-input" defaultValue={"Jolie voiture"}/>
                    </label>
                    <label className="text-field">Description
                        <input {...register("description")} className="text-field-input" defaultValue={"Je vends ma jolie voiture rose"}/>
                    </label>
                    <label className="text-field">Auteur
                        <input {...register("author")} className="text-field-input" defaultValue={"Jane Doe"}/>
                    </label>
                    <label className="text-field">Prix
                        <input type="number" {...register("price", { valueAsNumber: true })} className="text-field-input" defaultValue={"2000"}/>
                    </label>
                    <label className="text-field">Images
                        <input {...register("pictureUrl")} className="text-field-input" defaultValue={"https://media.istockphoto.com/id/989434672/fr/photo/vintage-classique-oldtimer-am%C3%A9ricaine-rose-convertible-dans-la-vieille-ville-de-la-havane-cuba.jpg?s=612x612&w=0&k=20&c=bsEwuQSS5la628_zO4DtgCgetkOL2nFqdN8Vaj3Yqj8="}/>
                    </label>
                    <label className="text-field">Localisation
                        <input {...register("city")} className="text-field-input" defaultValue={"Montpellier"}/>
                    </label>
                    <label className="text-field">Créé le
                        <input {...register("createdAt")} className="text-field-input"/>
                    </label>
                    <label className="text-field">Catégorie
                        <select {...register("category")} className='text-field-input'>
                            {categories.map((el) => (
                                <option value={el.id} key={el.label}>
                                    {el.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <input type="submit" className="form-button"/>
                </form>
    {/* <form onSubmit={handleSubmit} className='form'>
    <div className='form-input'>
                    <InputNewAd inputName="Titre de l'annonce" name="title" type="text" defaultValue={"Jolie voiture"}/>
                    <InputNewAd inputName="Description" name="description" type="text" defaultValue={"Je vends ma jolie voiture rose"}/>
                    <InputNewAd inputName="Auteur" name="author" type="text" defaultValue={"Laura"}/>
                    <InputNewAd inputName="Prix" name="price" type="text" defaultValue={"2000"}/>
                    <InputNewAd inputName="Image" name="pictureUrl" defaultValue={"https://media.istockphoto.com/id/989434672/fr/photo/vintage-classique-oldtimer-am%C3%A9ricaine-rose-convertible-dans-la-vieille-ville-de-la-havane-cuba.jpg?s=612x612&w=0&k=20&c=bsEwuQSS5la628_zO4DtgCgetkOL2nFqdN8Vaj3Yqj8="}/>
                    <InputNewAd inputName="Ville" name="city" type="text" defaultValue={"Montpellier"}/>
                    <InputNewAd inputName="Créé le" name="createdAt" type="text"/>
                    
                    <label className="text-field">Catégorie
                        <select name='category' className='text-field-input'>
                            {categories.map((el) => (
                                <option value={el.id} key={el.label}>
                                    {el.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <button className="form-button">Envoyer</button>
                </form> */}
        </>
    )
}
