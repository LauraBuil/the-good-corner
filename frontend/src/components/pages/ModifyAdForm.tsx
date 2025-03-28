// Librairies
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify';

// React & React Router
import { useParams, useNavigate } from 'react-router'

// Hooks & States
import { useState, useEffect } from 'react'

// Axios
import axios from 'axios'

// Types
import { CategoryProps, AdDetails, Tags } from '../../interfaces/ShareInterfaces.tsx';

// Components
// import InputNewAd from '../reusable/InputNewAd.tsx'

export default function NewAdForm() {
    const [ categories, setCategories ] = useState<CategoryProps[]>([])
    const [ tags, setTags ] = useState<Tags[]>([])
    const [ adToModify, setAdToModify ] = useState<AdDetails | null>(null)
    const { id } = useParams()
    const navigate = useNavigate()

    // faire un formulaire dans lequel on puisse modifier tous les champs avec par défaut les mots qu'on avait déjà dans l'annonce sur laquelle ont a cliqué
    // put

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
                const toUpdate = await axios.get(`http://localhost:3000/ads/${id}`)
                setAdToModify(toUpdate.data)
                const result = await axios.get("http://localhost:3000/categories/")
                setCategories(result.data)
                const tags = await axios.get("http://localhost:3000/tags/")
                setTags(tags.data)
        }
        fetchData()
        } catch (error) {
            console.error(error)
        }
        
    }, [id])

    const { register, handleSubmit } = useForm<AdDetails>()
      const onSubmit: SubmitHandler<AdDetails> = (async(data) => {
        try {
            await axios.put(`http://localhost:3000/ads/${id}`, data)
            toast.success('Votre annonce a bien été modifiée')
            navigate(`/ads/${id}`)
        } catch (err) {
            console.log(err)
            toast.error('Il a une erreur')
        }
        })

    return (
        <>
            <h1 className='form-title'>Modifier mon annonce</h1>
            {adToModify ? (
                <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <div className='form-input'>
                    <label className="text-field">Titre
                        <input {...register("title")} className="text-field-input" defaultValue={adToModify.title}/>
                    </label>
                    <label className="text-field">Description
                        <input {...register("description")} className="text-field-input" defaultValue={adToModify.description}/>
                    </label>
                    <label className="text-field">Auteur
                        <input {...register("author")} className="text-field-input" defaultValue={adToModify.author}/>
                    </label>
                    <label className="text-field">Prix
                        <input type="number" {...register("price", { valueAsNumber: true })} className="text-field-input" defaultValue={adToModify.price}/>
                    </label>
                    <label className="text-field">Images
                        <input {...register("pictureUrl")} className="text-field-input" defaultValue={adToModify.pictureUrl}/>
                    </label>
                    <label className="text-field">Localisation
                        <input {...register("city")} className="text-field-input" defaultValue={adToModify.city}/>
                    </label>
                    <label className="text-field">Créé le
                        <input {...register("createdAt")} className="text-field-input" defaultValue={adToModify.createdAt}/>
                    </label>
                    <label className="text-field">Catégorie
                        <select {...register("category", {required: true})} className='text-field-input' defaultValue={adToModify.category.id}>
                            {categories.map((el) => (
                                <option value={el.id} key={el.label}>
                                    {el.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className="text-field">
                        {tags.map((tag) => 
                            <label key={tag.id}>{tag.label}
                                <input value={String(tag.id)} {...register("tags")} type="checkbox" defaultChecked={adToModify.tags?.includes(tag.id)}/>
                            </label>
                        )}
                    </div>
                </div>
                <input type="submit" className="form-button"/>
                </form>
                ) : (
                    <p>Impossible de modifier l'annonce</p>  // Affiche un message de chargement tant que adToModify est null
                )}
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
