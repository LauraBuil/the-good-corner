// Hooks & States
import { useEffect } from 'react'

// Librairies
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify';

// Types
import { CategoryProps } from '../../interfaces/ShareInterfaces.tsx';

// Axios
import axios from 'axios'

export default function AddNewCategoryAndTags() {

    

    const { register, handleSubmit } = useForm<CategoryProps>()
      const onSubmit: SubmitHandler<CategoryProps> = (async(data) => {
        try {
            await axios.post("http://localhost:3000/categories", data)
            toast.success('Votre annonce a bien été créée')
        } catch (err) {
            console.log(err)
            toast.error('Il a une erreur')
        }
        })

    useEffect(() => {
        
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <label className="text-field">Ajouter une nouvelle catégorie
                    <input {...register("label", { required: true })} className="text-field-input"/>
                </label>
                <input type="submit" className="form-button"/>
            </form>
        </>
    )
}
