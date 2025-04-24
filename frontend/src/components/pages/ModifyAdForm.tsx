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
import { Category, AdDetailsTest, Tags, AdFormData } from '../../interfaces/ShareInterfaces.tsx';

// Components
// import InputNewAd from '../reusable/InputNewAd.tsx'

export default function NewAdForm() {
    const [ categories, setCategories ] = useState<Category[]>([])
    const [ tags, setTags ] = useState<Tags[]>([])
    const [ adToModify, setAdToModify ] = useState<AdDetailsTest>()
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
                const result = await axios.get<Category[]>("http://localhost:3000/categories")
                setCategories(result.data)
                const tags = await axios.get("http://localhost:3000/tags/")
                setTags(tags.data)
        }
        fetchData()
        } catch (error) {
            console.error(error)
        }
        
    }, [id])

    const { register, handleSubmit, setValue } = useForm<AdFormData>({
        defaultValues: {
          title: adToModify?.title,
          description: adToModify?.description,
          author: adToModify?.author,
          price: adToModify?.price,
          pictureUrl: adToModify?.pictureUrl,
          city: adToModify?.city,
          createdAt: adToModify?.createdAt,
          categoryId: adToModify?.category.id.toString(),
          tags: adToModify?.tags.map(tag => tag.id.toString()),
        }
      });
    const onSubmit: SubmitHandler<AdFormData> = async (data) => {
        try {
          const selectedTags = Array.isArray(data.tags) 
            ? data.tags 
            : data.tags ? [data.tags] : [];
      
          const dataToSend = {
            ...data,
            category: { id: Number(data.categoryId) },
            tags: selectedTags.map((tagId) => ({ id: Number(tagId) })),
          };
      
          await axios.put(`http://localhost:3000/ads/${id}`, dataToSend);
          toast.success("Annonce modifiée avec succès!");
          navigate(`/ads/${id}`);
        } catch (error) {
          console.error(error);
          toast.error("Une erreur est survenue lors de la modification de l'annonce");
        }
      };

    useEffect(() => {
        if (adToModify && categories.length > 0) {
            console.log("Setting form values");
            setValue("title", adToModify.title);
            setValue("description", adToModify.description);
            setValue("author", adToModify.author);
            setValue("price", adToModify.price);
            setValue("pictureUrl", adToModify.pictureUrl);
            setValue("city", adToModify.city);
            setValue("createdAt", adToModify.createdAt);
            setValue("categoryId", adToModify.category.id.toString());
            setValue("tags", adToModify.tags.map((tag) => tag.id.toString()));
        }
    }, [adToModify, categories, setValue]);

    // const { register, handleSubmit } = useForm<AdDetailsTest>()
    //   const onSubmit: SubmitHandler<AdDetailsTest> = (async(data) => {
    //     try {
    //         await axios.put(`http://localhost:3000/ads/${id}`, data)
    //         toast.success('Votre annonce a bien été modifiée')
    //         navigate(`/ads/${id}`)
    //     } catch (err) {
    //         console.log(err)
    //         toast.error('Il a une erreur')
    //     }
    //     })

    return (
        <>
            <h1 className='form-title'>Modifier mon annonce</h1>
            {adToModify ? (
                <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <div className='form-input'>
                    <label className="text-field">Titre
                        <input {...register("title")} className="text-field-input"/>
                    </label>
                    <label className="text-field">Description
                        <input {...register("description")} className="text-field-input"/>
                    </label>
                    <label className="text-field">Auteur
                        <input {...register("author")} className="text-field-input"/>
                    </label>
                    <label className="text-field">Prix
                        <input type="number" {...register("price", { valueAsNumber: true })} className="text-field-input"/>
                    </label>
                    <label className="text-field">Images
                        <input {...register("pictureUrl")} className="text-field-input"/>
                    </label>
                    <label className="text-field">Localisation
                        <input {...register("city")} className="text-field-input"/>
                    </label>
                    <label className="text-field">Créé le
                        <input {...register("createdAt")} className="text-field-input"/>
                    </label>
                    <label className="text-field">Catégorie
                        <select {...register("categoryId", { required: true })} className="text-field-input">
                            {categories.map((cat) => (
                                <option value={cat.id} key={cat.id}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className="text-field">
                        {tags.map((tag) => (
                            <label key={tag.id}>
                                <input
                                //defaultChecked={ad.tags.some((adTag) => adTag.id === tag.id)}
                                defaultChecked={
                                    adToModify.tags.some((currTag) => currTag.id === tag.id)}
                                type="checkbox"
                                value={tag.id}
                                {...register(`tags`)}
                                />
                                {tag.label}
                            </label>
                            ))}                       
                     {/* {tags.map((tag) => 
                            <label key={tag.id}>{tag.label}
                                <input value={tag.id} {...register("tags")} type="checkbox" defaultChecked={adToModify.tags?.some((adTags) => adTags === tag.id)}/>
                            </label>
                        )} */}
                    </div>
                </div>
                <input type="submit" className="form-button"/>
                </form>
                ) : (
                    <p>Impossible de modifier l'annonce</p>
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
