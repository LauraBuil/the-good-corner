// React & React Router
import { useParams } from 'react-router'

export default function AdDetails() {
    const { id } = useParams();
    return (
        <p>
            Details of ad {id}
        </p>
    )
}
