import { useRouteMatch } from 'react-router-dom';
import { Carousel } from './carousel';
import { DogList } from './dog-list';
import { Pagination } from './pagination'

export const Home = () => {
    const match = useRouteMatch();

    return (
        <div>
            <div className="box is-full">
                <Carousel />
            </div>
            <Pagination match={match}/>
        </div >
    );
}
