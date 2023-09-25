import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { axios } from '../config/api';
import { auth, useAuth } from '../hooks/use-auth';
import { DogList } from './dog-list';

export const Pagination = (props) => {
    const auth = useAuth();
    const match = props.match;
    const itemsToShow = 8;
    let count = 0;
    const { search, pathname } = useLocation();

    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const page = new URLSearchParams(search).get('page');
        setCurrentPage(Number(page));
    }, [search]);

    const [maxPages, setMaxPages]= useState(1);
    const [dog_list, setDoglist] = useState([]);
    const [dog_search, setDogSearch] = useState("");
    useEffect(() => {
        getDogCount(dog_search);
        getDogList((currentPage - 1) * 5, itemsToShow, dog_search);
        // eslint-disable-next-line
    }, [currentPage, dog_search]);

    const getDogCount = async (search) => {
        try {
            const res = await axios.get('/dog-count', {params: {search: search}, headers: auth.headers()});
            count = Number(res.data.count) - 1;
            console.log(count);
            setMaxPages(Math.ceil(count / itemsToShow));
        } catch (err) {
            console.error(err);
        }
    }

    const getDogList = async (startIndex, numberOfItems, search) => {
        try {
            const res = await axios.get("/dog-list", { params: {startIndex: startIndex, numberOfItems: numberOfItems, search: search}, headers: auth.headers()});
            console.log(res);
            setDoglist(res.data.dog_list);
        } catch (err) {
            console.error(err);
        }
    };

    const search_change = (e) => {
           setDogSearch(e.target.value);
    }

    return (
        <div className="column block">
            <div className="control">
                <label className="label">Search:</label>
                <input className="input" type="string" placeholder="firulais" value={dog_search} onChange={search_change}/>
            </div>
            <DogList list={dog_list} match={match} />

            <nav className="pagination is-rounded is-centered" role="navigation" aria-label="pagination">
                <ul className="pagination-list">
                    <li><Link to={`${pathname}?page=1`} className="pagination-previous">First</Link></li>
                    {
                        currentPage - 1 > 0 ?
                        <li><Link to={`${pathname}?page=${currentPage - 1}`} className="pagination-link">{currentPage - 1}</Link></li>
                        : <span></span>
                    }
                    <li><Link to={`${pathname}?page=${currentPage}`} className="pagination-link is-current">{currentPage}</Link></li>
                    {
                        currentPage >= maxPages ?
                        <span></span>
                        : <li><Link to={`${pathname}?page=${currentPage + 1}`} className="pagination-link">{currentPage + 1}</Link></li>
                    }
                    <li><Link to={`${pathname}?page=${maxPages}`} className="pagination-next">Last</Link></li>
                </ul>
            </nav>
        </div>
    );
};

Pagination.propTypes = {
    match: PropTypes.object.isRequired
};
