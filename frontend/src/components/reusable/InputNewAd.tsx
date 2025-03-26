// Type
import { InputType } from '../../interfaces/ShareInterfaces.tsx'; 

export default function InputNewAd({inputName, name, type, accept, defaultValue }: InputType) {
    return (
        <label className="text-field">
            {inputName}
            <input className="text-field-input" type={type} name={name} accept={accept} defaultValue={defaultValue}/>
        </label>
    )
}
