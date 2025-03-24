// Components
import AdCard from '../reusable/AdCard.tsx';

// Types
import { AdCardProps } from '../../interfaces/ShareInterfaces.tsx';

export default function RecentAds() {
    const data: AdCardProps[] = [
        {
            title: 'Table',
            imgUrl: '/img/table.webp',
            price: 120,
            link: '/ads/table',
        },
        {
            title: 'Dame-jeanne',
            imgUrl: '/img/dame-jeanne.webp',
            price: 75,
            link: '/ads/dame-jeanne',
        },
        {
            title: 'Vide-poche',
            imgUrl: '/img/vide-poche.webp',
            price: 4,
            link: '/ads/vide-poche',
        },
        {
            title: 'Vaisselier',
            imgUrl: '/img/vaisselier.webp',
            price: 900,
            link: '/ads/vaisselier',
        },
        {
            title: 'Bougie',
            imgUrl: '/img/bougie.webp',
            price: 8,
            link: '/ads/bougie',
        },
        {
            title: 'Porte-magazine',
            imgUrl: '/img/porte-magazine.webp',
            price: 45,
            link: '/ads/porte-magazine',
        },
    ];

    return (
        <>
            <main className="main-content">
                <h2>Annonces récentes</h2>
                <section className="recent-ads">
                    {data.map((ad) => (
                        <AdCard key={ad.title}
                                title={ad.title}
                                imgUrl={ad.imgUrl}
                                price={ad.price}
                                link={ad.link} />
                    ))}
                </section>
            </main>
        </>
    )
}