import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { axios } from '../config/api';
import '../css/dog-list.css';

export const DogList = (props) => {
    const list = props.list;
    return (
        <ul className="image-gallery container">
        {
            list.map((data, index) =>
                <li key={index}>
                <Link to={`dog/${data.id}`}>
                    <figure>
                        <img src={axios.defaults.baseURL+"/get-image/"+data.image} alt={data.name}/>
                        <figcaption>
                            Name: {data.name}
                            <br/>
                            Breed: {data.breed}
                        </figcaption>
                        <div className="overlay">
                            <span>
                            {
                                data.sub_breeds.map((sub_data, index) => index >= data.sub_breeds.length - 1 ? sub_data.name : sub_data.name + ", ")
                            }
                            </span>
                        </div>
                    </figure>
                </Link>
                </li>
            )
        }
        </ul>
    );
};

DogList.propTypes = {
    list: PropTypes.array.isRequired,
};
