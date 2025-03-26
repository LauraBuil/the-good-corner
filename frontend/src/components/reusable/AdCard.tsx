// React & React Router
import { Link } from 'react-router';

// Types
import { AdCardProps } from '../../interfaces/ShareInterfaces.tsx';

export default function AdCard({title, pictureUrl, price, link}: AdCardProps) {
    return (
        <div className="ad-card-container">
            <Link className="ad-card-link" to={link}>
                <img className="ad-card-image" src={pictureUrl} alt={title}/>
                <div className="ad-card-text">
                    <div className="ad-card-title">{title}</div>
                    <div className="ad-card-price">{price} €</div>
                </div>
            </Link>
        </div>
    )
}
